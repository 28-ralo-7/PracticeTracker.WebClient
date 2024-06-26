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
import styles from './scss/style.module.scss';


export default function PracticePage() {

    const router = useRouter();
    const practiceid = new URLSearchParams(window.location.search).get('practiceid')
    const [statisticModalIsOpen, setStatisticModalIsOpen] = useState(false);
    const [contractActionModalIsOpen, setContractActionModalIsOpen] = useState(false);
    const [reportActionModalIsOpen, setReportActionModalIsOpen] = useState(false);
    const [practice, setPractice] = useState<PracticeLogView>(PracticeLogView.Empty);
    const [companies, setCompanies] = useState<Item[]>([]);
    const [companiesStatistic, setCompaniesStatistic] = useState<Item[]>([]);
    const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
        getOptions();
    }, []);

    async function getOptions(){
        const result = await PracticeService.getCompaniesOptions();

        if (result.isSuccess){
            setCompanies(result.data)
        }
        else
        {
            result.errors.map(error => Notification(error, 'danger'))
        }
    }

    async function loadData(){
        const result = await PracticeService.getPracticeLogByPracticeId(practiceid as string);

        if (result.isSuccess){
            setPractice(result.data);
        }
        else{
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    function closeStatisticModal(){
        setStatisticModalIsOpen(false);
    }

    function openStatisticModal(){
        setStatisticModalIsOpen(true);
    }

    function openContractActionModal(logId: string){
        setSelectedLogId(logId);
        setContractActionModalIsOpen(true);
    }

    function closeContractActionModal(){
        setSelectedLogId(null);
        setContractActionModalIsOpen(false);
    }


    function openReportActionModal(logId: string){
        setSelectedLogId(logId);
        setReportActionModalIsOpen(true);
    }

    function closeReportActionModal(){
        setSelectedLogId(null);
        setReportActionModalIsOpen(false);
    }

    function getStatistic() {
        const companiesStatisticTemp: Item[] = [];

        for (let i = 0; i < companies.length; i++){
            let count = (practice.logItems.filter(log => log.company?.value == companies[i]?.value)).length;

            companiesStatisticTemp.push({label: companies[i]?.label, value: count.toString()});
        }
        setCompaniesStatistic(companiesStatisticTemp);
        openStatisticModal();
    }

    async function handleOnChangeStudentGrade(studentId: string, grade: string){
        await PracticeService.savePracticeLogGrade(studentId, grade).then(response =>
            loadData()
        );
    }

    async function handleOnBlurCompanyInput(studentId: string, value: string){
        await PracticeService.savePracticeLogCompany(studentId, value).then(response =>
            loadData()
        );
    }

    async function handleOnUploadContract(data: FileList, logId: string){
        const formData = new FormData();
        formData.append("contract", data[0]);

        const result = await PracticeService.uploadContract(formData, logId);

        if (result.isSuccess){
            Notification("Договор прикреплен", "success");
            closeContractActionModal();
            loadData();
        }
        else {
            result.errors.map(error => Notification(error, "danger"));
        }
    }

    async function handleOnUploadReport(data: FileList, logId: string){
        const formData = new FormData();
        formData.append("report", data[0]);

        const result = await PracticeService.uploadReport(formData, logId);

        if (result.isSuccess){
            Notification("Отчёт прикреплен", "success");
            closeReportActionModal();
            loadData();
        }
        else {
            result.errors.map(error => Notification(error, "danger"));
        }
    }

    async function handleOnClickDownloadContract(){
        await PracticeService.downloadContract(selectedLogId!);
        closeContractActionModal();
    }

    async function handleOnClickDownloadReport(){
        await PracticeService.downloadReport(selectedLogId!);
        closeReportActionModal();
    }

    async function removeContract(){
        await PracticeService.removeContract(selectedLogId!);
        closeContractActionModal();
        loadData();
    }

    async function removeReport(){
        await PracticeService.removeReport(selectedLogId!);
        closeReportActionModal();
        loadData();
    }

    return (
        <div style={{width: "95%", height: "95%"}} className={"position-absolute top-50 start-50 translate-middle bg-white rounded-3 pt-3"}>
            <ReactNotifications />
            <div className={"card-body p-3 text-center w-100 h-100"}>
                <div className="m-3 row w-100 justify-content-evenly position-sticky">
                    <button onClick={() => router.back()} className="btn btn-primary col-1" style={{height: "50px", minWidth:"100px"}}>Назад</button>

                    <h2 className="col-7" style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Группа: {practice.group.label} - {practice.name}<br/>{practice.period}</h2>

                    <button onClick={() => getStatistic()} className="btn btn-primary col-1" style={{height: "50px", minWidth:"100px"}}>Статистика</button>
                </div>

                <div className="overflow-y-scroll overflow-x-hidden" style={{maxHeight: "500px"}}>
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
                            practice.logItems.sort((a,b) => a.name.localeCompare(b.name)).map((log, index) =>
                                <tr key={log.id}>
                                    <td width={1}>{index+1}</td>
                                    <td width={500}>{log.name}</td>
                                    <td width={100} className="">
                                        <select className="form-select align-items-center"
                                                onChange={(e) => handleOnChangeStudentGrade(log.id, e.target.value)}
                                                defaultValue={log.grade ?? 0}>
                                            <option key={0} defaultChecked={log.grade == null}></option>
                                            <option key={2} >2</option>
                                            <option key={3} >3</option>
                                            <option key={4} >4</option>
                                            <option key={5} >5</option>
                                        </select>
                                    </td>
                                    <td width={300}>
                                        <input defaultValue={log.company?.label}
                                               list="opts"
                                               onBlur={(e) => handleOnBlurCompanyInput(log.id, e.target.value)}
                                               className="form-select align-items-center"/>
                                        <datalist id="opts">
                                            <option key={0} defaultChecked={log.company == null}></option>
                                            {companies.map(company =>
                                                <option key={company?.value}>{company?.label}</option>
                                            )}
                                        </datalist>
                                    </td>
                                    <td>
                                        {
                                            log.contract != null
                                                ?
                                                <button className="btn btn-primary" onClick={() => openContractActionModal(log.id)}>Договор</button>
                                                :
                                                <label className={styles.inputFile}>
                                                    <input type="file" name="file"
                                                           onChange={(e) =>  handleOnUploadContract(e.target.files!, log.id)}/>
                                                    <span>Прикрепить</span>
                                                </label>
                                        }

                                    </td>
                                    <td>
                                        {

                                            log.report != null
                                                ?
                                                <button className="btn btn-primary" onClick={() => openReportActionModal(log.id)}>Отчёт</button>
                                                :
                                                <label className={styles.inputFile}>
                                                    <input type="file" name="file"
                                                           onChange={(e) =>  handleOnUploadReport(e.target.files!, log.id)}/>
                                                    <span>Прикрепить</span>
                                                </label>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <CModal visible={statisticModalIsOpen}
                    onClose={closeStatisticModal}>
                <CModalHeader>
                    <CModalTitle>Статистика по компаниям</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        companiesStatistic.map(cs => cs.label != '0').length > 0 &&
                        <div>
                            {companiesStatistic.map(company =>
                                <div key={company.label}>{company.label}: {company.value} студент</div>
                            )}
                        </div>
                    }
                    {
                        companiesStatistic.length == 0 &&
                        <div>
                            Нет ни одного предприятия
                        </div>
                    }
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={closeStatisticModal} color="primary">Закрыть</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={contractActionModalIsOpen}
                    onClose={closeContractActionModal}>
                <CModalHeader>
                    <CModalTitle>Выберите действие</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="d-flex w-100 justify-content-around">
                        <button className="btn btn-success" onClick={()=>handleOnClickDownloadContract()}>Скачать</button>
                        <label className={styles.inputFile}>
                            <input type="file" name="file"
                                   onChange={(e) =>  handleOnUploadContract(e.target.files!, selectedLogId!)}/>
                            <span>Прикрепить</span>
                        </label>
                        <button className="btn btn-danger" onClick={()=>removeContract()}>Удалить</button>
                    </div>
                </CModalBody>
            </CModal>

            <CModal visible={reportActionModalIsOpen}
                    onClose={closeReportActionModal}>
                <CModalHeader>
                    <CModalTitle>Выберите действие</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="d-flex w-100 justify-content-around">
                        <button className="btn btn-success" onClick={()=>handleOnClickDownloadReport()}>Скачать</button>
                        <label className={styles.inputFile}>
                            <input type="file" name="file"
                                   onChange={(e) =>  handleOnUploadReport(e.target.files!, selectedLogId!)}/>
                            <span>Прикрепить</span>
                        </label>
                        <button className="btn btn-danger" onClick={()=> removeReport()}>Удалить</button>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    );
}
