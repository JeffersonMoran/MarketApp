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
