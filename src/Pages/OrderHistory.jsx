/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import InputPattern from "../Components/InputPattern";
import { useNavigate } from "react-router-dom";
import ordersAPI from "../Data/Restful/ordersAPI";
import menuAPI from "../Data/Restful/menuAPI";
import { enrichOrderItemsWithMenuNames } from "../Util/orders";


export default function OrderHistory() {
	const now = new Date().toLocaleDateString("sv");
	const [startTime, setStartDate] = useState(now);
	const [endTime, setEndDate] = useState(now);
	const [historyList, setHistoryList] = useState([]);
	const navigate = useNavigate();

    const queryOrderHistory = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const fetchOrdersByDateRange = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const startDate = new Date(startTime).toISOString().split('T')[0];
            const endDate = new Date(endTime).toISOString().split('T')[0];
            
            const orderRes = await ordersAPI.getAllOrders(token, startDate, endDate);
            const menuRes = await menuAPI.getAllMenu(token);
            
            if (!/^2\d{2}$/.test(orderRes.code)) {
                alert(orderRes.message || "Error fetching data");
                return;
            }
            if (!/^2\d{2}$/.test(menuRes.code)) {
                alert(menuRes.message || "Error fetching data");
                return;
            }
            
            const orders = orderRes.data;
            const menus = menuRes.data;
            const enrichedOrders = enrichOrderItemsWithMenuNames(orders, menus);
            
            // console.log("enrichedOrders", enrichedOrders);
            setHistoryList(enrichedOrders);

        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Failed to fetch orders.");
        }
    };

    useEffect(() => {
        fetchOrdersByDateRange();
    }, [startTime, endTime, navigate]); 

    // todo proper display all data
    // todo add toggle list         
    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                <div className="container pt-3">
                    <h1 className="text-center pt-5">訂單歷史紀錄</h1>
                    <div className="row pt-3">
                        <div className="col-6">
                            <InputPattern
                                label={"開始時間"}
                                type={"date"}
                                value={startTime}
                                onChange={(event) => queryOrderHistory(event.target.value, endTime)}
                            />
                        </div>
                        <div className="col-6">
                            <InputPattern
                                label={"結束時間"}
                                type={"date"}
                                value={endTime}
                                onChange={(event) => queryOrderHistory(startTime, event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="">
                        <table className="table table-hover table-fill text-center">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>訂單內容</td>
                                    <td>總金額</td>
                                    <td>訂單時間</td>
                                    <td>狀態</td>
                                </tr>
                            </thead>
                            <tbody>
                                {historyList.map((order, index) => (
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
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}