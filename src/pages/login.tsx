import AdminLayout from "@/src/pages/layout"
import { Router, useRouter } from "next/router"
import NeumorphicFlat from "../app/components/Backend/Neumorphic/flat";
import { useRef } from "react";

export default function Page() {
    const router = useRouter();
    console.log(router)

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function handleLogin() {
        if (!usernameRef.current || !passwordRef.current) return errorHandler()
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })

            const data = await res.json()
            if (!res.ok) return errorHandler()
            
            router.push("/admin/dashboard")
        } catch (err) {
            console.error('Login failed:', err)
            errorHandler()
        }
    }

    async function handleSignup() {
        if (!usernameRef.current || !passwordRef.current) return errorHandler()
        try {
            const res = await fetch("/api/auth/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })

            const data = await res.json()
            if (!res.ok) return errorHandler()
            
            router.push("/admin/dashboard")
        } catch (err) {
            console.error('Signup failed:', err)
            errorHandler()
        }
    }

    function errorHandler() {
        // You can enhance this with a proper error UI component
        alert('Login failed. Please check your credentials and try again.')
    }


    return (
        <div className="h-screen w-screen bg-adminGray flex flex-col justify-center items-center">
                <NeumorphicFlat className="mb-[100px]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-adminBlue font-bold text-xl border-b border-adminBlue">LinC-MS</p>
                        <input ref={usernameRef} placeholder  ="Username" className="softShadow text-p6 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" />
                        <input ref={passwordRef} placeholder="Password" className="softShadow text-p4 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" type="password" />
                        <button className="softShadow w-full" onClick={handleLogin}>Login</button>
                        <button className="softShadow w-full bg-adminGreen" onClick={handleSignup}>Sign Up</button>
                    </div>
                </NeumorphicFlat>
        </div>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
