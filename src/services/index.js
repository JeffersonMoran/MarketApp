import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000
});

const TAG = "SERVICE";

instance.interceptors.request.use(function (config) {
    console.log("axios config,", config)
    return config
})

export default instance;