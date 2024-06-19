/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import TitleBar from "./../Components/TitleBar";
import InputPattern from "./../Components/InputPattern";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import menuAPI from "../Data/Restful/menuAPI";
import usersAPI from "../Data/Restful/usersAPI";
import ordersAPI from "../Data/Restful/ordersAPI";

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [takeOutTime, setTakeOutTime] = useState(
		new Date().toLocaleString("sv"),
	);
    const [diningMethod, setDiningMethod] = useState("takeout");
    const [note, setNote] = useState("");
	const [userPhoneNumber, setPhoneNumber] = useState("");
	const [userName, setUserName] = useState("");
	const navigate = useNavigate();
	const token = localStorage.getItem("jwtToken");

	useEffect(() => {
		const fetchCartItems = async () => {
			const token = localStorage.getItem("jwtToken");
			if (!token) {
				alert("Please log in to view your cart.");
				navigate("/login");
				return;
			}

			let cart = JSON.parse(localStorage.getItem("cart")) || [];
			let updatedCart = [];

			for (let item of cart) {
				try {
					const response = await menuAPI.getMenuById(token, item.id);
					if (/^2\d{2}$/.test(response.code)) {
						const menuItem = response.data;
						updatedCart.push({
							id: item.id,
							name: item.name,
							count: item.count,
							price: menuItem.price,
						});
					} else {
						alert(response.message || "Error fetching data");
					}
				} catch (error) {
					console.error("Error fetching menu item:", error);
					alert("Failed to fetch menu item.");
				}
			}

			setCartItems(updatedCart);
			setIsLoading(false);
		};

		const fetchUserData = async () => {
			if (token) {
				const response = await usersAPI.getUserByEmail(token);
				console.log(response);
				if (response.code === 200) {
					const { email, username, phone } = response.data;
					setUserName(username);
					setPhoneNumber(phone);
				} else {
					alert(response.message || "Failed to fetch user data");
				}
			} else {
				navigate("/login");
			}
		};

		fetchUserData();
		fetchCartItems();
	}, [token, navigate]);

	const removeItem = (id) => {
		let updatedCart = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const updateItemCount = (id, count) => {
		let updatedCart = cartItems.map((item) => {
			if (item.id === id) {
				return { ...item, count: Math.max(item.count + count, 1) };
			}
			return item;
		});
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};
	// todo send order to server
	const submitOrder = async () => {
		if (cartItems.length === 0) {
			alert("Please add items to your cart first.");
			return;
		}

		const order = {
            order_items: cartItems.map(item => ({
                id: item.id,
                count: item.count,
                unit_price: item.price,
            })),
            total_price: cartItems.reduce((total, item) => total + item.price * item.count, 0),
            order_time: new Date().toLocaleString("sv"),
			pickup_time: takeOutTime,
            method: diningMethod,
            note: note,
            status: "pending",

		};

		const response = await ordersAPI.addOrder(token, order);
		console.log(response);
		if (response.code === 201) {
			alert("感謝您的訂購，請至店家櫃檯結帳。\n您可以在歷史訂單查看訂單狀態。");
			localStorage.removeItem("cart");
			navigate("/history");
		} else {
			alert(response.message);
		}
	};
	return (
		<div>
			<Navbar />
			<div className="pt-5" style={{ overflow: "hidden" }}>
				<div className="pt-4">
					<TitleBar title={"選購餐點"} />
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<table className="table table-hover table-responsive text-center">
							<thead>
								<tr>
									<td>名稱</td>
									<td>數量</td>
									<td>金額</td>
									<td>刪除</td>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>
											<Button
												variant="outline-secondary"
												size="sm"
												onClick={() => updateItemCount(item.id, -1)}
											>
												-
											</Button>{" "}
											{item.count}{" "}
											<Button
												variant="outline-secondary"
												size="sm"
												onClick={() => updateItemCount(item.id, 1)}
											>
												+
											</Button>
										</td>
										<td>NT$ {item.price * item.count}</td>
										<td>
											<button
												type="button"
												className="btn btn-transparent pt-0 border-0"
												onClick={() => removeItem(item.id)}
											>
												<i className="bi bi-trash3-fill text-danger" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					<TitleBar title={"用餐方式"} className={"pt-2"} />
					<div className="ps-5 pe-5 pt-4 mx-auto text-center">
						<button
							name="dinein"
							type="button"
                            className={`btn btn-lg me-5 ${diningMethod === 'dinein' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                            onClick={() => setDiningMethod("dinein")}
                        >
							內用
						</button>
						<button
							name="takeout"
							type="button"
                            className={`btn btn-lg ms-5 ${diningMethod === 'takeout' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                            onClick={() => setDiningMethod("takeout")}
						>
							外帶
						</button>
					</div>
					<TitleBar title={"取餐時間"} className={"pt-2"} />
					<div className="ps-5 pe-5 pt-4">
						<input
							type="datetime-local"
							className="form-control text-center border-secondary"
							value={takeOutTime}
							onChange={(e) => setTakeOutTime(e.target.value)}
						/>
					</div>
					<TitleBar title={"訂購人資料"} className={"pt-2"} />
					<div className="row ps-4 pe-4 pt-4">
						<div className="col-6">
							<InputPattern
								label={"姓名"}
								type={"text"}
								placeholder={"訂購人姓名"}
								readOnly={true}
								value={userName}
							/>
						</div>
						<div className="col-6">
							<InputPattern
								label={"電話"}
								type={"tel"}
								placeholder={"訂購人電話"}
								readOnly={true}
								value={userPhoneNumber}
							/>
						</div>
					</div>
					<TitleBar title={"其他"} className={"pt-2"} />
					<div className="container pb-1">
						<FormControl
							as="textarea"
							placeholder="請輸入訂單備註"
							style={{ height: "100px" }}
							className="mt-3 border-secondary"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
						/>
					</div>
					<div className="text-end mt-4 pt-1 ps-5 pe-5">
						<button
							type="button"
							className="btn btn-main-color"
							style={{ width: "150px" }}
							onClick={() => submitOrder()}
						>
							確認下單
						</button>
					</div>
				</div>
			</div>
			<div className="pb-5 pt-5" />
			<PositionBar position={"bottom"} />
		</div>
	);
}
