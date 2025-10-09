export default function NeumorphicPressed({ children }: { children: React.ReactNode }) {
    return (
        <div className="_p-1 _rounded-lg _transition-shadow _duration-[0.5s] _text-black _shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] _bg-adminGray">
            {children}
            </div>
    )
}