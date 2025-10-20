import Link from "next/link";

export default function BackendHeader({title}: {title?: string}) {
    return (
        <header className="_col-start-1 _col-end-4 _p-4 _bg-adminGray _flex _justify-between _items-center">
            <h1 className="_text-2xl _font-bold">LinC-MS</h1>
            <h1 className="_text-2xl _font-bold">{title}</h1> 
            <nav>
                <ul className="_flex _gap-4">
                    <li><Link href="/admin/dashboard" className="_text-adminBlue">Dashboard</Link></li>
                    <li><Link href="/admin/analytics" className="_text-adminBlue">Analytics</Link></li>
                    <li><Link href="/login" className="_text-adminBlue">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}