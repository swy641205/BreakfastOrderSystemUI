/* eslint-disable no-unused-vars */
import utility from "../../Util/utility";

const BASE_URL = `${import.meta.env.VITE_URL}/api`;
const myFetch = utility.myFetch;

// 5 APIs
const usersAPI = {
    // 透過 Email 取得使用者資料: done
    getUserByEmail: async (jwtToken) => {
        const url = `${BASE_URL}/users/profile`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 寄送驗證信: done
    sendVerificationEmail: async (email) => {
        const url = `${BASE_URL}/users/verification`;
        const body = { email };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 登入: done
    login: async (email, password) => {
        const url = `${BASE_URL}/users/login`;
        const body = { email, password };
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 註冊: done
    register: async (body) => {
        const url = `${BASE_URL}/users/register`;
        const result = await myFetch("POST", url, body);
        return result;
    },
    // 更新使用者資料: done
    updateUser: async (jwtToken, body) => {
        const url = `${BASE_URL}/users/profile`;
        const result = await myFetch("PUT", url, body, jwtToken);
        return result;
    },
};

export default usersAPI;
