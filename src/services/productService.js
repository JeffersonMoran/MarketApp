import axios from "./index";

export const createProduct = async (id, data) => {
    return await axios(`market/${id}/product`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        data
    });
}

export const adicionarAoCarrinho = async (data) => {
    return await axios(`user/add-buy-list`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        data
    });
}

export const removerDoCarrinho = async (id) => {
    console.log('id', id)
    return await axios(`user/remove-buy-list/product/${id}`, {
        method: "delete",
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const listCarrinho = async () => {
    console.log('here service');
    const data =  await axios(`user/buy-list`, {
        method: "get",
        headers: {
            "Content-type": "application/json"
        }
    });
    console.log('log', data)
}