import { toast } from "react-toastify";
import axiosinstance from "../../config/axios"

export const updateProfileImage = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosinstance.put('/admin/admin/user-image', formData)
            return data.data;
        } catch (error) {
            dispatch({ type: 'SET_IMAGE_LOADER', imageLoader: false })
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

export const updateProfile = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosinstance.put('/admin/admin/user-profile', formData)
            toast.success("Profile updated successfully!");
            return data.success;
        } catch (error) {
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

export const ResetUserPassword = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({type :"SET_LOADER", payload: true});
            const { data } = formData.id ?
                await axiosinstance.post(`/admin/auth/reset/${formData.id}`, { password: formData.password, repeat_password: formData.repeat_password }) :
                await axiosinstance.post('/admin/auth/reset', { password: formData.password, repeat_password: formData.repeat_password });
                dispatch({type :"SET_LOADER", payload: false});
            toast.success("Password changed successfully!");
            return data.success;
        } catch (error) {
            dispatch({type :"SET_LOADER", payload: false});
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

export const forgotPassword = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosinstance.post('/admin/auth/forget', formData);
            toast.success("Reset password link has been sent to your email");
            return data.data;
        } catch (error) {
            toast.error("Something went wrong");
        }

    }
}