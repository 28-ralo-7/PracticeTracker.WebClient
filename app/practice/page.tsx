'use client'
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {PracticeService} from "@/app/services/practiceService";
import Notification from "@/domain/shared/notification";
import {PracticeLogView} from "@/domain/practice/practiceLogView";
import {ReactNotifications} from "react-notifications-component";

export default function PracticePage() {
    const practiceid = new URLSearchParams(window.location.search).get('practiceid')
    const groupPractice = {
        id: '1',
        name: 'ПП01 Разработка программного обеспечения',
        group: {
            id: '1',
            name: '421'
        },
        students: [
            {id: '1', name: 'Илья', grade: '5', company: {id: '1', name: "Google"}, contract: 'соглашение', report: "отчёт"},
            {id: '2', name: 'Анна', grade: '', company: {id: '2', name: "Amazon"}, contract: 'соглашение', report: "отчёт"},
            {id: '3', name: 'Максим', grade: '', company: {id: '3', name: "Microsoft"}, contract: 'соглашение', report: "отчёт"},
            {id: '4', name: 'Екатерина', grade: '5', company: {id: '4', name: "Apple"}, contract: 'соглашение', report: "отчёт"},
            {id: '5', name: 'Алексей', grade: '', company: {id: '5', name: "Facebook"}, contract: 'соглашение', report: "отчёт"},
            {id: '6', name: 'Ольга', grade: '5', company: {id: '6', name: "Tesla"}, contract: 'соглашение', report: "отчёт"},
            {id: '7', name: 'Дмитрий', grade: '5', company: {id: '7', name: "SpaceX"}, contract: 'соглашение', report: "отчёт"},
            {id: '8', name: 'Мария', grade: '5', company: {id: '8', name: "Samsung"}, contract: 'соглашение', report: "отчёт"},
            {id: '9', name: 'Артем', grade: '', company: {id: '9', name: "Netflix"}, contract: 'соглашение', report: "отчёт"},
            {id: '10', name: 'Елена', grade: '3', company: {id: '10', name: "Uber"}, contract: 'соглашение', report: "отчёт"},
            {id: '11', name: 'Владимир', grade: '4', company: {id: '11', name: "Airbnb"}, contract: 'соглашение', report: "отчёт"},
            {id: '12', name: 'Наталья', grade: '4', company: {id: '12', name: "Twitter"}, contract: 'соглашение', report: "отчёт"},
            {id: '13', name: 'Иван', grade: '3', company: {id: '13', name: "LinkedIn"}, contract: 'соглашение', report: "отчёт"},
            {id: '14', name: 'Юлия', grade: '4', company: {id: '14', name: "Pinterest"}, contract: 'соглашение', report: "отчёт"},
            {id: '15', name: 'Павел', grade: '3', company: {id: '15', name: "Snapchat"}, contract: 'соглашение', report: "отчёт"},
            {id: '16', name: 'Светлана', grade: '5', company: {id: '16', name: "WhatsApp"}, contract: 'соглашение', report: "отчёт"},
            {id: '17', name: 'Григорий', grade: '5', company: {id: '17', name: "Zoom"}, contract: 'соглашение', report: "отчёт"},
            {id: '18', name: 'Татьяна', grade: '4', company: {id: '18', name: "Etsy"}, contract: 'соглашение', report: "отчёт"},
            {id: '19', name: 'Сергей', grade: '3', company: {id: '19', name: "Spotify"}, contract: 'соглашение', report: "отчёт"},
            {id: '20', name: 'Ангелина', grade: '3', company: {id: '20', name: "GitHub"}, contract: 'соглашение', report: "отчёт"},
        ],
    }

    const [practice, setPractice] = useState<PracticeLogView>(PracticeLogView.Empty);
    const companies = Array.from(new Set(groupPractice.students.map(st => st.company)));

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
        <div style={{width: "90%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3 overflow-auto"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center overflow-auto"}>
                <div className="m-3 row">
                    <button onClick={() => console.log(practice)} className="btn btn-primary col-1 ">Назад</button>
                    <h2 className="col-11" style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Группа: {practice.group.label} - {practice.name}</h2>
                </div>

                <table className="table table-sm table-bordered table-scroll table-striped">
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
