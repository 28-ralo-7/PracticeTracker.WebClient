"use client";
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import 'react-notifications-component/dist/theme.css';
import {Item} from "@/domain/shared/item";
import {DirectoriesService} from "@/app/services/directoriesService";
import Notification from "@/domain/shared/notification";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {ReactNotifications} from "react-notifications-component";

export default function DirectoriesPage() {

    const [practices, setPractices] = useState<Item[]>([]);
    const [groups, setGroups] = useState<Item[]>([]);
    const [companies, setCompanies] = useState<Item[]>([]);

    const [selectedPractice, setSelectedPractice] = useState<Item>(Item.Empty);
    const [selectedGroup, setSelectedGroup] = useState<Item>(Item.Empty);
    const [selectedCompany, setSelectedCompany] = useState<Item>(Item.Empty);

    const [isOpenEditPracticeModal, setIsOpenEditPracticeModal] = useState<boolean>(false);
    const [isOpenEditGroupModal, setIsOpenEditGroupModal] = useState<boolean>(false);
    const [isOpenEditCompanyModal, setIsOpenEditCompanyModal] = useState<boolean>(false);
    const [errorsModal, setErrorsModal] = useState<string>("");

    useEffect(()=>{
        loadData()
    }, [])

    async function loadData(){
        getPractices();
        getGroups();
        getCompany();
    }

    async function getPractices(){
        const result = await DirectoriesService.getPractices();

        if (result.isSuccess){
            setPractices(result.data);
        }
        else {
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    async function getGroups(){
        const result = await DirectoriesService.getGroups();

        if (result.isSuccess){
            setGroups(result.data);
        }
        else {
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    async function getCompany(){
        const result = await DirectoriesService.getCompanies();

        if (result.isSuccess){
            setCompanies(result.data);
        }
        else {
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    function openEditPracticeModal(){
        setErrorsModal("");
        setIsOpenEditPracticeModal(true);
    }

    function openEditGroupModal(){
        setErrorsModal("");
        setIsOpenEditGroupModal(true);

    }

    function openEditCompanyModal(){
        setErrorsModal("");
        setIsOpenEditCompanyModal(true);
    }

    function closeEditPracticeModal(){
        setSelectedPractice(Item.Empty);
        setIsOpenEditPracticeModal(false);
    }

    function closeEditGroupModal(){
        setSelectedGroup(Item.Empty);
        setIsOpenEditGroupModal(false);
    }

    function closeEditCompanyModal(){
        setSelectedCompany(Item.Empty);
        setIsOpenEditCompanyModal(false);
    }

    function handleOnClickEditPracticeButton(practice: Item | null){
        setSelectedPractice(practice ?? Item.Empty);
        openEditPracticeModal();
    }

    function handleOnClickEditGroupButton(group: Item | null){
        setSelectedGroup(group ?? Item.Empty);
        openEditGroupModal();
    }

    function handleOnClickEditCompanyButton(company: Item | null){
        setSelectedCompany(company ?? Item.Empty);
        openEditCompanyModal();
    }

    function changeSelectedPracticeName(value: string){
        setSelectedPractice((prev) => ({
            ...prev,
            label: value
        }));
    }

    function changeSelectedGroupName(value: string){
        setSelectedGroup((prev) => ({
            ...prev,
            label: value
        }));
    }

    function changeSelectedCompanyName(value: string){
        setSelectedCompany((prev) => ({
            ...prev,
            label: value
        }));
    }

    async function savePractice() {
        const result = await DirectoriesService.savePractice(selectedPractice);

        if (result.isSuccess){
            loadData();
            closeEditPracticeModal();
        }
        else{
            setErrorsModal(result.errors[0]);
        }
    }

    async function saveGroup() {
        const result = await DirectoriesService.saveGroup(selectedGroup);

        if (result.isSuccess){
            loadData();
            closeEditGroupModal();
        }
        else{
            setErrorsModal(result.errors[0]);
        }
    }

    async function saveCompany() {
        const result = await DirectoriesService.saveCompany(selectedCompany);

        if (result.isSuccess){
            loadData();
            closeEditCompanyModal();
        }
        else{
            setErrorsModal(result.errors[0]);
        }
    }

    async function removePractice(id: string){
        const result = await DirectoriesService.removePractice(id);
        loadData();
    }

    async function removeGroup(id: string){
        const result = await DirectoriesService.removeGroup(id);
        loadData();
    }

    async function removeCompany(id: string){
        const result = await DirectoriesService.removeCompany(id);
        loadData();
    }

    return (
        <div className="row overflow-y-scroll overflow-x-hidden">
            <ReactNotifications />
            <div className="col">
                <div className="m-3 w-100 justify-content-evenly position-sticky">
                    <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                        Практики
                    </h2>
                    <button className="btn btn-primary position-absolute"
                            style={{height: "50px",
                                    width: "50px",
                                    top: 0,
                                    right: 20,
                                    fontSize: 'xx-large',
                                    lineHeight: '20px'
                            }}
                            onClick={()=>{handleOnClickEditPracticeButton(null)}}
                    >
                        +
                    </button>
                </div>
                <div className="overflow-y-scroll overflow-x-hidden"
                     style={{height: "750px"}}>
                    <table className="table table-hover table-bordered text-wrap">
                        <thead>
                            <tr>
                                <th className="th"></th>
                                <th>Название</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                practices?.map((practice, index) =>
                                    <tr key={practice.value}>
                                        <td>{index+1}</td>
                                        <td className="text-wrap">{practice.label}</td>
                                        <td>
                                            <div>
                                                <button className="btn btn-primary mx-1"
                                                        style={{width: "50px"}}
                                                        onClick={() => {handleOnClickEditPracticeButton(practice)}}>
                                                    🖊
                                                </button>
                                            </div>
                                            <div>
                                                <button className="btn btn-danger"
                                                        style={{width: "50px"}}
                                                        onClick={() => removePractice(practice.value)}>
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col">
                <div className="m-3 w-100 justify-content-evenly position-sticky">
                    <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                        Группы
                    </h2>
                    <button className="btn btn-primary position-absolute"
                            style={{height: "50px",
                                width: "50px",
                                top: 0,
                                right: 20,
                                fontSize: 'xx-large',
                                lineHeight: '20px'
                            }}
                            onClick={()=>{handleOnClickEditGroupButton(null)}}
                    >
                        +
                    </button>
                </div>
                <div className="overflow-y-scroll overflow-x-hidden"
                     style={{height: "750px"}}>
                    <table className="table table-hover table-bordered table-striped">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            groups?.map((group, index) =>
                                <tr key={group.value}>
                                    <td>{index+1}</td>
                                    <td>{group.label}</td>
                                    <td>
                                        <div>
                                            <button className="btn btn-primary mx-1"
                                                    style={{width: "50px"}}
                                                    onClick={() => {handleOnClickEditGroupButton(group)}}>
                                                🖊
                                            </button>
                                        </div>
                                        <div>
                                            <button className="btn btn-danger"
                                                    style={{width: "50px"}}
                                                    onClick={() => removeGroup(group.value)}>
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col">
                <div className="m-3 w-100 justify-content-evenly position-sticky">
                    <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                        Компании
                    </h2>
                    <button className="btn btn-primary position-absolute"
                            style={{height: "50px",
                                width: "50px",
                                top: 0,
                                right: 20,
                                fontSize: 'xx-large',
                                lineHeight: '20px'
                            }}
                            onClick={()=>{handleOnClickEditCompanyButton(null)}}
                    >
                        +
                    </button>
                </div>
                <div className="overflow-y-scroll overflow-x-hidden"
                     style={{height: "750px"}}>
                    <table className="table table-hover table-bordered">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            companies?.map((company, index) =>
                                <tr key={company.value}>
                                    <td>{index+1}</td>
                                    <td>{company.label}</td>
                                    <td>
                                        <div>
                                            <button className="btn btn-primary mx-1"
                                                    style={{width: "50px"}}
                                                    onClick={() => {handleOnClickEditCompanyButton(company)}}>
                                                🖊
                                            </button>
                                        </div>
                                        <div>
                                            <button className="btn btn-danger"
                                                    style={{width: "50px"}}
                                                    onClick={() => removeCompany(company.value)}>
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <CModal visible={isOpenEditPracticeModal} content-class-name={""}
                        onClose={closeEditPracticeModal} >
                    <CModalHeader>
                        <CModalTitle>
                            {selectedPractice.value.length > 0 ? "Редактирование" : "Добавление"} практики
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className="d-flex align-items-center">
                            <label className="form-label mx-2">Название:</label>
                            <input className="form-control"
                                   value={selectedPractice?.label || ""}
                                   placeholder="Введите название практики"
                                   onChange={(e) => changeSelectedPracticeName(e.target.value)}/>
                        </div>
                        <label style={{color: "red"}}>{errorsModal}</label>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={closeEditPracticeModal} color="secondary">Отмена</CButton>
                        <CButton onClick={savePractice} color="primary">Сохранить</CButton>
                    </CModalFooter>
                </CModal>
                <CModal visible={isOpenEditGroupModal}
                        onClose={closeEditGroupModal}>
                    <CModalHeader>
                        <CModalTitle>
                            {selectedGroup.value.length > 0 ? "Редактирование" : "Добавление"} группы
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className="d-flex align-items-center">
                            <label className="form-label mx-2">Название:</label>
                            <input className="form-control"
                                   value={selectedGroup?.label || ""}
                                   placeholder="Введите название группы"
                                   onChange={(e) => changeSelectedGroupName(e.target.value)}/>
                        </div>
                        <label style={{color: "red"}}>{errorsModal}</label>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={closeEditGroupModal} color="secondary">Отмена</CButton>
                        <CButton onClick={saveGroup} color="primary">Сохранить</CButton>
                    </CModalFooter>
                </CModal>
                <CModal visible={isOpenEditCompanyModal}
                        onClose={closeEditCompanyModal}>
                    <CModalHeader>
                        <CModalTitle>
                            <div style={{marginLeft: -500}}><ReactNotifications /></div>
                            {selectedCompany.value.length > 0 ? "Редактирование" : "Добавление"} компании
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className="d-flex align-items-center">
                            <label className="form-label mx-2">Название:</label>
                            <input className="form-control"
                                   value={selectedCompany?.label || ""}
                                   placeholder="Введите название компании"
                                   onChange={(e) => changeSelectedCompanyName(e.target.value)}/>
                        </div>
                        <label style={{color: "red"}}>{errorsModal}</label>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={closeEditCompanyModal} color="secondary">Отмена</CButton>
                        <CButton onClick={saveCompany} color="primary">Сохранить</CButton>
                    </CModalFooter>
                </CModal>
            </div>
        </div>
    );
}
