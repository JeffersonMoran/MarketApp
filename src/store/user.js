import * as userApi from "../services/userService";
import axios from "../services";
import _ from "lodash";

const TAG = "USER_REDUX";

export const type = {
    LOGIN_LOADING: "LOGIN_LOADING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    CREATE_ERROR: "CREATE_ERROR",
};

const initialState = {
    loading: false,
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
        default:
            return state;
    }
});

export const login = payload => async dispatch => {
    dispatch({ type: type.LOGIN_LOADING });

    try {
        const res = await userApi.login(payload);

        axios.defaults.headers.common["Authorization"] = res.data.token.token;

        const user = {
            ...res.data.user,
            token: res.data.token.token,
            refresh_token: res.data.token.refresh_token,
            family: [data.user, ...data.parents]
        };
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
    } catch (e) {
        console.log(TAG, "error: " + e);
        dispatch({ type: type.LOGIN_ERROR, payload: e.response.data.message });
    }
};