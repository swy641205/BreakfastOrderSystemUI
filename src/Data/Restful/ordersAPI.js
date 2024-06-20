/* eslint-disable no-unused-vars */
import utility from "../../Util/utility";

const BASE_URL = `${import.meta.env.VITE_URL}/api`;
const myFetch = utility.myFetch;

// 5 APIs
const ordersAPI = {
    // 取得所有訂單: done
    getAllOrders: async (jwtToken, startDate, endDate) => {
        const url = `${BASE_URL}/orders?startDate=${startDate}&endDate=${endDate}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 透過 ID 取得訂單: done
    getOrderById: async (jwtToken, id) => {
        const url = `${BASE_URL}/orders/${id}`;
        const result = await myFetch("GET", url, {}, jwtToken);
        return result;
    },
    // 新增訂單: done
    addOrder: async (jwtToken, order) => {
        const url = `${BASE_URL}/orders`;
        const body = order;
        const result = await myFetch("POST", url, body, jwtToken);
        return result;
    },
    // 更新訂單: done
    updateOrder: async (jwtToken, id, order) => {
        const url = `${BASE_URL}/orders/${id}`;
        const body = order;
        const result = await myFetch("PUT", url, body, jwtToken);
        return result;
    },
    // 刪除訂單: done
    deleteOrder: async (jwtToken, id) => {
        const url = `${BASE_URL}/orders/${id}`;
        const result = await myFetch("DELETE", url, {}, jwtToken);
        return result;
    },
};

export default ordersAPI;
