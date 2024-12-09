// import { stringify } from "querystring";
import API from "./api";

const Service = {
    register: (payload: {
        fName: string,
        email: string,
        password: string,
    }) => {
        // const userDetail = JSON.stringify(payload);
        return API.post("/user", payload);
    },

    login: (payload: {
        email: string,
        password: string
    }) => {
        return API.post("/auth/login", payload);
    },

    sendCity: (payload: {
        city: string
    }, accessToken: string) => {
        return API.post("/city", payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
    getCitys: (accessToken: string) => {
        return API.get("/city", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }

}

export default Service;