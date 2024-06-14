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
				withCredentials: true,
				responseType: 'blob',
				headers: {'accept': '*/*'}
			});

			// @ts-ignore
			const contentDisposition = response.headers.get('Content-Disposition');
			const name = this.getFileName(contentDisposition)

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', name);
			document.body.appendChild(link);
			link.click();
			link.remove();

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

	public static getFileName(disposition: string): string {
		const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
		const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;
		let fileName: string | null = null;
		if (utf8FilenameRegex.test(disposition)) {
			fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)![1]);
		} else {
			// prevent ReDos attacks by anchoring the ascii regex to string start and
			//  slicing off everything before 'filename='
			const filenameStart = disposition.toLowerCase().indexOf('filename=');
			if (filenameStart >= 0) {
				const partialDisposition = disposition.slice(filenameStart);
				const matches = asciiFilenameRegex.exec(partialDisposition );
				if (matches != null && matches[2]) {
					fileName = matches[2];
				}
			}
		}
		return fileName!;
	}
}