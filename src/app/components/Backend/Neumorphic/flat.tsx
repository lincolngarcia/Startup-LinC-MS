'use client'

import { ReactNode } from 'react';

export default function NeumorphicFlat({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={className + " _p-4 _rounded-lg _transition-shadow _duration-[0.5s] _text-black _bg-adminGray neumorphicShadow"}>
                {children}
        </div>
    )
}