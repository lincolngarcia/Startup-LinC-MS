import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"

export default function BackendMenu({className = '', active}: {active: string, className?: string}) {
    const classes = [className].join(" ");
    return (
        <NeumorphicFlat className={classes + "col-start-2 col-end-3 p-4"}>
            <nav>
                <ul className="text-xl">
                    <li className="my-3"><NeumorphicPressed active={(active == "Home")} ><a href="/admin/dashboard">Home</a></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Analytics")} ><a href="/admin/analytics">Analytics</a></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Pages")} >Pages</NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Settings")} >Settings</NeumorphicPressed></li>
                </ul>
            </nav>
        </NeumorphicFlat>
    )
}