const getLocalRefreshToken = () => {
    return localStorage.getItem("refreshToken")
  };
  
  const getLocalAccessToken = () => {
    return localStorage.getItem("token")
  };
  
  const updateLocalAccessToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  const updateRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const removeUser = () => {
    localStorage.removeItem("user");
  };
  
  const TokenService = {
    getLocalRefreshToken, 
    updateRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default TokenService;