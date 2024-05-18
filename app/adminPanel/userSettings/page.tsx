'use client';
import React, {useEffect, useState} from "react";
import {UserSettingView} from "@/domain/user/userSettingView";
import {UserService} from "@/app/services/userService";
import Notification from "@/domain/shared/notification";
import {PracticeLogView} from "@/domain/practice/practiceLogView";
import {Item} from "@/domain/shared/item";

export default function UserSettingsPage() {
    const roles = [
        {value: 3, label: "Студент"},
        {value: 2, label: "Руководитель практики"},

    ];

    const [users, setUsers] = useState<UserSettingView[]>([]);
    const [usersLocal, setUsersLocal] = useState<UserSettingView[]>([]);

    const [roleOptions, setRoleOptions] = useState<Item[]>([]);
    const [groupOptions, setGroupOptions] = useState<Item[]>([]);

    const [selectedRoleFilter, setSelectedRoleFilter] = useState<string | null>(null);
    const [selectedGroupFilter, setSelectedGroupFilter] = useState<string | null>(null);

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        setSelectedGroupFilter(null);

        if (selectedRoleFilter != null && selectedRoleFilter != ""){
            const usersTemp = users.filter(user => user.role?.value == selectedRoleFilter);
            setUsersLocal(usersTemp);
        }
        else {
            setUsersLocal(users);
        }

    }, [selectedRoleFilter])

    useEffect(() => {
        if (selectedGroupFilter != null){
            const usersTemp = users
                .filter(user =>
                    user.group?.value == selectedGroupFilter
                    && user.role?.value == selectedRoleFilter);
            setUsersLocal(usersTemp);
        }
        else {
            const usersTemp = users.filter(user => user.role?.value == selectedRoleFilter);
            setUsersLocal(usersTemp);
        }

    }, [selectedGroupFilter])

    async function loadData(){
        const result = await UserService.getAllUser();

        if (result.isSuccess){
            setUsers(result.data);
            setUsersLocal(result.data);

            const rolesTemp = (result.data as UserSettingView[]).map(x => x.role);
            const groupsTemp = (result.data as UserSettingView[]).map(x => x.group);

            const uniqueRoles = rolesTemp.filter((item, index) =>
                rolesTemp.findIndex(x => x?.value === item?.value) === index
            );
            const uniqueGroups = groupsTemp.filter((item, index) =>
                groupsTemp.findIndex(x => x?.value === item?.value && x != null) === index
            );

            setRoleOptions(uniqueRoles as Item[]);
            setGroupOptions(uniqueGroups as Item[]);
        }
        else {
            result.errors.map(error => Notification(error, "danger"))
        }
    }

    function isDisableGroup(){
        return selectedRoleFilter != "3";
    }

    return (
        <div className="mt-2">
            <div className="m-3 w-100 justify-content-evenly position-sticky">
                <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>Пользователи</h2>
                <button className="btn btn-primary position-absolute"
                        style={{height: "50px", width: "100px", top: 0, right: 20}}
                        onClick={() => {console.log(users); console.log(usersLocal)}}
                >
                    Добавить
                </button>
            </div>
            <div className=" row d-flex align-items-center">
                <div className="col">
                    <label className="mx-1">Фильтр по роли</label>
                    <select className="form-select mx-1" value={selectedRoleFilter ?? 0}
                            onChange={(value) => setSelectedRoleFilter(value.target.value)}>
                        <option value={""} label="Выберите роль"></option>)
                        {
                            roleOptions?.map(role =>
                                <option key={role?.value} value={role?.value}>{role?.label}</option>)
                        }
                    </select>
                </div>
                <div className="col">
                    <label className="mx-1">Фильтр по группе</label>
                    <select className="form-select mx-1" disabled={isDisableGroup()} value={selectedGroupFilter ?? 0}
                            onChange={(value) => setSelectedGroupFilter(value.target.value)}>
                        <option value={undefined}>Выберите группу</option>)
                        {
                            groupOptions?.map(group =>
                                <option key={group?.value} value={group?.value}>{group?.label}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="overflow-y-scroll overflow-x-hidden  mt-4" style={{height: "700px"}}>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                    <tr>
                        <th></th>
                        <th>ФИО</th>
                        <th>Логин</th>
                        <th>Роль</th>
                        <th>Группа</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        usersLocal.length > 0 &&
                        usersLocal.map((user, index) =>
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.fullName}</td>
                                <td>{user.login}</td>
                                <td>{user.role?.label}</td>
                                <td>{user.group?.label ?? "-"}</td>
                                <td>
                                    <button className="btn btn-primary mx-1">
                                        Редактировать
                                    </button>
                                    <button className="btn btn-danger mx-1">
                                        Удалить
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