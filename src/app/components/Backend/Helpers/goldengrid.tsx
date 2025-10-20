export default function Grid({ children, className=""}: { children: React.ReactNode, className?: string }) {
    const defaultclasses = "grid mx-auto auto-cols-fr gap-4 p-4 grid-cols-12";
    const classes = [children ? defaultclasses : "", className].join(" ").trim();

    return (
        <div className={classes}>
            {children}
        </div>
    )
}