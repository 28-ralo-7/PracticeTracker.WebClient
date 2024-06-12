'use client';
import React, {useEffect, useState} from "react";
import {UserSettingView} from "@/domain/user/userSettingView";
import {UserService} from "@/app/services/userService";
import Notification from "@/domain/shared/notification";
import {Item} from "@/domain/shared/item";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {UserBlank} from "@/domain/user/userBlank";
import {ReactNotifications} from "react-notifications-component";

export default function UserSettingsPage() {
	const [users, setUsers] = useState<UserSettingView[]>([]);
	const [usersLocal, setUsersLocal] = useState<UserSettingView[]>([]);

	const [roleOptions, setRoleOptions] = useState<Item[]>([]);
	const [groupOptions, setGroupOptions] = useState<Item[]>([]);

	const [selectedRoleFilter, setSelectedRoleFilter] = useState<string | null>(null);
	const [selectedGroupFilter, setSelectedGroupFilter] = useState<string | null>(null);

	const [isOpenEditUserModal, setIsOpenEditUserModal] = useState<boolean>(false);
	const [isOpenRemoveUserModal, setIsOpenRemoveUserModal] = useState<boolean>(false);

	const [selectedUser, setSelectedUser] = useState<UserBlank>(UserBlank.Empty);
	const [removedUserId, setRemovedUserId] = useState<string>('');

	useEffect(() => {
		loadData()
	}, []) // хук на загрузку данных

	useEffect(() => {
		refreshRoleFilter();
	}, [selectedRoleFilter])// хук на обновление фильтра роли

	useEffect(() => {
		refreshGroupFilter();
	}, [selectedGroupFilter])// обновление фильтра группы

	function refreshRoleFilter(){
		setSelectedGroupFilter(null);

		if (selectedRoleFilter != null && selectedRoleFilter != ""){
			const usersTemp = users.filter(user => user.role?.value == selectedRoleFilter);
			setUsersLocal(usersTemp);
		}
		else {
			setUsersLocal(users);
		}
	} //обновление фильтра роли

	function refreshGroupFilter(){
		if (selectedGroupFilter != null){
			const usersTemp = users
				.filter(user =>
					user.group?.value == selectedGroupFilter
					&& user.role?.value == selectedRoleFilter);
			setUsersLocal(usersTemp);
		}
		else {
			refreshRoleFilter();
		}
	} // обновление фильтра группы

	async function loadData(){
		getOptions();
		getAllUser();
	} // загрузка данных

	async function getAllUser(){
		const result = await UserService.getAllUser();

		if (result.isSuccess){
			setUsers(result.data);
			setUsersLocal(result.data);
		}
		else {
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	async function getOptions(){
		const result = await UserService.getOptions();

		if (result.isSuccess){
			setGroupOptions(result.data.groupOptions as Item[]);
			setRoleOptions(result.data.roleOptions as Item[]);
		}
		else {
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	function isDisableGroup(){
		return selectedRoleFilter != "3";
	} //проверка доступности фильтра групп

	function openEditUserModal() {
		setIsOpenEditUserModal(true);
	}

	function closeEditUserModal(){
		setIsOpenEditUserModal(false);
	}

	function openRemoveUserModal() {
		setIsOpenRemoveUserModal(true);
	}

	function closeRemoveUserModal(){
		setIsOpenRemoveUserModal(false);
	}

	function handleOnClickAddButton(){
		setSelectedUser(UserBlank.Empty);
		openEditUserModal();
	}

	function handleOnClickEditButton(user: UserSettingView){
		const userTemp = UserBlank.ConvertFromUserSettingView(user);

		setSelectedUser(userTemp);
		openEditUserModal();
	}

	function handleOnClickRemoveButton(id: string){
		setRemovedUserId(id);
		openRemoveUserModal();
	}

	async function saveUser(){
		if (!isStudent()){
			changeSelectedUserProperty(null, 'groupId');
		}

		const result = await UserService.saveUser(selectedUser);

		if (result.isSuccess){
			loadData();
			closeEditUserModal();
		}
		else{
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	async function removeUser(){
		const result = await UserService.removeUser(removedUserId);

		if (result.isSuccess){
			loadData();
			closeRemoveUserModal();
			Notification("Пользователь успешно удален", 'warning');
		}
		else{
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	function changeSelectedUserProperty(value: string | null, property: string){
		setSelectedUser(prevUser => ({
			...prevUser,
			[property]: value
		}));
	}

	function changeSelectedUserRole(value: string | null){
		setSelectedUser(prevUser => ({
			...prevUser,
			groupId: groupOptions[0].value,
			roleId: value
		}));
	}

	function isStudent(){
		return selectedUser?.roleId == "3";
	}

	return (
		<div className="mt-2">
			<ReactNotifications/>
			<div className="m-3 w-100 justify-content-evenly position-sticky">
				<h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>Пользователи</h2>
				<button className="btn btn-primary position-absolute"
						style={{
							height: "50px",
							width: "50px",
							top: 0,
							right: 20,
							fontSize: 'xx-large',
							lineHeight: '20px'
						}}
						onClick={handleOnClickAddButton}
				>
					+
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
									<button className="btn btn-primary mx-1" onClick={() => handleOnClickEditButton(user)}>
										🖊
									</button>
									<button className="btn btn-danger mx-1" onClick={() => handleOnClickRemoveButton(user.id)}>
										🗑
									</button>
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
			<CModal visible={isOpenEditUserModal} size="lg"
					onClose={closeEditUserModal}>
				<CModalHeader>
					<CModalTitle>
						{selectedUser != null ? "Редактирование" : "Создание"} пользователя
					</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div>
						<ReactNotifications />
						<div className="d-flex">
							<div className="mb-3 mx-2">
								<label className="form-label">Фамилия</label>
								<input className="form-control"
									   value={selectedUser?.surname || ""}
									   onChange={(e) => changeSelectedUserProperty(e.target.value, 'surname')}
								/>
							</div>
							<div className="mb-3 mx-2">
								<label className="form-label">Имя</label>
								<input className="form-control" value={selectedUser?.name || ""}
									   onChange={(e) => changeSelectedUserProperty(e.target.value, 'name')}/>
							</div>
							<div className="mb-3 mx-2">
								<label className="form-label">Отчество</label>
								<input className="form-control" value={selectedUser?.patronymic || ""}
									   onChange={(e) => changeSelectedUserProperty(e.target.value, 'patronymic')}/>
							</div>
						</div>

						<div className="d-flex">
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Логин</label>
								<input className="form-control" value={selectedUser?.login || ""}
									   onChange={(e) => changeSelectedUserProperty(e.target.value, 'login')}/>
							</div>
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Пароль</label>
								<input className="form-control" value={selectedUser?.password || ""}
									   onChange={(e) => changeSelectedUserProperty(e.target.value, 'password')}/>
							</div>
						</div>

						<div className="d-flex">
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Роль</label>
								<select className="form-select" value={selectedUser?.roleId || ""} disabled={selectedUser.id != null}
										onChange={(e) => changeSelectedUserRole(e.target.value)}>
									{
										roleOptions?.map(role =>
											<option key={role?.value} value={role?.value}>{role?.label}</option>)
									}
								</select>
							</div>
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Группа</label>
								<select className="form-select" disabled={!isStudent()}
										value={selectedUser?.groupId || ""}
										onChange={(e) => changeSelectedUserProperty(e.target.value, 'groupId')}>
									{
										isStudent() &&
										groupOptions?.map(group =>
											<option key={group?.value} value={group?.value}>{group?.label}</option>)
									}
								</select>
							</div>
						</div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton onClick={closeEditUserModal} color="secondary">Закрыть</CButton>
					<CButton onClick={saveUser} color="primary">Сохранить</CButton>
				</CModalFooter>
			</CModal>
			<CModal visible={isOpenRemoveUserModal}
					onClose={closeRemoveUserModal}>
				<CModalHeader>
					<CModalTitle>
						Удаление пользователя
					</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div>
						Вы действительно хотите удалить пользователя?
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton onClick={closeEditUserModal} color="secondary">Отмена</CButton>
					<CButton onClick={removeUser} color="primary">Подтвердить</CButton>
				</CModalFooter>
			</CModal>
		</div>
	);
}