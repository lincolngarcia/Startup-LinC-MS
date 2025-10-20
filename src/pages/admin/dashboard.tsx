import { useRouter } from 'next/router';

// Import Components
import Grid from '../../app/components/Backend/Helpers/goldengrid';
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';
import BackendMenu from '../../app/components/Backend/Menu';

import NeumorphicFlat from '@/src/app/components/Backend/Neumorphic/flat';
import RootLayout from '../layout';
import BackendHeader from '@/src/app/components/Backend/header';
import BackendFooter from '@/src/app/components/Backend/footer';

export default function Page() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            <BackendHeader title="Dashboard" />
            <main className="h-full bg-adminGray grow">
                <Grid>
                    <BackendMenu className="col-start-1 col-end-2" active="Home" />
                    <NeumorphicFlat className="col-start-8 col-end-13 h-full">
                        <h3>Editor</h3>
                        <div className="h-4/5">
                            <textarea className="h-4/5 w-full" placeholder="write content here"></textarea>
                            <input placeholder="edit"></input><NeumorphicFlat><button className="w-full">upload</button></NeumorphicFlat>
                        </div>
                        <div className="flex justify-between mt-2">
                            <NeumorphicFlat><button>Edit Pages</button></NeumorphicFlat>
                            <NeumorphicFlat><button>Delete Pages</button></NeumorphicFlat>
                            <NeumorphicFlat><button>New Page</button></NeumorphicFlat>
                        </div>
                        <div>
                            <br />
                            <NeumorphicFlat><button className="w-full" onClick={() => router.push("/")}>View Live Site</button></NeumorphicFlat>
                        </div>
                    </NeumorphicFlat>
                </Grid >
            </main>
            <BackendFooter />
        </div>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
