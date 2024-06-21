/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PositionBar from "../Components/PositionBar";
import { useNavigate } from "react-router-dom";
import { Tab, TabContainer, Tabs } from "react-bootstrap";
import CustomButton from "../Components/CustomButton";
import adminAPI from "../Data/Restful/adminAPI";

// 管理者後台
export default function AdminBackstage() {
    const now = new Date().toLocaleString("sv");
    const [username] = useState(localStorage.getItem("username"));
    const [token] = useState(localStorage.getItem("jwtToken"));
    const [users, setUsers] = useState([]);
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    useEffect(() => {
        fetchUsers();
        fetchMenus();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminAPI.getAllUsers(token);
            if (/^2\d{2}$/.test(response.code)) {
                setUsers(response.data);
            } else {
                alert(response.message || "Error fetching users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch users.");
        }
    };

    const fetchMenus = async () => {
        try {
            const response = await adminAPI.getAllMenu(token);
            if (/^2\d{2}$/.test(response.code)) {
                setMenus(response.data);
            } else {
                alert(response.message || "Error fetching menus");
            }
        } catch (error) {
            console.error("Error fetching menus:", error);
            alert("Failed to fetch menus.");
        }
    };

    const updateMenuItem = async (id, name, description, price) => {
        try {
            const response = await adminAPI.updateMenuItem(token, id, name, description, price);
            if (/^2\d{2}$/.test(response.code)) {
                alert("Menu item updated successfully");
                fetchMenus();
            } else {
                alert(response.message || "Error updating menu item");
            }
        } catch (error) {
            console.error("Error updating menu item:", error);
            alert("Failed to update menu item.");
        }
    };

    const handleMenuChange = (id, field, value) => {
        setMenus(menus.map(menu => menu.id === id ? { ...menu, [field]: value } : menu));
    };

    return (
        <div>
            <PositionBar position={"top"} />
            <div className="container pt-5">
                <div className="container">
                    <div className="container">
                        <div className="container">
                            <h1 className="text-center pt-5">管理者後台</h1>
                            <div className="row">
                                <div className="col-9 pt-3">
                                    <h5 className="text-end pt-3">
                                        {username} 您好
                                    </h5>
                                </div>
                                <div className="col-3 pt-0">
                                    <CustomButton
                                        type={"button"}
                                        label={"登出"}
                                        onClick={logout}
                                    />
                                </div>
                            </div>
                            <TabContainer>
                                <Tabs
                                    defaultActiveKey={"使用者"}
                                    className="mb-3 pt-5"
                                    variant="pills"
                                    fill
                                >
                                    <Tab eventKey={"使用者"} title="使用者">
                                        <table className="table table-hover table-fill text-center">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>使用者名稱</td>
                                                    <td>電子郵件</td>
                                                    <td>註冊時間</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{new Date(user.register_time).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey={"菜單"} title="菜單">
                                        <table className="table table-hover table-fill text-center">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>餐點名稱</td>
                                                    <td>說明</td>
                                                    <td>價格</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody className="align-middle">
                                                {menus.map((menu, index) => (
                                                    <tr key={menu.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={menu.name}
                                                                onChange={(e) => handleMenuChange(menu.id, 'name', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <textarea
                                                                value={menu.description}
                                                                onChange={(e) => handleMenuChange(menu.id, 'description', e.target.value)}
                                                                style={{ width: "200px", height: "150px" }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={menu.price}
                                                                onChange={(e) => handleMenuChange(menu.id, 'price', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <CustomButton
                                                                label={"修改"}
                                                                onClick={() => updateMenuItem(menu.id, menu.name, menu.description, menu.price)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey={"訂單"} title="訂單">
                                        <table className="table table-hover table-fill text-center">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>訂單內容</td>
                                                    <td>餐點數量</td>
                                                    <td>餐點金額</td>
                                                    <td>訂單時間</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody className="align-middle">
                                                <tr>
                                                    <td>1</td>
                                                    <td>鮪魚蛋餅</td>
                                                    <td>2</td>
                                                    <td>NT$ 60</td>
                                                    <td>{now}</td>
                                                    <td>
                                                        <CustomButton
                                                            label={"詳細"}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>香雞漢堡</td>
                                                    <td>1</td>
                                                    <td>NT$ 40</td>
                                                    <td>{now}</td>
                                                    <td>
                                                        <CustomButton
                                                            label={"詳細"}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Tab>
                                </Tabs>
                            </TabContainer>
                        </div>
                    </div>
                </div>
                <div className="container pt-5 pb-5" />
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
