"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {AuthService} from "@/app/services/authService";

export default function PracticeLayout({children, }: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();

    async function logOut(){
        await AuthService.logOut();
        router.replace("/login");
    }

    return (
        <div style={{height: "100%", width: "100%"}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark z-3">
                <div className="container-fluid">
                    <div className="navbar-brand me-auto">Колледж "Коломна"</div>
                    <button className="btn btn-primary ms-auto" onClick={logOut}>Выйти</button>
                </div>
            </nav>

            <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3 pt-3"}>
                <div className={"card-body p-3 text-center w-100 h-100"} style={{width: "95%", height: "95%"}} >
                    {children}
                </div>
            </div>
        </div>
    );
}