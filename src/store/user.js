import * as userApi from "../services/userService";
import axios from "../services";
import AsyncStorage from "@react-native-community/async-storage"

const TAG = "USER_REDUX";

export const type = {
    LOGIN_LOADING: "LOGIN_LOADING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    CREATE_ERROR: "CREATE_ERROR",
    PRODUTOS_GET: "PRODUTOS_GET",
    MERCADOS_GET: "MERCADOS_GET",
    PRODUTOS_MERCADOS_GET: "PRODUTOS_MERCADOS_GET"
};

const initialState = {
    loading: false,
    produtos: [],
    mercados: [],
    produtos_mercado: [],
    user: null
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
        
        case type.PRODUTOS_GET:
            return {
                ...state,
                produtos: action.payload
            };
        
        case type.MERCADOS_GET:
            return {
                ...state,
                mercados: action.payload
            };
        
        case type.PRODUTOS_MERCADOS_GET:
            return {
                ...state,
                produtos_mercado: action.payload
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
        // console.log(TAG, "error: " + e);
        dispatch({ type: type.LOGIN_ERROR, payload: e.response.data.message });
    }
};

export const create = payload => async dispatch => {
    try {
        dispatch({ type: type.LOGIN_LOADING });
        // console.log(TAG, payload);
        const response = await userApi.create(payload);
        dispatch({ type: type.LOGIN_SUCCESS, payload: response.data });
        return response.data;
    } catch (e) {
        // console.log(TAG, "error: " + e);
        dispatch({ type: type.LOGIN_ERROR, payload: e.response.data.message });
    }
};

export const meusProdutos = payload => async dispatch => {
    try {
        const response = await userApi.myProducts();
        dispatch({ type: type.PRODUTOS_GET, payload: response.data});
    } catch (e) {
    }
};

export const listaMercados = payload => async dispatch => {
    try {
        const response = await userApi.listMarkets();
        dispatch({ type: type.MERCADOS_GET, payload: response.data});
    } catch (e) {
    }
};

export const listaProdutosMercados = payload => async dispatch => {
    try {
        const response = await userApi.listProductsMarkets(payload);
        dispatch({ type: type.PRODUTOS_MERCADOS_GET, payload: response.data});
    } catch (e) {
    }
};