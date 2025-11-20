import BackendModal from "../../components/admin/Helpers/modal"
import dynamicRenderTypes from "../renderers/dynamicrenderTypes";
import Library from "../library/library";
import { useState } from "react";

export default function BackendEditor({ context }: { context: any }) {
    const subChildren = context.pagedata.children[context.activeSection].children || []

    const [componentSelectorModal, setComponentSelectorModal] = useState(false);
    const [componentDeletionModal, setComponentDeletionModal] = useState(false);
    const [updatePage, setUpdatePage] = useState(() => createInputUpdateHandler())

    if (!context.pagedata || context.pagedata.children.length === 0) {
        return <p>Select a page.</p>
    }

    return (
        <>
            <BackendComponentSelectorModal render={componentSelectorModal} renderModal={setComponentSelectorModal} />
            <BackendComponentDeletionModal render={componentDeletionModal} renderModal={setComponentDeletionModal} />
            <div className="scroll grow relative">
                {dynamicRenderTypes(subChildren, [context.activeSection], handleInputChange)}
                <div className="absolute bottom-2 right-2 flex flex-col rounded border border-adminDarkGray bg-adminSuperGray text-adminDarkGray text-center">
                    <button onClick={() => moveComponentUp()} className="px-1.5 py-1 border-b border-adminDarkGray">▲</button>
                    <button onClick={() => setComponentSelectorModal(true)} className="px-1.5 py-1 border-b border-adminDarkGray">+</button>
                    <button onClick={() => setComponentDeletionModal(true)} className="px-1.5 py-1 border-b border-adminDarkGray">–</button>
                    <button onClick={() => moveComponentDown()} className="px-1.5 py-1 border-adminDarkGray">▼</button>
                </div>
            </div>
        </>
    );

    function handleInputChange(event: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const pathStr = target.dataset.path;
        const prop = target.dataset.prop;

        if (!pathStr || !prop) return;

        const value = (target.type === "checkbox") ? String((target as HTMLInputElement).checked) : target.value;

        const newPagedata = { ...context.pagedata };

        const path: number[] = JSON.parse(pathStr);

        let node: any = newPagedata;
        for (const idx of path) {
            if (!node.children || !node.children[idx]) {
                console.warn("Invalid path while updating pagedata", path);
                return;
            }
            node = node.children[idx];
        }

        if (node.props) {
            node.props = node.props || {};
            node.props[prop] = value;
        } else if (node.content || node.content === "") {
            node.content = value
        }

        console.log(newPagedata)

        updatePage(newPagedata);
    }

    function createInputUpdateHandler() {
        let activeRequest: any = false;   // Promise of the active fetch
        let nextData: any = null;        // Holds data for the next queued request
        let nextScheduled = false;  // Whether a next request is scheduled

        async function sendRequest(data: any) {
            try {
                activeRequest = fetch("/api/pages", {
                    method: "post",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                await activeRequest;
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                activeRequest = null;

                // If there’s a next request scheduled, trigger it
                if (nextScheduled) {
                    const dataToSend = nextData;
                    nextData = null;
                    nextScheduled = false;
                    sendRequest(dataToSend);
                }
            }
        }

        return function onInputChange(data: any) {
            context.setPagedata(data)
            // Case 1: No active request → send immediately
            if (!activeRequest) {
                sendRequest(data);
                return;
            }

            // Case 2: Active request but no next scheduled → queue one
            if (!nextScheduled) {
                nextData = data;
                nextScheduled = true;
                return;
            }

            // Case 3: Active request and next scheduled → update the next data
            nextData = data;
        };
    }

    function moveComponentUp() {
        const newPagedata = { ...context.pagedata };
        const idx = context.activeSection;
        if (!newPagedata.children || idx <= 0 || idx >= newPagedata.children.length) return;

        const [item] = newPagedata.children.splice(idx, 1);
        newPagedata.children.splice(idx - 1, 0, item);
        updatePage(newPagedata);
        context.setActiveSection(idx - 1);
    }

    function moveComponentDown() {
        const newPagedata = { ...context.pagedata };
        const idx = context.activeSection;
        if (!newPagedata.children || idx < 0 || idx >= newPagedata.children.length - 1) return;

        const [item] = newPagedata.children.splice(idx, 1);
        newPagedata.children.splice(idx + 1, 0, item);
        updatePage(newPagedata);
        context.setActiveSection(idx + 1);
    }

    function BackendComponentSelectorModal({ render, renderModal }: { render: boolean, renderModal: any }) {

        function recursiveChildCreator(tag: any) {
            return Library[tag][1].children.map((child: any) => {
                return {
                    componentTag: child,
                    children: recursiveChildCreator(child),
                    props: {...Library[tag][1].props || {}}
                }
            });
        }

        function handleClick(tag: any) {
            // Find a way to read the bindings to create a child for pagedata
            const childProperties = {
                componentTag: tag,
                props: Library[tag][1].props,
                children: recursiveChildCreator(tag)
            };

            // Add child to page data
            const newPagedata = { ...context.pagedata };
            const insertIndex = (typeof context.activeSection === "number" && context.activeSection >= 0)
                ? context.activeSection + 1
                : newPagedata.children.length;
            newPagedata.children.splice(insertIndex, 0, childProperties);
            updatePage(newPagedata);

            // Set active section to the inserted child
            context.setActiveSection(insertIndex);
        }

        return (
            <BackendModal render={render} renderModal={renderModal}>
                <h2 className="text-2xl font-semibold mb-4">Select a Component</h2>
                <div className="h-full">
                    {Object.entries(Library).map(([tag, [, type, name]]: any) => {
                        return (
                            <div key={"component-selector-" + tag} className="mb-4 p-2 border border-adminDarkGray rounded hover:bg-adminSuperGray cursor-pointer" onClick={() => {
                                renderModal(false);
                                handleClick(tag);
                            }}>
                                <h3 className="text-xl font-semibold">{name}</h3>
                            </div>
                        )
                    })}
                </div>
            </BackendModal>
        )
    }

    function BackendComponentDeletionModal({ render, renderModal }: { render: boolean, renderModal: any }) {
        function deleteComponent() {
            const newPagedata = { ...context.pagedata };
            newPagedata.children.splice(context.activeSection, 1);
            updatePage(newPagedata);
            context.setActiveSection(context.activeSection - 1);
            renderModal(false);
        }

        return (
            <BackendModal render={render} renderModal={renderModal}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Delete Element</h2>

                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete this element?
                    </p>

                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            onClick={() => renderModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={deleteComponent}>
                            Confirm
                        </button>
                    </div>
                </div>
            </BackendModal>
        )
    }
}

const InputLibrary: any = {
    "short string": <input type="text" />,
}
