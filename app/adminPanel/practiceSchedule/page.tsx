"use client"
import React, {useEffect, useState} from "react";
import {PracticeScheduleView} from "@/domain/practice/practiceScheduleView";
import {PracticeService} from "@/app/services/practiceService";
import {PracticeScheduleBlank} from "@/domain/practice/practiceScheduleBlank";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {ReactNotifications} from "react-notifications-component";
import {Item} from "@/domain/shared/item";
import Notification from "@/domain/shared/notification";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function PracticeScheduleSettingsPage() {

	const [practiceSchedules, setPracticeSchedules] = useState<PracticeScheduleView[]>([]);
	const [selectedSchedule, setSelectedSchedule] = useState<PracticeScheduleBlank>(PracticeScheduleBlank.Empty);
	const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);

	const [practiceOptions, setPracticeOptions] = useState<Item[]>([]);
	const [practiceLeadOptions, setPracticeLeadOptions] = useState<Item[]>([]);
	const [groupOptions, setGroupOptions] = useState<Item[]>([]);

	const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
	const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);

	const [selectedScheduleDateStart, setSelectedScheduleDateStart] = useState<Date>(new Date());
	const [selectedScheduleDateEnd, setSelectedScheduleDateEnd] = useState<Date>(new Date());

	useEffect(() => {
		loadData();
	}, []);

	async function loadData(){
		getPracticeSchedules();
	}

	function openEditModal() {
		getOptions();
		setIsOpenEditModal(true);
	}

	function closeEditModal(){
		setIsOpenEditModal(false);
	}

	function openRemoveModal(id: string) {
		setSelectedScheduleId(id);
		setIsOpenRemoveModal(true);
	}

	function closeRemoveModal(){
		setSelectedScheduleId(null);
		setIsOpenRemoveModal(false);
	}

	async function getPracticeSchedules(){
		await PracticeService.getPracticeSchedules().then(result => {
			setPracticeSchedules(result.data);
		});
	}

	async function getOptions(){
		const result = await PracticeService.getOptions();

		if (result.isSuccess){
			setPracticeOptions(result.data.practiceOptions as Item[]);
			setPracticeLeadOptions(result.data.practiceLeadOptions as Item[]);
			setGroupOptions(result.data.groupOptions as Item[]);
		}
		else {
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	async function handleOnClickAddButton(){
		setSelectedSchedule(PracticeScheduleBlank.Empty);
		setSelectedScheduleDateStart(new Date());
		setSelectedScheduleDateEnd(new Date());
		openEditModal();
	}

	async function handleOnClickEditButton(schedule: PracticeScheduleView){
		const scheduleTemp = PracticeScheduleBlank.ConvertFromPracticeScheduleView(schedule);

		setSelectedScheduleDateStart(new Date(scheduleTemp.dateStart))
		setSelectedScheduleDateEnd(new Date(scheduleTemp.dateEnd))
		setSelectedSchedule(scheduleTemp);

		openEditModal();
	}

	function changeSelectedScheduleProperty(value: string, property: string){
		setSelectedSchedule(prev => ({
			...prev,
			[property]: value
		}));
	}

	async function saveSchedule(){
		let scheduleForSave = selectedSchedule;

		scheduleForSave.dateStart = selectedScheduleDateStart;
		scheduleForSave.dateEnd = selectedScheduleDateEnd;

		if(scheduleForSave.practiceId.length == 0){
			scheduleForSave.practiceId = practiceOptions[0].value;
		}
		if(scheduleForSave.practiceLeadId.length == 0){
			scheduleForSave.practiceLeadId = practiceLeadOptions[0].value;
		}
		if(scheduleForSave.groupId.length == 0){
			scheduleForSave.groupId = groupOptions[0].value;
		}

		const result = await PracticeService.saveSchedule(scheduleForSave);

		if (result.isSuccess){
			loadData();
			closeEditModal();
		}
		else{
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	async function removeSchedule(){
		const result = await PracticeService.removeSchedule(selectedScheduleId!);

		if (result.isSuccess){
			loadData();
			closeRemoveModal();
			Notification("Пользователь успешно удален", 'warning');
		}
		else{
			result.errors.map(error => Notification(error, "danger"))
		}
	}

	return (
		<div className="mt-2">
			<div className="m-3 w-100 justify-content-evenly position-sticky">
				<h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>Расписание практик</h2>
				<button className="btn btn-primary position-absolute"
						style={{
							height: "50px",
							width: "50px",
							top: 0,
							right: 20,
							fontSize: 'xx-large',
							lineHeight: '20px'
						}}
						onClick={()=> handleOnClickAddButton()}
				>
					+
				</button>

			</div>
			<div className="overflow-y-scroll overflow-x-hidden  mt-4" style={{height: "700px"}}>
				<table className="table table-hover table-bordered table-striped">
					<thead>
						<tr>
							<th></th>
							<th>Практика</th>
							<th>Группа</th>
							<th>Руководитель</th>
							<th>Дата начала</th>
							<th>Дата окончания</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{
						practiceSchedules?.map((ps, index) =>
							<tr key={ps.id}>
								<td>{index + 1}</td>
								<td>{ps.practice.label}</td>
								<td>{ps.group.label}</td>
								<td>{ps.practiceLead.label}</td>
								<td>{ps.dateStart.toString().split("T")[0]}</td>
								<td>{ps.dateEnd.toString().split("T")[0]}</td>
								<td>
									<button className="btn btn-primary mx-1" onClick={() => handleOnClickEditButton(ps)}>
									🖊
									</button>
									<button className="btn btn-danger mx-1" onClick={() => openRemoveModal(ps.id)}>
										🗑
									</button>
								</td>
							</tr>)
					}
					</tbody>
				</table>
			</div>
			<CModal visible={isOpenEditModal} size="lg"
					onClose={closeEditModal}>
				<CModalHeader>
					<CModalTitle>
						{selectedSchedule != null ? "Редактирование" : "Создание"} расписания практики
					</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div>
						<ReactNotifications />
						<div className="d-flex">
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Практика</label>
								<select className="form-select" value={selectedSchedule?.practiceId}
										onChange={(e) => changeSelectedScheduleProperty(e.target.value, 'practiceId')}>
									{
										practiceOptions?.map(practice =>
											<option key={practice?.value} value={practice?.value}>{practice?.label}</option>)
									}
								</select>
							</div>
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Руководитель практики</label>
								<select className="form-select" value={selectedSchedule?.practiceLeadId}
										onChange={(e) => changeSelectedScheduleProperty(e.target.value, 'practiceLeadId')}>
									{
										practiceLeadOptions?.map(lead =>
											<option key={lead?.value} value={lead?.value}>{lead?.label}</option>
										)
									}
								</select>
							</div>
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Группа</label>
								<select className="form-select" value={selectedSchedule?.groupId} disabled={selectedSchedule.id != null}
										onChange={(e) => changeSelectedScheduleProperty(e.target.value, 'groupId')}>
									{
										groupOptions?.map(group =>
											<option key={group?.value} value={group?.value}>{group?.label}</option>)
									}
								</select>
							</div>
						</div>

						<div className="d-flex">
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Дата начала</label>
								<DatePicker selected={selectedScheduleDateStart} dateFormat="dd/MM/yyyy" className="form-control"
											onChange={(date: Date) => setSelectedScheduleDateStart(date)} />
							</div>
							<div className="mb-3 mx-2 w-50">
								<label className="form-label">Дата окончания</label>
								<DatePicker selected={selectedScheduleDateEnd} dateFormat="dd/MM/yyyy" className="form-control"
											onChange={(date: Date) => setSelectedScheduleDateEnd(date)}/>
							</div>
						</div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton onClick={closeEditModal} color="secondary">Закрыть</CButton>
					<CButton onClick={saveSchedule} color="primary">Сохранить</CButton>
				</CModalFooter>
			</CModal>
			<CModal visible={isOpenRemoveModal}
					onClose={closeRemoveModal}>
				<CModalHeader>
					<CModalTitle>
						Удаление пользователя
					</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div>
						Вы действительно хотите удалить расписание?
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton onClick={closeRemoveModal} color="secondary">Отмена</CButton>
					<CButton onClick={removeSchedule} color="primary">Подтвердить</CButton>
				</CModalFooter>
			</CModal>
		</div>
	);
}
