import { Outlet } from "react-router"

function PanelManagement () : JSX.Element {
    return (
        <>
        <div className="flex justify-center items-center mt-4">
               <h1>مدیریت پنل</h1>
               <Outlet />
        </div>
     
        </>
    )
}

export default PanelManagement