import { Router, useRouter } from "next/router"
import "./backend.css"

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex-centered" id='login-page'>
            <div className="neumorphic-box" id='login-box'>
                <p className="title">LINCms</p>
                <input placeholder="Username" /><br />
                <input placeholder="Password" type="password" /><br />
                <button onClick={() => router.push("/admin/dashboard")}>Login</button><br />
            </div>
        </div>
    )
}