'use client'
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {PracticeService} from "@/app/services/practiceService";
import Notification from "@/domain/shared/notification";
import {PracticeLogView} from "@/domain/practice/practiceLogView";
import {ReactNotifications} from "react-notifications-component";
import {useRouter} from "next/navigation";

export default function PracticePage() {
    const practiceid = new URLSearchParams(window.location.search).get('practiceid')
    const router = useRouter();

    const [practice, setPractice] = useState<PracticeLogView>(PracticeLogView.Empty);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData(){
        const result = await PracticeService.getPracticeLogByPracticeId(practiceid as string);

        if (result.isSuccess){
            setPractice(result.data);
        }
        else{
            result.errors.map(error => Notification(error, "danger"))
        }
    }


    return (
        <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center w-100"}>
                <div className="m-3 row w-100 justify-content-evenly">
                    <button onClick={() => router.back()} className="btn btn-primary col-1" style={{height: "50px"}}>Назад</button>
                    <h2 className="col-7" style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Группа: {practice.group.label} - {practice.name}<br/>{practice.period}</h2>
                    <button onClick={() => console.log(practice)} className="btn btn-primary col-1" style={{height: "50px"}}>Статистика</button>
                    <button onClick={() => console.log(practice)} className="btn btn-primary mx-1 col-1" style={{height: "50px"}}>Сохранить</button>
                </div>

                <table className="table table-bordered table-scroll table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Студент</th>
                            <th>Оценка</th>
                            <th>Предприятие</th>
                            <th>Договор</th>
                            <th>Отчёт</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            practice.logItems.map((student, index) =>
                            <tr key={student.id}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td className="">
                                    <select className="form-select align-items-center" defaultValue={student.grade ?? 0}>
                                        <option></option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="form-select align-items-center" defaultValue={student.company?.value}>
                                        {practice.logItems.map(x => x.company).map(company =>
                                            <option key={company?.value} value={company?.value}>{company?.label}</option>
                                        )}
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-primary">
                                        {student.contract}
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary">
                                        {student.report}
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
