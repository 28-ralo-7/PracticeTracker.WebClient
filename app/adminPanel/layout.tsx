import 'bootstrap/dist/css/bootstrap.css';
import {ReactNotifications} from "react-notifications-component";

export default function AdminLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav className="nav nav text-white align-items-center">
                <ul>
                    <li>Практики</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </nav>
            {children}

        </div>
    );
}
