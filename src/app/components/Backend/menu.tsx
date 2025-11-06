import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"
import Link from "next/link"

export default function BackendMenu({className = '', active}: {active: string, className?: string}) {
    const classes = [className].join(" ");
    return (
        <NeumorphicFlat className={classes}>
            <nav>
                <ul className="text-xl">
                    <li className="my-3"><NeumorphicPressed active={(active == "Home")} ><Link href="/admin/dashboard">Home</Link></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Analytics")} ><Link href="/admin/analytics">Analytics</Link></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Pages")} >Pages</NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Settings")} >Settings</NeumorphicPressed></li>
                </ul>
            </nav>
        </NeumorphicFlat>
    )
}