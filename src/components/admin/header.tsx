import { Link } from "react-router-dom"

export default function BackendHeader({ title }: { title?: string }) {
    return (
        <header className="col-start-1 col-end-4 p-4 bg-adminGray flex justify-between items-center">
            <h1 className="text-2xl font-bold">LinC-MS</h1>
            <h1 className="text-2xl font-bold">{title}</h1>
            <nav>
                <ul className="flex gap-4">
                    <li><Link to="/admin/dashboard" className="text-adminBlue">Dashboard</Link></li>
                    <li><Link to="/admin/analytics" className="text-adminBlue">Analytics</Link></li>
                    <li>
                        <button
                            onClick={async () => {
                                await fetch("/api/logout", {
                                    method: "DELETE",
                                    credentials: "include"
                                });

                                window.location.href = "/login";
                            }}
                            className="text-adminBlue">Logout</button></li>
                </ul>
            </nav>
        </header>
    )
}
