import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

// Import Components
import NeumorphicFlat from '../components/library/Backend/Neumorphic/flat';
import NeumorphicPressed from '../components/library/Backend/Neumorphic/pressed';
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

    useEffect(() => {
        fetch("/api/pages?location=_lincms_all")
            .then(data => data.json())
            .then(data => setAllPages(data))

        fetch("/api/pages?location=/")
            .then(data => data.json())
            .then(data => setPagedata(data))
            .then(() => setActiveSection("component-0"))
    }, [])


    const context = {
        "PageDB": allPages,
        "pagedata": pagedata,
        "setPagedata": setPagedata,
        "activeSection": activeSection,
        "setActiveSection": setActiveSection
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
                {activeSection ? <BackendEditor context={context} /> : <></>}
                <div className="flex justify-between mt-2">
                    <NeumorphicFlat><button onClick={() => renderPageSelectorModal(true)}>Select Page</button></NeumorphicFlat>
                    <NeumorphicFlat><button onClick={() => renderDeletePageModal(true)}>Delete Page</button></NeumorphicFlat>
                    <NeumorphicFlat ><button onClick={() => renderNewPageModal(true)}>New Page</button></NeumorphicFlat>
                </div>
                <div>
                    <br />
                    <NeumorphicFlat><button className="w-full" onClick={() => router("/")}>View Live Site</button></NeumorphicFlat>
                </div>
            </NeumorphicFlat>
        </>
    )
}

/*
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '@/src/pages/layout';

// Import Components
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';
import BackendMenu from '../../app/components/Backend/menu';

import NeumorphicFlat from '@/src/app/components/Backend/Neumorphic/flat';
import BackendHeader from '@/src/app/components/Backend/header';
import BackendFooter from '@/src/app/components/Backend/footer';
import BackendModal from '@/src/app/components/Backend/modal';
import BackendPreview from '@/src/app/components/Backend/preview';
import BackendEditor from '@/src/app/components/Backend/editor';
import PageDB from "@/src/database/PageDB"

// Import Modals
import BackendNewPageModal from './_modals/newPageModal';
import BackendDeletePageModal from './_modals/deletepageModal';
import BackendPageSelectorModal from './_modals/pageSelectorModal';

export function Page() {
    const router = useRouter();
    const [newPageModal, renderNewPageModal] = useState(false);
    const [pageSelectorModal, renderPageSelectorModal] = useState(false);
    const [deletePage, renderDeletePageModal] = useState(false)
    const [pagedata, setPagedata] = useState(PageDB["/"])

    const context = {
        "PageDB": PageDB,
        "pagedata": pagedata,
        "setPagedata": setPagedata
    }

    return (
        <div className="h-screen flex flex-col">
            <BackendNewPageModal render={newPageModal} renderModal={renderNewPageModal} context={context} />
            <BackendDeletePageModal render={deletePage} renderModal={renderDeletePageModal} context={context} />
            <BackendPageSelectorModal render={pageSelectorModal} renderModal={renderPageSelectorModal} context={context} />

            <BackendHeader title="Dashboard" />
            <main className="h-full bg-adminGray grow">
                <Grid className="h-full">
                    <BackendMenu className="col-start-1 col-end-3" active="Home" />
                    <BackendPreview className="col-start-3 col-end-9 border" pagedata={pagedata} />
                    <NeumorphicFlat className="h-full lg:col-start-9 lg:col-end-13 flex flex-col">
                        <h3 className="text-xl bold mb-4">{pagedata.title}</h3>
                        <BackendEditor context={context} />
                        <div className="flex justify-between mt-2">
                            <NeumorphicFlat><button onClick={() => renderPageSelectorModal(true)}>Select Page</button></NeumorphicFlat>
                            <NeumorphicFlat><button onClick={() => renderDeletePageModal(true)}>Delete Page</button></NeumorphicFlat>
                            <NeumorphicFlat ><button onClick={() => renderNewPageModal(true)}>New Page</button></NeumorphicFlat>
                        </div>
                        <div>
                            <br />
                            <NeumorphicFlat><button className="w-full" onClick={() => router.push("/")}>View Live Site</button></NeumorphicFlat>
                        </div>
                    </NeumorphicFlat>
                </Grid>
            </main>
            <BackendFooter />
        </div >
    )
}
    */