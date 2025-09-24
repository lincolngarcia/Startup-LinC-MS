import { useRouter } from 'next/router';
export default function Page() {
    const router = useRouter();
    
    return (
        <div >
            <nav >
                <h2>Menu</h2>
                <ul>
                    <li>Analytics</li>
                    <li>Pages</li>
                    <li>Settings</li>
                </ul>
            </nav>
            <main>
                <div >
                    <h1>Welcome to the Dashboard</h1>
                    <p>This is the main content area. You can display reports, data visualizations, or page content here.</p>
                </div>

                <div >
                    <h3>Editor</h3>
                    <div>
                        <input placeholder="edit"></input><button>Upload</button>
                        <textarea placeholder="write content here"></textarea>
                    </div>
                </div>
                <div>
                    <button>Edit Pages</button>
                    <button>Delete Pages</button>
                    <button>New Page</button>
                </div>
                <div>
                    <button onClick={() => router.push("/")}>viewLiveSite</button>
                </div>
                <span>database placeholder</span>
                {/* PLACEHOLDER FOR DATABASE INTEGRATION */}
                <span>websocket placeholder</span>
                {/* PLACEHOLDER FOR WEBSOCKET INTEGRATION */}
            </main>
        </div>
    )
}