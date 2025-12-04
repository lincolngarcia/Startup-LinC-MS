import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState, useRef } from 'react';

// Import Components
import NeumorphicFlat from "../components/admin/Neumorphic/flat"
import NeumorphicPressed from '../components/admin/Neumorphic/pressed';
import BackendEditor from "../components/admin/editor"

// Import Modals
import BackendNewPageModal from "./_modals/newPageModal"
import BackendDeletePageModal from "./_modals/deletepageModal"
import BackendPageSelectionModal from "./_modals/pageSelectionModal"
import BackendPreview from "../components/admin/Helpers/preview"

export default function Dashboard() {
    const router = useNavigate();
    // Modals
    const [newPageModal, renderNewPageModal] = useState(false);
    const [pageSelectorModal, renderPageSelectorModal] = useState(false);
    const [deletePage, renderDeletePageModal] = useState(false)

    // Page Data
    const [allPages, setAllPages]: any = useState<any>({ "/": { children: [] } })
    const [pagedata, setPagedata]: any = useState()
    const [activeSection, setActiveSection]: any = useState();

    // Set up web socket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host; // includes hostname + port
    const ws = useRef(null) as any

    useEffect(() => {
        fetch("/api/pages?location=_lincms_all")
            .then(data => data.json())
            .then(data => setAllPages(data))

        ws.current = new WebSocket(`${protocol}//${host}/live-page-connection`);
        ws.current.onopen = () => {
            console.log('WebSocket connected');
            ws.current.send(JSON.stringify({ type: "page-change", path: "/" }));
        };

        ws.current.onmessage = (event: any) => {
            console.log(event)
            const response = JSON.parse(event.data);
            switch (response.type) {
                case "page-change":
                    setPagedata(response.value);
                    setActiveSection(0);
                    break;
                case "page-update":
                    setPagedata((prevPagedata: any) => {
                        const newPagedata = { ...prevPagedata };

                        // Update the data in the editor
                        const path: number[] = response.path;

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
                            node.props[response.prop] = response.value;
                        } else if (node.content || node.content === "") {
                            node.content = response.value
                        }else{
                            node[response.prop] = response.value
                        }

                        return newPagedata;
                    });
                    break;
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.current.onerror = (error: any) => {
            console.error('WebSocket error:', error);
        }
    }, [])


    const context = {
        "PageDB": allPages,
        "pagedata": pagedata,
        "setPagedata": setPagedata,
        "activeSection": activeSection,
        "setActiveSection": setActiveSection,
        "webSocket": ws.current,
    }

    return (
        <>
            <BackendNewPageModal render={newPageModal} renderModal={renderNewPageModal} context={context} />
            <BackendDeletePageModal render={deletePage} renderModal={renderDeletePageModal} context={context} />
            <BackendPageSelectionModal render={pageSelectorModal} renderModal={renderPageSelectorModal} context={context} />
            <NeumorphicFlat className="lg:col-start-3 lg:col-end-9">
                {pagedata ? <BackendPreview context={context} /> : <></>}
            </NeumorphicFlat>
            <NeumorphicFlat className="h-full lg:col-start-9 lg:col-end-13 flex flex-col">
                <h3 className="text-xl bold mb-4">{pagedata?.title || "Loading..."}</h3>
                {activeSection >= 0 ? <BackendEditor context={context} /> : <div className='grow'></div>}
                <div className="flex justify-between mt-2">
                    <NeumorphicFlat className="py-2"><button onClick={() => renderPageSelectorModal(true)}>Select Page</button></NeumorphicFlat>
                    <NeumorphicFlat className="py-2"><button onClick={() => renderDeletePageModal(true)}>Delete Page</button></NeumorphicFlat>
                    <NeumorphicFlat className="py-2"><button onClick={() => renderNewPageModal(true)}>New Page</button></NeumorphicFlat>
                </div>
                <div>
                    <br />
                    <NeumorphicFlat className="py-2"><button className="w-full" onClick={() => router("/")}>View Live Site</button></NeumorphicFlat>
                </div>
            </NeumorphicFlat>
        </>
    )
}