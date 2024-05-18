import axios from "axios";
import {Result} from "@/domain/shared/response";

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
}