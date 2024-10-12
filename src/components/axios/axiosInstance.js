import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_RESOURCE_URI,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    async function (config) {
        const tokenString = localStorage.getItem("token");
        const accessToken = JSON.parse(tokenString).access_token;

        config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        };

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalConfig = error.config;

        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            const tokenString = localStorage.getItem("token");
            let userToken = JSON.parse(tokenString);
            userToken = createToken(userToken, new Date(userToken.expires));
            const refreshToken = userToken.refreshToken;
            const jwtDecode = jwt_decode(refreshToken);

            if (Date.now() > jwtDecode.exp * 1000) {
                tokenExpired();
                return null;
            } else {
                await userToken.refresh().then((refreshToken) => {
                    refreshToken.data.expires = refreshToken.expires;
                    localStorage.setItem("token", JSON.stringify(refreshToken.data));
                    originalConfig.headers["Authorization"] = `Bearer ${refreshToken.data.access_token}`;
                });

                return axiosInstance(originalConfig);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;