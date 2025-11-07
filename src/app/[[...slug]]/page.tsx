"use client";

// src/app/[[...slug]]/page.tsx
import PageDB from "@/src/database/PageDB"
import DynamicRender from "@/src/app/components/Backend/Helpers/dyanmicrender"
import RootLayout from "@/src/app/layout"
import NotFound from "./not-found"
import { useParams } from "next/navigation";

export default function Page() {
    const params: any = useParams()
    const slug = params.slug || []
    const path: string = "/" + slug.join("/")
    const page: any = (PageDB as any)[path]

    if (!page) return NotFound();

  return (
    <div className="min-w-screen">
      <div className="max-w-[1200px] m-auto p-4">
        Hi there.
        {DynamicRender(page.children)}
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  )
}