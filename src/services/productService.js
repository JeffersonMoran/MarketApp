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