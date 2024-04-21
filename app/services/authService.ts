import axios from "axios";
import {redirect} from "next/navigation";

export class AuthService{
    public static auhtByLoginAndPassword(login: string, password: string){
        axios.post(`https://localhost:7242/Authorization/Authorize`, {login: login, password: password}).then(response => {

        });
    }
}