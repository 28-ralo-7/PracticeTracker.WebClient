"use client";
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/college_logo.png';
import React, {useState} from "react";
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Notification from "@/domain/shared/notification";
import {AuthService} from "@/app/services/authService";
import {Result} from "@/domain/shared/response";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    async function handleOnClinkAuth(){
        if (login.trim() == '' || password.trim() == '')
        {
            Notification("Заполните все поля", "warning");
        }
        else {
            const response: Result = await AuthService.authByLoginAndPassword(login, password);

            if (response.isSuccess){
                router.push(response.data);
            }
            else{
                response.errors.map(error => Notification(error, "danger"))
            }
        }
    }

    return (
        <div className={`w-25 position-absolute top-50 start-50 translate-middle bg-white rounded-3`}>
            <ReactNotifications />
            <div className={`card-body p-3 text-center`}>
                <img src={'college_logo.png'} alt={'projectLogo'} style={{width: '100px'}}/>
                <form>
                    <div className={`image`}>
                        <img style={{'width': '45%'}}
                             alt="">
                        </img>
                    </div>
                    <div className={`textbox mt-3`}>
                        <input id={"username"} onChange={(event)=> setLogin(event.target.value)} autoFocus={true} className="form-control" type="text" maxLength={25} placeholder="Введите логин">
                        </input>
                    </div>
                    <div className={`textbox mt-3`}>
                        <input id={"password"} onChange={(event)=> setPassword(event.target.value)} className="form-control" type="password" maxLength={25} autoComplete="off" placeholder="Введите пароль">
                        </input>
                    </div>
                    <button id={"login-submit"} type="button" onClick={handleOnClinkAuth} className={`btn bg-black text-white mt-3 w-100`}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}
