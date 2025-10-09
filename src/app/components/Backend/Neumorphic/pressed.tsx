export default function NeumorphicPressed({ active = true, children, className = '' }: { active?: boolean, children: React.ReactNode, className?: string }) {
    const activeClasses = "_p-1 _rounded-lg _transition-shadow _duration-[0.5s] _text-black _shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] _bg-adminGray";
    const classes = [className, active ? activeClasses : ''].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <span className="_p-1">
                {children}
            </span>
        </div>
    )
}