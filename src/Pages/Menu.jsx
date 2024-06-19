/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PositionBar from "./../Components/PositionBar";
import Navbar from "./../Components/Navbar";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    Tab,
    TabContainer,
    Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Css/index.css";
import menuAPI from "../Data/Restful/menuAPI";

const BASE_URL = `${import.meta.env.VITE_URL}/images`;

export default function Menu() {
    const [menuData, setMenuData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMenuData = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const response = await menuAPI.getAllMenu(token);
                    console.log(response);
                    if (/^2\d{2}$/.test(response.code)) {
                        const result = response.data;
                        // console.log("Fetched data:", result);
                        setMenuData(result);
                    } else {
                        alert(response.message);
                    }
                } catch (error) {
                    console.error("Error fetching menu data:", error);
                    alert("Failed to fetch menu data.");
                }
            } else {
                navigate("/login");
            }
        };
        fetchMenuData();
    }, [navigate]);

    const toDetail = (id) => {
        navigate(`/order/detail/${id}`);
    };

    const renderMenuItems = (tag) => {
        const items = menuData.filter(item => item.tag === tag);
        return items.map(item => (
            <ListGroupItem className="mb-3" onClick={() => toDetail(item.id)} key={item.id}>
                <div className="row">
                    <div className="col-2">
                    <CardImg variant="top" src={`${BASE_URL}/${item.name}.png`} />
                    </div>
                    <div className="col-5">
                        <CardTitle>{item.name}</CardTitle>
                        <CardBody>價錢: {item.price} 元</CardBody>
                    </div>
                </div>
            </ListGroupItem>
        ));
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5 pb-5">
                <h1 className="text-center pt-5">菜單選擇</h1>

                <TabContainer>
                    <Tabs defaultActiveKey={"蛋餅類"} className="mb-3 pt-5" variant="pills" fill>
                        <Tab eventKey={"蛋餅類"} title="蛋餅類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush">
                                    {renderMenuItems("omelet")}
                                </ListGroup>
                            </Card>
                        </Tab>
                        <Tab eventKey={"漢堡類"} title="漢堡類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush">
                                    {renderMenuItems("hamburger")}
                                </ListGroup>
                            </Card>
                        </Tab>
                        {/* 根據需要添加其他 Tab */}
                    </Tabs>
                </TabContainer>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}