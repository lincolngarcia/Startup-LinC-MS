import BackendModal from "@/src/app/components/Backend/modal";

export default function BackendDeletePageModal({render, renderModal, context}: {render:any, renderModal: any, context: any}) {

    function deletePage() {
        console.log("deleting page")

        if (context.pagedata.title == "Homepage") return console.log("you can't delete the home page!");
        
        context.setPagedata(context.PageDB["/"])

        delete context.PageDB["/" + context.pagedata.title]

        renderModal(false)
    }
    
    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Create new Page</h2>

                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete this page?
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