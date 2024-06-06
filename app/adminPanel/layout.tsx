"use client";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {AuthService} from "@/app/services/authService";
import {useRouter} from "next/navigation";

export default function AdminLayout({children, }: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();

    async function logOut(){
        await AuthService.logOut();
        router.replace("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark z-3">
                <div className="container-fluid">
                    <div className="navbar-brand">Кабинет администратора</div>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <a className="nav-link" href="practiceSchedule">Расписание</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="userSettings">Пользователи</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="directories">Справочники</a>
                            </li>
                        </ul>
                        <button className="d-flex btn btn-primary" onClick={logOut}>Выйти</button>
                    </div>
                </div>
            </nav>

            <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3 pt-3"}>
                <div className={"card-body p-3 text-center w-100 h-100"}>
                    {children}
                </div>
            </div>
        </div>
    );
}
