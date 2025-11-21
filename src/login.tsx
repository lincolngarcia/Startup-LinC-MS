import { useNavigate } from "react-router-dom";
import NeumorphicFlat from "./components/admin/Neumorphic/flat";
import { useRef } from "react";

export default function Page() {
    const router = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function login() {
        if (!usernameRef.current || !passwordRef.current) return;
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const response = await fetch("/api/login", {
            method: 'post',
            body: JSON.stringify({ email: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response?.status === 200) {
            router("/admin/dashboard")
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    }

    async function create() {
        if (!usernameRef.current || !passwordRef.current) return;
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const response = await fetch("/api/create", {
            method: 'post',
            body: JSON.stringify({ email: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response?.status === 200) {
            router("/admin/dashboard")
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }

    }

    return (
        <div className="h-screen w-screen bg-adminGray flex flex-col justify-center items-center">
            <NeumorphicFlat className="mb-[100px]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-adminBlue font-bold text-xl border-b border-adminBlue">LinC-MS</p>
                    <input ref={usernameRef} placeholder="Username" className="softShadow text-p6 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" />
                    <input ref={passwordRef} placeholder="Password" className="softShadow text-p4 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" type="password" />
                    <button className="softShadow w-full" onClick={login}>Login</button>
                    <button className="softShadow w-full bg-adminGreen" onClick={create}>Sign Up</button>
                </div>
            </NeumorphicFlat>
        </div>
    )
}