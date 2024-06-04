import axios from "axios";
import {Result} from "@/domain/shared/response";
import {UserBlank} from "@/domain/user/userBlank";

export class UserService {
	public static async getAllUser() {
		try {
			let result = await axios.get(`http://localhost:5018/AdminPanel/GetAllUsers`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async getOptions() {
		try {
			let result = await axios.get(`http://localhost:5018/AdminPanel/GetOptionsUserSetting`, {withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async saveUser(blank: UserBlank) {
		try {
			let result = await axios.post(`http://localhost:5018/AdminPanel/SaveUser`,
				 blank,
				{withCredentials: true});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}

	public static async removeUser(userId: string) {
		try {
			let result = await axios.post(`http://localhost:5018/AdminPanel/RemoveUser`,null,{
				params: {
					userId: userId
				},
				withCredentials: true
			});

			return result.data as Result;
		}
		catch {
			return Result.EmptyFailed();
		}
	}
}