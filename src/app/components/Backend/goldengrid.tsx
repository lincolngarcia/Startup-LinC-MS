export default function Grid({ children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={className + " _grid _mx-auto _grid-cols-12 _gap-4 _p-4"}>
            {children}
        </div>
    )
}