'use client'

import { ReactNode } from 'react';

export default function NeumorphicFlat({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={className + " p-4 rounded-lg transition-shadow duration-[0.5s] text-black bg-adminGray neumorphicShadow"}>
                {children}
        </div>
    )
}