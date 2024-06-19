/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PositionBar from "./../Components/PositionBar";
import Navbar from "./../Components/Navbar";
import { Button, ButtonGroup, FormControl, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import menuAPI from "../Data/Restful/menuAPI";
import TitleBar from "../Components/TitleBar";
import "../Css/index.css";

const BASE_URL = `${import.meta.env.VITE_URL}/images`;

export default function BreakfastDetail() {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState({
        name: "加載中...",
        description: "加載中...",
        image: "default",
    });
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItem = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const response = await menuAPI.getMenuById(token, id);
                    if (/^2\d{2}$/.test(response.code)) {
                        setMenuItem(response.data);
                    } else {
                        alert(response.message);
                    }
                } catch (error) {
                    console.error("Error fetching menu item:", error);
                    alert("Failed to fetch menu item.");
                }
            } else {
                alert("Please log in to view details.");
                navigate("/login");
            }
        };
        fetchMenuItem();
    }, [id, navigate]);

    const addCount = () => {
        setCount(prevCount => Math.max(prevCount + 1, 1));
    };

    const minusCount = () => {
        setCount(prevCount => Math.max(prevCount - 1, 1));
    };

    const addToCart = (name) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.id === id);
    
        if (existingItem) {
            existingItem.count += count;
        } else {
            cart.push({ id, count, name: name });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/menu");
    };

    return (
        <div>
            <Navbar />
            <PositionBar position={"bottom"} />
            <div className="pt-5 pb-5">
                <img
                    style={{ width: "100%", height: "300px" }}
                    className="pt-3"
                    src={`${BASE_URL}/${menuItem.name}.png`}
                    alt={menuItem.name}
                />
                <div className="container">
                    <h1 className="fw-bold mt-3">{menuItem.name}</h1>
                    <span className="text-muted">{menuItem.description}</span>
                </div>
                <TitleBar title={"餐點備註"} />
                <div className="container pb-5">
                    <FormControl
                        as="textarea"
                        placeholder="請輸入備註"
                        style={{ height: "100px" }}
                        className="mt-3"
                    />
                    <div className="w-100 mt-4 text-center mx-auto">
                        <h5 className="text-start">購買數量</h5>
                        <ButtonGroup className="mt-3">
                            <button
                                type="button" // Add the type prop with the value "button"
                                className="btn btn-main-color border-0 fs-2 text-dark"
                                style={{ width: "100px" }}
                                onClick={minusCount}
                            >
                                -
                            </button>
                            <button
                                type="button"
                                className="btn btn-light"
                                style={{ width: "100px" }}
                                disabled
                            >
                                {count}
                            </button>
                            <button
                                type="button"
                                className="btn btn-main-color border-0 fs-2 text-dark"
                                style={{ width: "100px" }}
                                onClick={addCount}
                            >
                                +
                            </button>
                        </ButtonGroup>
                    </div>
                    <div className="text-end mt-4 pt-3">
                        <button
                            type="button"
                            className="btn btn-main-color border-0 fw-bold text-dark"
                            style={{ width: "150px" }}
                            onClick={() => addToCart(menuItem.name)}
                        >
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}