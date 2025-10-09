export default function Grid({ children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={className + " _grid _max-width-[1200px] _mx-auto _grid-cols-2 md:_grid-cols-8 lg:_grid-cols-12 _gap-4 _p-4"}>
            {children}
        </div>
    )
}