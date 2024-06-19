/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "./../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import images from "../Images/images.jpg";
import { useNavigate } from "react-router-dom";
import menuAPI from "../Data/Restful/menuAPI";

const BASE_URL = `${import.meta.env.VITE_URL}/images`;

export default function Home() {
    const [menuData, setMenuData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
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
        fetchUserData();
    }, [navigate]);

    const getRandomMenuItems = (menuData, count) => {
        const shuffled = [...menuData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomMenuItems = getRandomMenuItems(menuData, 3);


    return (
        <div>
            <Navbar />
            <div className="pt-5">
                <Container className="text-center mt-5 mb-5 pb-5 pt-4">
                    <header>
                        <h1>早餐店點餐系統</h1>
                        <p className="mt-3">
                            歡迎來到我們的早餐店，享受美味的早餐開始新的一天！
                        </p>
                    </header>
                    <section className="mt-5 mb-4">
                        <h2>今日推薦</h2>
                        <Row className="justify-content-center mt-3 mb-4 ps-5 pe-5">
                            {randomMenuItems.map((item) => (
                                <Col key={item.id} md={6} lg={4} className="pb-3">
                                    <Card>
                                        <CardImg
                                            variant="top"
                                            src={`${BASE_URL}/${item.name}.png`}
                                            alt={item.name}
                                        />
                                        <CardBody>
                                            <CardTitle>{item.name}</CardTitle>
                                            <CardText>{item.description}</CardText>
                                            <CardText>價格：${item.price}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Container>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
