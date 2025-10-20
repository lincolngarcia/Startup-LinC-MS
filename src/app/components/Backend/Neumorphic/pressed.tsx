export default function NeumorphicPressed({ active = true, children, className = '' }: { active?: boolean, children: React.ReactNode, className?: string }) {
    const activeClasses = "p-1 rounded-lg transition-shadow duration-[0.5s] text-black shadow-[inset5px5px10px#bebebe,inset-5px-5px10px#ffffff] bg-adminGray";
    const classes = [className, active ? activeClasses : ''].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <span className="p-1">
                {children}
            </span>
        </div>
    )
}