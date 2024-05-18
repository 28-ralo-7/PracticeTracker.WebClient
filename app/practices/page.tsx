'use client'
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/college_logo.png';
import React, {useEffect, useState} from "react";
import {PracticeService} from "@/app/services/practiceService";
import Notification from "@/domain/shared/notification";
import {Item} from "@/domain/shared/item";
import {ReactNotifications} from "react-notifications-component";
import {useRouter} from "next/navigation";

export default function PracticesPage() {
    const router = useRouter();
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
        <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center position-relative"}>
                <div className="m-3 w-100">
                    <h2 style={{top: 0, backgroundColor: 'white' }} className="m-3">Практики</h2>
                </div>

                <div className="row d-flex justify-content-center">
                    {practices?.map((practice, index) => (
                        index % 10 === 0 && (
                            <div key={index} className="col-4 mb-5">
                                {practices?.slice(index, index + 10).map(practice => (
                                    <a className="d-block fs-3 text-black btn btn-primary m-1 text-white" key={practice.value} href={`/practices/practice?practiceid=${practice.value}`}>{practice.label}</a>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
