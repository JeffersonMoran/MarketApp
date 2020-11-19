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
    PRODUTOS_GET: "PRODUTOS_GET",
    MERCADOS_GET: "MERCADOS_GET",
    LIST_CARRINHO: "LIST_CARRINHO",
    ADICIONA_CARRINHO: "ADICIONA_CARRINHO",
    REMOVE_CARRINHO: "REMOVE_CARRINHO",
    PRODUTOS_MERCADOS_GET: "PRODUTOS_MERCADOS_GET",
    LOGOUT: "LOGOUT",
};

const initialState = {
    loading: false,
    produtos: [],
    mercados: [],
    produtos_mercado: [],
    carrinhos: [],
    product: null,
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

        case type.CREATE_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload
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

        case type.LIST_CARRINHO:
            return {
                ...state,
                carrinhos: action.payload
            };

        case type.ADICIONA_CARRINHO:
            return {
                ...state
            };

        case type.REMOVE_CARRINHO:
            return {
                ...state,
                carrinhos: state.carrinhos.filter(product => product._id != action.payload.product_id)
            };
        case type.LOGOUT:
            return initialState;
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
}

export const meusProdutos = payload => async dispatch => {
    try {
        const response = await userApi.myProducts();
        dispatch({ type: type.PRODUTOS_GET, payload: response.data });
    } catch (e) {
    }
};

export const listaMercados = payload => async dispatch => {
    try {
        const response = await userApi.listMarkets();
        dispatch({ type: type.MERCADOS_GET, payload: response.data });
    } catch (e) {
    }
};

export const listaProdutosMercados = payload => async dispatch => {
    try {
        const response = await userApi.listProductsMarkets(payload);
        dispatch({ type: type.PRODUTOS_MERCADOS_GET, payload: response.data });
    } catch (e) {
    }
};

export const createProductCarrinho = payload => async dispatch => {
    try {
        await productApi.adicionarAoCarrinho(payload);
        dispatch({ type: type.ADICIONA_CARRINHO, payload });
    } catch (e) {
    }
};

export const rProduto = payload => async dispatch => {
    try {
        await productApi.removerDoCarrinho(payload.product_id);
        dispatch({ type: type.REMOVE_CARRINHO, payload });
    } catch (e) {
    }
};

export const listaCarrinho = payload => async dispatch => {
    try {
        const response = await userApi.listainfoCarrinho();
        dispatch({ type: type.LIST_CARRINHO, payload: response.data });
    } catch (e) {
        console.log('erro', e);
    }
};

export const logoutUser = payload => async dispatch => {
    dispatch({ type: type.LOGOUT, payload: {} });
}