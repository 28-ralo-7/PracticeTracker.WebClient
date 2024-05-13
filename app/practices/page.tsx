'use client'
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/college_logo.png';
import React, {useEffect, useState} from "react";
import {PracticeService} from "@/app/services/practiceService";
import Notification from "@/domain/shared/notification";
import {Item} from "@/domain/shared/item";
import {ReactNotifications} from "react-notifications-component";

export default function PracticesPage() {
    const [practices, setPractices] = useState<Item[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData(){
        const result = await PracticeService.getPracticesByPermission();

        if (result.isSuccess){
            setPractices(result.data)
        }
        else{
            Notification(result.errors[0], "danger");
        }
    }

    return (
        <div className={"w-75 h-75 position-absolute top-50 start-50 translate-middle bg-white rounded-3 overflow-auto"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center"}>
                <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Практики</h2>
                <div className="row d-flex justify-content-center">
                    {practices?.map((practice, index) => (
                        index % 10 === 0 && (
                            <div key={index} className="col-4 mb-5">
                                {practices?.slice(index, index + 10).map(practice => (
                                    <a className="d-block fs-3 text-black btn btn-primary m-1 text-white" key={practice.value} href={`/practice?practiceid=${practice.value}`}>{practice.label}</a>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
