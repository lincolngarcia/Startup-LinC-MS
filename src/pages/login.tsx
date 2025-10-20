import RootLayout from "./layout"
import { Router, useRouter } from "next/router"
import NeumorphicFlat from "../app/components/Backend/Neumorphic/flat";

export default function Page() {
    const router = useRouter();
    console.log(router)

    return (
        <div className="_h-screen _w-screen _bg-adminGray _flex _flex-col _justify-center _items-center">
                <NeumorphicFlat className="_mb-[100px]">
                    <div className="_flex _flex-col _justify-center _items-center _gap-4">
                        <p className="_text-adminBlue _font-bold _text-xl _border-b _border-adminBlue">LinC-MS</p>
                        <input placeholder="Username" className="softShadow _text-p6 _rounded-lg _py-1 _px-4 _transition-shadow _duration-[0.5s] _text-black;" />
                        <input placeholder="Password" className="softShadow _text-p4 _rounded-lg _py-1 _px-4 _transition-shadow _duration-[0.5s] _text-black;" type="password" />
                        <button className="softShadow _w-full" onClick={() => router.push("/admin/dashboard")}>Login</button>
                    </div>
                </NeumorphicFlat>
        </div>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
