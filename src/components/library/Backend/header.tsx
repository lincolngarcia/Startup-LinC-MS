import Link from "next/link";

export default function BackendHeader({title}: {title?: string}) {
    return (
        <header className="col-start-1 col-end-4 p-4 bg-adminGray flex justify-between items-center">
            <h1 className="text-2xl font-bold">LinC-MS</h1>
            <h1 className="text-2xl font-bold">{title}</h1> 
            <nav>
                <ul className="flex gap-4">
                    <li><Link href="/admin/dashboard" className="text-adminBlue">Dashboard</Link></li>
                    <li><Link href="/admin/analytics" className="text-adminBlue">Analytics</Link></li>
                    <li><Link href="/login" className="text-adminBlue">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}