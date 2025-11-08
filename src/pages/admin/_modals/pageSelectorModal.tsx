import BackendModal from "@/src/app/components/Backend/modal"

export default function BackendPageSelectorModal({render, renderModal, context}: {render:any, renderModal: any, context: any}) {
    return (
        <BackendModal render={render} renderModal={renderModal}>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Page Selection</h2>
                <ol>
                    <li>Homepage (/)</li>
                    <li>About (/about)</li>
                </ol>
            </div>
        </BackendModal>
    )
}