import AdminLayout from "@/src/pages/layout"
import { Router, useRouter } from "next/router"
import NeumorphicFlat from "../app/components/Backend/Neumorphic/flat";

export default function Page() {
    const router = useRouter();
    console.log(router)

    return (
        <div className="h-screen w-screen bg-adminGray flex flex-col justify-center items-center">
                <NeumorphicFlat className="mb-[100px]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-adminBlue font-bold text-xl border-b border-adminBlue">LinC-MS</p>
                        <input placeholder  ="Username" className="softShadow text-p6 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" />
                        <input placeholder="Password" className="softShadow text-p4 rounded-lg py-1 px-4 transition-shadow duration-500 text-black;" type="password" />
                        <button className="softShadow w-full" onClick={() => router.push("/admin/dashboard")}>Login</button>
                        <button className="softShadow w-full bg-adminGreen" onClick={() => console.log('sign up')}>Sign Up</button>
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
