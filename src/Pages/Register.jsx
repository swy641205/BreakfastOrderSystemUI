/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PositionBar from "../Components/PositionBar";
import InputPattern from "../Components/InputPattern";
import CustomButton from "../Components/CustomButton";
import usersAPI from "../Data/Restful/usersAPI";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    const sendVerificationCode = async () => {
        if (!verificationCode) {
            return;
        }
        const response = await usersAPI.sendVerificationEmail(email);
        // TODO
    };
    const register = async () => {
        if (
            !email ||
            !password ||
            !userName ||
            !phoneNumber ||
            !verificationCode
        ) {
            return;
        }
        if (password !== confirmPassword) {
            return;
        }
        const body = {
            email: email,
            password: password,
            userName: userName,
            phoneNumber: phoneNumber,
            verificationCode: verificationCode,
        };
        const response = await usersAPI.register(body);
        // console.log(response);
        if (response) {
            alert("註冊成功");
            navigate("/");
        } else {
            alert("註冊失敗");
        }
    };

    return (
        <div>
            <PositionBar position={"top"} />
            <div className="conatiner pt-5">
                <h1 className="text-center pt-5">使用者註冊</h1>
                <div className="container pt-5">
                    <div className="container">
                        <div className="container">
                            <div className="container">
                                <InputPattern
                                    label={"電子郵件"}
                                    type={"email"}
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                                <InputPattern
                                    label={"密碼"}
                                    type={"password"}
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    minLength={8}
                                />
                                <InputPattern
                                    label={"確認密碼"}
                                    type={"password"}
                                    value={confirmPassword}
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                    }}
                                    minLength={8}
                                />
                                <InputPattern
                                    label={"使用者名稱"}
                                    type={"text"}
                                    value={userName}
                                    onChange={(event) => {
                                        setUserName(event.target.value);
                                    }}
                                />
                                <InputPattern
                                    label={"手機號碼"}
                                    type={"tel"}
                                    value={phoneNumber}
                                    onChange={(event) => {
                                        setPhoneNumber(event.target.value);
                                    }}
                                />
                                <div className="row">
                                    <div className="col-8">
                                        <InputPattern
                                            label={"驗證碼"}
                                            type={"text"}
                                            value={verificationCode}
                                            onChange={(event) => {
                                                setVerificationCode(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-4 pt-2">
                                        <CustomButton
                                            label={"發送驗證碼"}
                                            type={"button"}
                                            onClick={sendVerificationCode}
                                        />
                                    </div>
                                    <div className="container">
                                        <div className="container">
                                            <CustomButton
                                                type={"button"}
                                                label={"註冊"}
                                                onClick={register}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5 pb-5"></div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
