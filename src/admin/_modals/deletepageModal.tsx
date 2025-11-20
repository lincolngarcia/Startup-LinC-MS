import BackendModal from "../../components/admin/Helpers/modal"

export default function BackendDeletePageModal({ render, renderModal, context }: { render: any, renderModal: any, context: any }) {

    function deletePage() {
        console.log("deleting page")
        if (context.pagedata.path == "/") return renderModal(false)

        fetch("/api/pages?location=" + encodeURIComponent("/"))
            .then(data => data.json())
            .then(data => context.setPagedata(data))
            .then(() => context.setActiveSection(-1));

        fetch("/api/pages?location=" + context.pagedata.path, {method: "delete"})

        delete context.PageDB["/" + context.pagedata.path]
        renderModal(false)
    }

    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Delete Page</h2>

                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete this page ({context.pagedata ? (context.pagedata.title || "") : ""})?
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => renderModal(false)}>
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={deletePage}>
                        Confirm
                    </button>
                </div>
            </div>
        </BackendModal>
    )
}