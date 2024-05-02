import axios from "axios";
import {Result} from "@/domain/shared/Response";

export class AuthService{
    public static async authByLoginAndPassword(login: string, password: string) {
        try {
            let result = await axios.post(`http://localhost:5018/Auth/Auth`, null,{
                params: {
                    login: login,
                    password: password
                }
            });
            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }

    }
}