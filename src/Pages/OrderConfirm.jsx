/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { enrichOrderItemsWithMenuNames } from "../Util/orders";
import adminAPI from "../Data/Restful/adminAPI";
import menuAPI from "../Data/Restful/menuAPI";
import ordersAPI from "../Data/Restful/ordersAPI";

export default function OrderConfirm() {
    const now = new Date().toLocaleString("sv");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    const fetchOrdersByStatus = async () => {
        const token = localStorage.getItem("jwtToken");
        const userName = localStorage.getItem("username");
        setUserName(userName);
        try {
            const orderRes = await adminAPI.getAllOrder(token);
            const menuRes = await menuAPI.getAllMenu(token);
            
            if (!/^2\d{2}$/.test(orderRes.code)) {
                alert(orderRes.message || "Error fetching data");
                return;
            }
            if (!/^2\d{2}$/.test(menuRes.code)) {
                alert(menuRes.message || "Error fetching data");
                return;
            }
            console.log("orderRes", orderRes);
            console.log("menuRes", menuRes);
            const pendingOrders = orderRes.data.filter(order => order.status === "pending");
            const menus = menuRes.data;
            const enrichedOrders = enrichOrderItemsWithMenuNames(pendingOrders, menus);
            
            // console.log("enrichedOrders", enrichedOrders);
            setOrders(enrichedOrders);

        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Failed to fetch orders.");
        }
    };
    const updateOrderStatus = async (order, status) => {
        const token = localStorage.getItem("jwtToken");
        try {
            order.order_time = formatDateTimeForDB(order.order_time);
            order.pickup_time = formatDateTimeForDB(order.pickup_time);
            order.status = status;
            console.log("acceptOrder", order);
            const response = await ordersAPI.updateOrder(token, order.id, order);
            if (/^2\d{2}$/.test(response.code)) {
                fetchOrdersByStatus();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status.");
        }
    };

    const formatDateTimeForDB = (dateTime) => {
        return new Date(dateTime).toISOString().slice(0, 19).replace('T', ' ');
    };
    
    const acceptOrder = async (order) => {
        updateOrderStatus(order, "making");
    };

    const rejectOrder = async (order) => {
        updateOrderStatus(order, "rejected");
    };

    useEffect(() => {
        fetchOrdersByStatus();
    }, [navigate]); 

    return (
        <div>
            <Navbar />
            <PositionBar position={"top"} />
            <div className="container pt-5">
                <div className="container pt-5">
                    <h1 className="text-center pt-5">店家確認訂單</h1>
                    <div className="row">
                        <div className="col-9 pt-3">
                            <h5 className="text-end pt-3">{userName} 您好</h5>
                        </div>
                        <div className="col-3 pt-0">
                            <CustomButton
                                type={"button"}
                                label={"登出"}
                                onClick={logout}
                            />
                        </div>
                    </div>
                    <div className="container pt-3">
                        <table className="table table-hover table-fill text-center">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>訂單內容</td>
                                    <td>總金額</td>
                                    <td>訂購時間</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {orders.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {order.order_items.map(item => (
                                                <div key={item.id}>
                                                    {item.name} x {item.count}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{order.total_price}</td>
                                        <td>{new Date(order.order_time).toLocaleString()}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-12 p-0">
                                                    <div className="d-grid">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success mb-1"
                                                            onClick={() => acceptOrder(order)}
                                                        >
                                                            接單
                                                        </button>
                                                    </div>
                                                    <div className="d-grid">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => rejectOrder(order)}
                                                        >
                                                            拒絕
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="container pt-5 pb-5" />
                    </div>
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}