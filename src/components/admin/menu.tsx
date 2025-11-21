import NeumorphicFlat from "../../components/admin/Neumorphic/flat"
import NeumorphicPressed from "../../components/admin/Neumorphic/pressed"
import { Link } from "react-router-dom";

export default function BackendMenu({className = '', active}: {active: string, className?: string}) {
    const classes = [className].join(" ");
    return (
        <NeumorphicFlat className={classes}>
            <nav>
                <ul className="text-xl">
                    <li className="my-3"><NeumorphicPressed active={(active == "Dashboard")} ><Link to="/admin/dashboard">Home</Link></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Analytics")} ><Link to="/admin/analytics">Analytics</Link></NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Pages")} >Pages</NeumorphicPressed></li>
                    <li className="my-3"><NeumorphicPressed active={(active == "Settings")} >Settings</NeumorphicPressed></li>
                </ul>
            </nav>
        </NeumorphicFlat>
    )
}