/* eslint-disable no-unused-vars */
import utility from "../../Util/utility";

const BASE_URL = `${import.meta.env.VITE_URL}/api`;
const myFetch = utility.myFetch;

// 5 APIs
const usersAPI = {
    // 透過 Email 取得使用者資料
    getUserByEmail: async (jwtToken, email) => {
        const url = `${BASE_URL}/users/profile?email=${email}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 寄送驗證信
    sendVerificationEmail: async (email) => {
        const url = `${BASE_URL}/users/verification`;
        const body = { email };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 登入
    login: async (email, password) => {
        const url = `${BASE_URL}/users/login`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 註冊
    register: async (email, password) => {
        const url = `${BASE_URL}/users/register`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 更新使用者資料
    updateUser: async (jwtToken, email, password) => {
        const url = `${BASE_URL}/users/profile`;
        const body = { email, password };
        const result = await myFetch("PUT", url, body, jwtToken);
        return result;
    },
};

export default usersAPI;
