import axios from "axios";
import {Result} from "@/domain/shared/response";

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
}