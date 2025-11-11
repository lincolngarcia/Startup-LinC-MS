import { useEffect, useState } from "react";
import DynamicRender from "./components/renderers/dyanmicrender";

export default function Slug() {
  const slug = window.location.pathname.split("/");
  const path: string = slug.join("/")
  let [page, setPage]: any = useState()

  useEffect(() => {
    fetch(`/api/pages?location=${path}`)
      .then(data => data.json())
      .then(data => setPage(data))
  }, [])

  console.log(!page)
  if (!page) return NotFound();

  return (
    <div className="min-w-screen">
      <div className="max-w-[1200px] m-auto p-4">
        {DynamicRender(page.children)}
      </div>
    </div>
  )
}

function NotFound(): any {
  return (<main className='container-fluid bg-secondary text-center'>This page cannot be found. Sorry.</main>);
}