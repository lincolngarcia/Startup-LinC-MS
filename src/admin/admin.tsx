import { Routes, Route, useLocation } from "react-router-dom"
import Dashboard from "./dashboard"
import Analytics from "./analytics"
import Preview from "./preview"

import BackendHeader from "../components/admin/header"
import BackendFooter from "../components/admin/footer"
import BackendMenu from "../components/admin/menu"
import Grid from "../components/admin/Helpers/goldengrid"

export default function Admin() {
    const location = useLocation()

    const locationSelector: any = {
        "/admin/dashboard": "Dashboard",
        "/admin/analytics": "Analytics"
    }

    if (location.pathname === "/admin/preview") return <Preview />

    return (
        <div className="h-screen flex flex-col">
            <BackendHeader title="Welcome to LinCMS" />
            <main className="h-full bg-adminGray grow">
                <Grid className="h-full">
                    <BackendMenu className="col-start-1 col-end-3" active={locationSelector[location.pathname]} />
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="analytics" element={<Analytics />} />
                    </Routes>
                </Grid>
            </main>
            <BackendFooter />
        </div>
    )
} 