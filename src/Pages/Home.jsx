/* eslint-disable no-unused-vars */
import React from "react";
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

export default function Home() {
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
                            <Col md={6} lg={4} className="pb-3">
                                <Card>
                                    <CardImg
                                        variant="top"
                                        src={images}
                                        alt="推薦餐點"
                                    />
                                    <CardBody>
                                        <CardTitle>美味三明治</CardTitle>
                                        <CardText>
                                            我們的特製三明治，配上新鮮的蔬菜和美味的醬料，讓你一整天活力滿滿。
                                        </CardText>
                                        <CardText>價格：$50</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card>
                                    <CardImg
                                        variant="top"
                                        src={images}
                                        alt="推薦餐點"
                                    />
                                    <CardBody>
                                        <CardTitle>美味三明治</CardTitle>
                                        <CardText>
                                            我們的特製三明治，配上新鮮的蔬菜和美味的醬料，讓你一整天活力滿滿。
                                        </CardText>
                                        <CardText>價格：$50</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
