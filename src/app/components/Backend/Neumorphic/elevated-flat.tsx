'use client'

import { ReactNode } from 'react';

export default function elevatedFlat({ children }: { children: ReactNode }) {

    return (
        <div className="">
            { children }
        </div>

    )
}