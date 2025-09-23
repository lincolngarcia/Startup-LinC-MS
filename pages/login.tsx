import { Router, useRouter } from "next/router"
export default function Page() {
    const router = useRouter();
    function toDashboard() {
        router.push("/admin/dashboard");
    }
    return (
        <div>
            <input placeholder="Username" /><br />
            <input placeholder="Password" type="password" /><br />
            <button onClick={toDashboard}>Login</button><br />
        </div>
    )
}