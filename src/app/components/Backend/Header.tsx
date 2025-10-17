import {Router, useRouter} from 'next/router';

export default function BackendHeader() {
    const router = useRouter();

    return (
        <header className="_col-start-1 _col-end-4 _p-4 _bg-adminGray _flex _justify-between _items-center">
            <h1 className="_text-2xl _font-bold">LinC-MS</h1>
            <nav>
                <ul className="_flex _gap-4">
                    <li><a href="/admin/dashboard" className="_text-adminBlue">Dashboard</a></li>
                    <li><a href="/admin/analytics" className="_text-adminBlue">Analytics</a></li>
                    <li><a href="/admin/login" className="_text-adminBlue">Pages</a></li>
                </ul>
            </nav>
        </header>
    )
}