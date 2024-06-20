/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PositionBar from "../Components/PositionBar";
import { useRecoilState } from "recoil";
import userEmailRecoilAtom from "../Data/Recoil/userEmailRecoilAtom";
import InputPattern from "../Components/InputPattern";
import CustomButton from "../Components/CustomButton";
import usersAPI from "../Data/Restful/usersAPI";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [userEmail, setUserEmail] = useRecoilState(userEmailRecoilAtom);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userEmail) {
            setUserEmail("");
        }
    }, []);

	const login = async () => {
		if (!email || !password) {
			return;
		}
		const res = await usersAPI.login(email, password);

		if (res.code === 200) {
			console.log(res);
			localStorage.setItem("jwtToken", res.data.token);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('username', res.data.username);
		} else {
			alert(res.message || "發生錯誤");
		}
        console.log(res.data.roles);
        if (res.data.roles?.includes('admin')) {
            setUserEmail(email);
            navigate("/auth/admin/backstage");
        } else {
            alert("You are not an shope admin.");
        }
	};

    return (
        <div>
            <PositionBar position={"top"} />
            <div className="container pt-5">
                <div className="container pt-5">
                    <h1 className="text-center">早餐店管理員系統</h1>
                    <div className="pt-5 ps-5 pe-5 pb-3">
                        <InputPattern
                            label={"電子郵件"}
                            type={"email"}
                            placeholder={"請輸入電子郵件"}
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <InputPattern
                            label={"密碼"}
                            type={"password"}
                            placeholder={"請輸入密碼"}
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <div className="container pt-1">
                            <CustomButton
                                type={"button"}
                                label={"登入"}
                                color={"danger"}
                                onClick={login}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
