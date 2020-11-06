import * as userApi from "../services/userService";
import * as productApi from "../services/productService";
import axios from "../services";
import AsyncStorage from "@react-native-community/async-storage"

const TAG = "USER_REDUX";

export const type = {
    LOGIN_LOADING: "LOGIN_LOADING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    CREATE_ERROR: "CREATE_ERROR",
    CREATE_PRODUCT_ERROR: "CREATE_PRODUCT_ERROR",
    CREATE_PRODUCT_SUCCESS: "CREATE_SUCCESS_ERROR",
};

const initialState = {
    loading: false,
    user: null,
    product: null
};

export default (userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_LOADING:
            return {
                ...state,
                loading: true
            };

        case type.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };

        case type.CREATE_PRODUCT:
                return {
                    ...state,
                    loading: false,
                    user: action.payload
                };
        default:
            return state;
    }
});

export const login = payload => async dispatch => {
    dispatch({ type: type.LOGIN_LOADING });

    try {
        const res = await userApi.login(payload);

        axios.defaults.headers.common["Authorization"] = res.data.token;
        await AsyncStorage.setItem('Authorization', res.data.token);

        const user = { ...res.data };
        dispatch({ type: type.LOGIN_SUCCESS, payload: { ...user } });
    } catch (e) {
        console.log(TAG, "error: " + e);
        dispatch({ type: type.LOGIN_ERROR, payload: e.response.data.message });
    }
};

export const create = payload => async dispatch => {
    try {
        dispatch({ type: type.LOGIN_LOADING });
        console.log(TAG, payload);
        const response = await userApi.create(payload);
        dispatch({ type: type.LOGIN_SUCCESS, payload: response.data });
        return response.data;
    } catch (e) {
        console.log(TAG, "error: " + e);
        dispatch({ type: type.LOGIN_ERROR, payload: e.response.data.message });
    }
};

export const createProduct = (id, payload) => async dispatch => {
    try {
        console.log(TAG, payload);
        const response = await productApi.createProduct(id, payload);

        console.log(response);
        dispatch({ type: type.CREATE_PRODUCT_SUCCESS, payload: response.data });
        return response.data;
    } catch (e) {
        console.log(TAG, "error: " + e);
        dispatch({ type: type.CREATE_PRODUCT_ERROR, payload: e.response.data.message });
    }
};