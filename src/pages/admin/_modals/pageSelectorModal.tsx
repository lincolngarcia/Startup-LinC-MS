import BackendModal from "@/src/app/components/Backend/modal"

export default function BackendPageSelectorModal({render, renderModal, context}: {render:any, renderModal: any, context: any}) {
    function handleSelection(key: any) {
        context.setPagedata(context.PageDB[key])
        renderModal(false)
    }
    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Page Selection</h2>
                <ol>
                    {Object.entries(context.PageDB).map(([key, page]: any) => {
                        return <li className="w-full flex flex-row justify-between">{page.title}<button onClick={() => handleSelection(key)}>useme!</button></li>
                    })}
                </ol>
            </div>
        </BackendModal>
    )
}