import axios from "axios";
import {Result} from "@/domain/shared/response";
import {Item} from "@/domain/shared/item";

export class DirectoriesService {
    public static async getPractices() {
        try {
            let result = await axios.get(`http://localhost:5018/AdminPanel/GetPractices`, {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async getGroups() {
        try {
            let result = await axios.get(`http://localhost:5018/AdminPanel/GetGroups`, {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async getCompanies() {
        try {
            let result = await axios.get(`http://localhost:5018/AdminPanel/GetCompanies`, {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async savePractice(practice: Item) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/SavePractice`,
                practice,
                {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async saveGroup(group: Item) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/SaveGroup`,
                group,
                {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async saveCompany(company: Item) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/SaveCompany`,
                company,
                {withCredentials: true});

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async removePractice(practiceId: string) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/RemovePractice`,null,{
                params: {
                    id: practiceId
                },
                withCredentials: true
            });

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async removeGroup(groupId: string) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/RemoveGroup`,null,{
                params: {
                    groupId: groupId
                },
                withCredentials: true
            });

            return result.data as Result;
        }
        catch {
            return Result.EmptyFailed();
        }
    }

    public static async removeCompany(companyId: string) {
        try {
            let result = await axios.post(`http://localhost:5018/AdminPanel/RemoveCompany`,null,{
                params: {
                    companyId: companyId
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