export default function BackendModal({children, render, renderModal}: {children: React.ReactNode, render:boolean, renderModal: any}) {
    if (render) {
        return (
            <div className="fixed inset-0 bg-adminGray/50 flex items-center justify-center z-50">
                <div className="bg-adminGray p-6 rounded-lg shadow-xl max-w-sm w-full relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        onClick={() => renderModal(false)} >
                        &times;
                    </button>

                    {children}

                </div>
            </div>
        );
    } else {
        return (
            <>
            </>
        )
    };
}