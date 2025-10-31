import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Import Components
import Grid from '../../app/components/Backend/Helpers/goldengrid';
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';
import BackendMenu from '../../app/components/Backend/menu';

import NeumorphicFlat from '@/src/app/components/Backend/Neumorphic/flat';
import RootLayout from '../layout';
import BackendHeader from '@/src/app/components/Backend/header';
import BackendFooter from '@/src/app/components/Backend/footer';
import BackendModal from '@/src/app/components/Backend/modal';
import BackendPreview from '@/src/app/components/Backend/preview';
import BackendEditor from '@/src/app/components/Backend/editor';

export default function Page() {
    const router = useRouter();
    const [newPageModal, renderNewPageModal] = useState(false);
    const [pageSelectorModal, renderPageSelectorModal] = useState(false);
    const [deletePageModal, renderDeletePageModal] = useState(false)
    const [pagedata, setPagedata] = useState({})

    // set the data by default
    useEffect(() => {
        setTimeout(() => {
            setPagedata({
                "children": [
                    {
                        "componentTag": "standard_featurestacked",
                        "children": [
                            {
                                "componentTag": "standard_featurestackedcard",
                                "children": [],
                                "props": {
                                    "image": "/content-image.jpeg",
                                    "title": "Welcome to the Homepage",
                                    "action": "Learn more",
                                    "description": "This is a description.It descripts.Que mas quiere que te diga?"
                                }
                            },
                            {
                                "componentTag": "standard_featurestackedcard",
                                "children": [],
                                "props": {
                                    "image": "/content-image.jpeg",
                                    "title": "Welcome to the Homepage",
                                    "action": "Learn more",
                                    "description": "This is a description.It descripts.Que mas quiere que te diga?"
                                }
                            }
                        ],
                        "props": {}
                    }
                ]
            })
        }, 4000)
    }, [])

    return (
        <div className="h-screen flex flex-col">
            {/* New Page Modal */}
            <BackendModal render={newPageModal} renderModal={renderNewPageModal}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Create new Page</h2>

                    <p className="text-gray-700 mb-6">
                        Confirm New Page Selection
                    </p>

                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            onClick={() => renderNewPageModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={() => renderNewPageModal(false)}>
                            Confirm
                        </button>
                    </div>
                </div>
            </BackendModal>
            {/* Page Selector Modal */}
            <BackendModal render={pageSelectorModal} renderModal={renderPageSelectorModal}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Page Selection</h2>
                    <ol>
                        <li>Homepage (/)</li>
                        <li>About (/about)</li>
                    </ol>
                </div>
            </BackendModal>
            <BackendHeader title="Dashboard" />
            <main className="h-full bg-adminGray grow">
                <Grid className="h-full">
                    <BackendMenu className="col-start-1 col-end-2" active="Home" />
                    <BackendPreview className="col-start-3 col-end-9 border" pagedata={pagedata} />
                    <NeumorphicFlat className="h-full lg:col-start-9 lg:col-end-13 flex flex-col">
                        <h3>Editor</h3>
                        <BackendEditor pagedata={pagedata} setPagedata={setPagedata}/>
                        <div className="flex justify-between mt-2">
                            <NeumorphicFlat><button onClick={() => renderPageSelectorModal(true)}>Select Page</button></NeumorphicFlat>
                            <NeumorphicFlat><button onClick={() => renderDeletePageModal(true)}>Delete Pages</button></NeumorphicFlat>
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

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
