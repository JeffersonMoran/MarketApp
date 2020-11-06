import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

const instance = axios.create({
    baseURL: 'http://54.166.37.159:3000/',
    timeout: 10000
});

const TAG = "SERVICE";

instance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('Authorization');
        console.log('token', token);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export default instance;