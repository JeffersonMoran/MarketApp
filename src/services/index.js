import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

const instance = axios.create({
    baseURL: 'http://54.226.232.72:3000/',
    timeout: 10000
});

const TAG = "SERVICE";

instance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('Authorization');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // console.log('config', config)
        return config;
    },
    error => {
        // console.log('error', error)
        Promise.reject(error)
    }
);

export default instance;