import axios from "axios";
import {Result} from "@/domain/shared/response";
import {UserBlank} from "@/domain/user/userBlank";
import {PracticeScheduleBlank} from "@/domain/practice/practiceScheduleBlank";

export class PracticeService {
	public static async getPracticesByPermission() {
		try {
			let result = await axios.get(`http://localhost:5018/Practices/GetPracticeItemListByPermissions`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async getPracticeSchedules() {
		try {
			let result = await axios.get(`http://localhost:5018/AdminPanel/GetPracticeSchedules`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async getPracticeLogByPracticeId(practiceId: string) {
		try {
			let result = await axios.get(`http://localhost:5018/Practice/GetPracticeLogByPracticeId?practiceId=${practiceId}`, {
					withCredentials: true
				}
			);

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async getOptions() {
		try {
			let result = await axios.get(`http://localhost:5018/AdminPanel/GetOptionsForPracticeSchedule`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async getCompaniesOptions() {
		try {
			let result = await axios.get(`http://localhost:5018/Practice/GetCompanies`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async saveSchedule(blank: PracticeScheduleBlank) {
		try {
			let result = await axios.post(`http://localhost:5018/AdminPanel/SaveSchedule`,
				blank,
				{withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async savePracticeLogGrade(logId: string, grade: string) {
		debugger
		try {
			let result = await axios.post(`http://localhost:5018/Practice/SavePracticeLogGrade`,
				null,
				{
					params:{
						logId: logId,
						grade: grade
					},
					withCredentials: true
				});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async savePracticeLogCompany(logId: string, companyName: string) {
		try {
			let result = await axios.post(`http://localhost:5018/Practice/SavePracticeLogCompany`,
				null,
				{
					params:{
						logId: logId,
						companyName: companyName
					},
					withCredentials: true
				});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async removeSchedule(scheduleId: string) {
		try {
			let result = await axios.post(`http://localhost:5018/AdminPanel/RemoveSchedule`,null,{
				params: {
					scheduleId: scheduleId
				},
				withCredentials: true
			});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async uploadContract(formData: FormData, logId: string) {
		try {
			let result = await axios.post(`http://localhost:5018/Practice/UploadContract`, formData,
			{
				params: {logId: logId},
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async uploadReport(formData: FormData, logId: string) {
		try {
			let result = await axios.post(`http://localhost:5018/Practice/UploadReport`, formData,
			{
				params: {logId: logId},
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async downloadContract(logId: string) {
		try {
			const response = await axios.post('http://localhost:5018/Practice/DownloadContract', null, {
				params: { logId: logId },
				responseType: 'blob',
				withCredentials: true,
			});
			debugger
			const a = response.headers;
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', response.data);
			document.body.appendChild(link);
			link.click(); // Имитируем клик для начала скачивания
			document.body.removeChild(link); // Удаляем элемент <a> после скачивания файла
		} catch (error) {
			console.error(error);
		}
	}

	public static async downloadReport(logId: string) {
		try {
			const response = await axios.post('http://localhost:5018/Practice/DownloadContract', null, {
				params: { logId: logId },
				withCredentials: true
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', response.data);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error('Failed to download file:', error);
		}
	}
}