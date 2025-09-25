import { Router, useRouter } from "next/router"
export default function Page() {
    const router = useRouter();
    return (
        <div>
            <input placeholder="Username" /><br />
            <input placeholder="Password" type="password" /><br />
            <button onClick={() => router.push("/admin/dashboard")}>Login</button><br />
        </div>
    )
}