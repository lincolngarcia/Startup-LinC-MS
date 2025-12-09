import BackendModal from "../../components/admin/Helpers/modal"

export default function BackendPageSelectionModal({ render, renderModal, context }: { render: any, renderModal: any, context: any }) {
    function handleSelection(key: any, page:any) {
        console.log("selecting page", page)
        context.webSocket.send(JSON.stringify({ type: "page-change", path: page.path }));
        renderModal(false)
    }

    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Page Selection</h2>
                <ol>
                    {context && Object.entries(context.PageDB).map(([key, page]: any) => {
                        return <li key={"selector-modal-" + key} className="w-full flex flex-row justify-between">{page.title}<button onClick={() => handleSelection(key, page)}>Edit</button></li>
                    })}
                </ol>
            </div>
        </BackendModal>
    )
}