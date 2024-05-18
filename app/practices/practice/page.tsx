'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {PracticeService} from "@/app/services/practiceService";
import Notification from "@/domain/shared/notification";
import {PracticeLogView} from "@/domain/practice/practiceLogView";
import {ReactNotifications} from "react-notifications-component";
import {useRouter} from "next/navigation";
import {Item} from "@/domain/shared/item";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";


export default function PracticePage() {
    const practiceid = new URLSearchParams(window.location.search).get('practiceid')
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    const [practice, setPractice] = useState<PracticeLogView>(PracticeLogView.Empty);
    const [companies, setCompanies] = useState<Item[]>([]);
    const [companiesStatistic, setCompaniesStatistic] = useState<Item[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData(){
        const result = await PracticeService.getPracticeLogByPracticeId(practiceid as string);

        if (result.isSuccess){
            setPractice(result.data);

            const companiesTemp = (result.data as PracticeLogView).logItems.map(x => x.company);
            const uniqueCompanies = companiesTemp.filter((item, index) =>
                companiesTemp.findIndex(x => x?.value === item?.value) === index
            );

            setCompanies(uniqueCompanies as Item[]);
        }
        else{
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    function closeModal(){
        setIsOpen(false);
    }

    function openModal(){
        setIsOpen(true);
    }

    function getStatistic() {
        debugger
        const companiesStatisticTemp: Item[] = [];

        for (let i = 0; i < companies.length; i++){
            let count = (practice.logItems.filter(log => log.company?.value == companies[i].value)).length;

            companiesStatisticTemp.push({label: companies[i].label, value: count.toString()});
        }
        setCompaniesStatistic(companiesStatisticTemp);
        openModal();
    }

    return (
        <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3 pt-3"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center w-100 h-100"}>
                <div className="m-3 row w-100 justify-content-evenly position-sticky">
                    <button onClick={() => router.back()} className="btn btn-primary col-1" style={{height: "50px"}}>Назад</button>

                    <h2 className="col-7" style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Группа: {practice.group.label} - {practice.name}<br/>{practice.period}</h2>

                    <button onClick={() => getStatistic()} className="btn btn-primary col-1" style={{height: "50px"}}>Статистика</button>
                    <button onClick={() => console.log(practice)} className="btn btn-primary mx-1 col-1" style={{height: "50px"}}>Сохранить</button>
                </div>

                <div className="overflow-y-scroll overflow-x-hidden" style={{height: "700px"}}>
                    <table className="table table-hover table-bordered table-striped">
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
                                            <option disabled={true}></option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select className="form-select align-items-center" defaultValue={student.company?.value}>
                                            {companies.map(company =>
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
            <CModal visible={modalIsOpen}
                    onClose={closeModal}>
                <CModalHeader>
                    <CModalTitle>Статистика по компаниям</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        {companiesStatistic.map(company =>
                            <div key={company.label}>{company.label}: {company.value} студент</div>
                        )}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={closeModal} color="primary">Закрыть</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
}
