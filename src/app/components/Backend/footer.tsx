import {Router, useRouter} from 'next/router';

export default function BackendFooter() {
    const router = useRouter();

    return (
        <footer className="flex justify-center items-center p-4 bg-adminGray">
            <p>LinC-MS ©2025 All righsts reserved.</p>
        </footer>
    )
}