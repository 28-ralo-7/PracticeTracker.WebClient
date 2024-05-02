import axios from "axios";
import {Result} from "@/domain/shared/Response";

export class GroupService{
    public static async getGroupByPermission() {
        try {
            let result = await axios.get(`http://localhost:5018/Group/GetGroupsByPermissions`);

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }

    }
}