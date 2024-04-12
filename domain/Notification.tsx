"use client";
import 'bootstrap/dist/css/bootstrap.css';
import {NOTIFICATION_TYPE, Store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default function Notification(message: string, type: NOTIFICATION_TYPE) {
    function getTitle() {
        switch (type) {
            case 'success':
                return "Успех!";
            case 'warning':
                return "Предупреждение!";
            case 'danger':
                return "Ошибка";
        }
    }

    return (
            Store.addNotification({
            title: getTitle(),
            message: message,
            type: type!,
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: 5000,
            onScreen: true
        }
        })
    );
}
