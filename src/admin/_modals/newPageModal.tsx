import BackendModal from "../../components/admin/Helpers/modal"
import { useState } from "react";

export default function BackendNewPageModal({render, renderModal, context}: {render:any, renderModal: any, context: any}) {

    const [pageName, setPageName] = useState("")

    function handleCreateNewPage() {
        console.log("creating new page")
        const PageDB = context.PageDB

        if (PageDB[encodeURIComponent("/" + pageName)]){
            alert("page already exists")
            return false;
        }
        
        const newPage = {
            title: pageName,
            path: encodeURIComponent("/" + pageName),
            menu: 'standard_menu',
            children: [
                {
                    componentTag: "standard_introstacked",
                    children:[],
                    props: {
                        title: "",
                        hook: "",
                        paragraph: ""
                    }
                }
            ]
        }

        fetch("/api/pages", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPage)
        })
        .then(() => context.setPagedata(newPage))
        .then(() => context.setActiveSection(0))
        .then(() => context.PageDB[encodeURIComponent("/" + pageName)] = newPage)
        renderModal(false)
    }

    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Create new Page</h2>

                <p className="text-gray-700 mb-6">
                    <input className="border w-8/10" placeholder="Page Name" value={pageName} onChange={(event) => setPageName(event.target.value)} />
                </p>

                {/* put the path selector in */}

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => renderModal(false)}>
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleCreateNewPage}>
                        Confirm
                    </button>
                </div>
            </div>
        </BackendModal>
    )
}