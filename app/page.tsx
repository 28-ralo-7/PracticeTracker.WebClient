'use client'
import {useEffect} from "react";
import {AuthService} from "@/app/services/authService";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        checkAuthUserPermission();
    }, []);

    async function checkAuthUserPermission(){
        const result = await AuthService.checkAuthUserPermission();

        if (result.isSuccess){
            router.push(result.data);
        }
    }

    return (
      <div>
      </div>
    );
}
