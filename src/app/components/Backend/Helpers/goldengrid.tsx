export default function Grid({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const defaultclasses = "grid mx-auto auto-rows-fr auto-cols-fr gap-4 p-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12";
    const childstyling = "[&>*]:min-h-0";
    const classes = [defaultclasses, childstyling, className].join(" ").trim();

    return (
        <div className={classes}>
            {children}
        </div>
    )
}