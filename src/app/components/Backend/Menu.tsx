import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"

export default function BackendMenu({className = ''}: {className?: string}) {
    const classes = [className].join(" ");
    return (
        <NeumorphicFlat className={classes + "_col-start-2 _col-end-3 _p-4 _bg-white"}>
            <nav>
                <ul className="_text-xl">
                    <li className="_my-3"><NeumorphicPressed className="_w-4/5 text-center">Home</NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={false} ><a href="/admin/analytics">Analytics</a></NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={false} >Pages</NeumorphicPressed></li>
                    <li className="_my-3"><NeumorphicPressed active={false} >Settings</NeumorphicPressed></li>
                </ul>
            </nav>
        </NeumorphicFlat>
    )
}