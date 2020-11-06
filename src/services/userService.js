import axios from "./index";

export const create = async data => {
    return await axios("user", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        data
    });
}

export const login = async (data) => {
    return await axios("user/login", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        data
    });
}

export const myProducts = async () => {
    return await axios("user/products", {
        method: "get",
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const listMarkets = async () => {
    return await axios("markets", {
        method: "get",
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const makeRate = async (data) => {
    return await axios("user/rate", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        data
    });
}

export const listProductsMarkets = async (data) => {
    return await axios("/market/"+data, {
        method: "get",
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const listainfoCarrinho = async () => {
    return await axios("user/buy-list", {
        method: "get",
        headers: {
            "Content-type": "application/json"
        }
    });
}