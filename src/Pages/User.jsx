/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import personIcon from "../Images/person-circle.svg";
import InputPattern from "../Components/InputPattern";
import { useRecoilState } from "recoil";
import userEmailRecoilAtom from "./../Data/Recoil/userEmailRecoilAtom";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import usersAPI from "../Data/Restful/usersAPI";

export default function User() {
    const [userEmail, setUserEmail] = useRecoilState(userEmailRecoilAtom);
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModifyData, setIsModifyData] = useState(false);
    const navigate = useNavigate();

    // 在组件加载时从 API 获取用户数据
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const response = await usersAPI.getUserByEmail(token);
                console.log(response);
                if (response.code === 200) {
                    const { email, username, phone } = response.data;
                    setUserEmail(email);
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
    }, [setUserEmail, setUserName, setPhoneNumber, navigate]);


    const saveModifyData = async () => {
        const body = {
            email: userEmail,
            password: password,
            username: userName,
            phone: phoneNumber,
        };

        const token = localStorage.getItem("jwtToken");
        const response = await usersAPI.updateUser(token, body);
        if (response.code === 200) {
            console.log(response);
        } else {
            alert(response.message);
        }
        setIsModifyData(false);
    };

    const logout = async () => {
        if (userEmail) {
            setUserEmail("");
            localStorage.removeItem("jwtToken");
            navigate("/");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                <h1 className="text-center pt-5">使用者管理</h1>
                <div className="mx-auto text-center pt-3">
                    <img src={personIcon} alt="USER" style={{ width: "30%" }} />
                </div>
                <div className="container pt-2">
                    <div className="container">
                        <div className="container">
                            <InputPattern
                                type={"text"}
                                value={userEmail}
                                label={"電子郵件"}
                                readOnly={true}
                            />
                            <InputPattern
                                type={"password"}
                                label={"密碼"}
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                minLength={8}
                                disabled={!isModifyData}
                            />
                            <InputPattern
                                type={"text"}
                                label={"使用者名稱"}
                                value={userName}
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                                disabled={!isModifyData}
                            />
                            <InputPattern
                                type={"tel"}
                                label={"手機號碼"}
                                value={phoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                                disabled={!isModifyData}
                            />
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        {!isModifyData ? (
                                            <CustomButton
                                                label={"修改資料"}
                                                type={"button"}
                                                onClick={() => {
                                                    setIsModifyData(true);
                                                }}
                                            />
                                        ) : (
                                            <CustomButton
                                                label={"儲存資料"}
                                                type={"button"}
                                                onClick={saveModifyData}
                                            />
                                        )}
                                    </div>
                                    <div className="col-6">
                                        <CustomButton
                                            label={"登出"}
                                            type={"button"}
                                            onClick={logout}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5 pb-5"></div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
