/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../Css/index.css";

export default function Navbar() {
    return (
        <div className="fixed-top bg-main-color">
            <div className="container-fluid">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                to="/home"
                                className="nav-link text-white"
                                aria-current="page"
                            >
                                首頁
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/menu" className="nav-link text-white">
                                菜單瀏覽
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-white">
                                購物車
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link text-white">
                                歷史訂單
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link text-white">
                                使用者
                            </Link>
                        </li>
                    </ul>
                </header>
            </div>
        </div>
    );
}
