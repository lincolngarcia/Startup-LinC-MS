'use client'

import { ReactNode } from 'react';

export default function NeumorphicFlat({ children }: { children: ReactNode }) {

    const _neumorphicShadow = {
        "boxShadow": "5px 5px 10px #bebebe, -5px -5px 10px#ffffff;"
    }
    //     .active {
    //     @apply _shadow - [inset_5px_5px_10px_#bebebe, _inset_ - 5px_ - 5px_10px_#ffffff];
    // }

return (
    <div className="_p-4 _rounded-lg _transition-shadow _duration-[0.5s] _text-black _bg-adminGray _neumorphicShadow" style={_neumorphicShadow}>
        {children}
    </div>
)
}