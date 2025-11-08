import BackendModal from "@/src/app/components/Backend/modal"
import { useEffect } from "react"

export default function BackendPageSelectorModal({render, renderModal, context}: {render:any, renderModal: any, context: any}) {
    function handleSelection(key: any) {
        context.setPagedata(context.PageDB[key])
        renderModal(false)
    }

    useEffect(() => {
        console.log(context.PageDB)
        Object.entries(context.PageDB).map((entry: any) => console.log("index", entry[0], entry[1]))
        console.log("end object entires")
    }, [])

        return (
            <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Page Selection</h2>
                <ol>
                    {context && Object.entries(context.PageDB).map(([key, page]: any) => {
                        return <li key={"selector-modal-" + key} className="w-full flex flex-row justify-between">{page.title}<button onClick={() => handleSelection(key)}>useme!</button></li>
                        })}
                </ol>
            </div>
        </BackendModal>
    )
}