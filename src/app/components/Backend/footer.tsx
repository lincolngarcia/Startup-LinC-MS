import {Router, useRouter} from 'next/router';

export default function BackendFooter() {
    const router = useRouter();

    return (
        <footer className="_flex _justify-center _items-center _p-4 _bg-adminGray">
            <p>LinC-MS ©2025 All righsts reserved.</p>
        </footer>
    )
}