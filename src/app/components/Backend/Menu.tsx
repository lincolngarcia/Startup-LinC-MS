import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"

export default function BackendMenu({className = '', active}: {active: string, className?: string}) {
    const classes = [className].join(" ");
    return (
        <NeumorphicFlat className={classes + "_col-start-2 _col-end-3 _p-4 _bg-white"}>
            <nav>
                <ul className="_text-xl">
                    <li className="_my-3"><NeumorphicPressed active={(active == "Home")} ><a href="/admin/dashboard">Home</a></NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={(active == "Analytics")} ><a href="/admin/analytics">Analytics</a></NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={(active == "Pages")} >Pages</NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={(active == "Settings")} >Settings</NeumorphicPressed></li>
                </ul>
            </nav>
        </NeumorphicFlat>
    )
}