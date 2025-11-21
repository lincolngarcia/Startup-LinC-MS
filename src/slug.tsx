import { useEffect, useState } from "react";
import DynamicRender from "./components/renderers/dyanmicrender";
import Library from "./components/library/library";

export default function Slug() {
  const slug = window.location.pathname.split("/");
  const path: string = slug.join("/")
  let [page, setPage]: any = useState("loading")

  useEffect(() => {
    fetch(`/api/pages?location=${path}`)
      .then(data => data.json())
      .then(data => setPage(data))
  }, [])

  console.log(page)
  if (page == "loading") return Loading();
  if (page.error) return NotFound();

  return (
    <div className="">
      <div className="max-w-[1200px] m-auto p-4 flex flex-col items-center">
        {Library[page.menu][0]()}
        {DynamicRender(page.children)}
      </div>
    </div>
  )
}

function NotFound(): any {
  return (<main className='text-center'>This page cannot be found. Sorry.</main>);
}

function Loading(): any {
  return (<main className="text-center">Loading...</main>);
}