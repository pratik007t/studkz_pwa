
import axiosinstance from "./axios";
import { refreshToken } from "store/action/auth.action";
import TokenService from "./../services/token.service";

const setup = (store) => {
    axiosinstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;
    axiosinstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/login" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axiosinstance.post("runTokenRefresh", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        const { accessToken } = rs.data;

                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);

                        return axiosinstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;