import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_RESOURCE_URI,
    //timeout: 3000
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    async function (config) {
        config.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
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
        //오류났을 시 다시 요청하는 코드
        //const originalConfig = error.config;
        //return axiosInstance(originalConfig);
        
        console.log("[ error ]::"+ error)
        return Promise.reject(error);
    },
);

export default axiosInstance;