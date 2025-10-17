export default function Grid({ children, className=""}: { children: React.ReactNode, className?: string }) {
    const default_classes = "_grid _mx-auto _auto-cols-fr _gap-4 _p-4 _grid-cols-12";
    const classes = [children ? default_classes : "", className].join(" ").trim();

    return (
        <div className={classes}>
            {children}
        </div>
    )
}