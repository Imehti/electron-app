
import Panel1 from '@renderer/components/panel/Panel1'
import PanelManagement from '@renderer/components/panel/PanelManagement'
import UpdatePanel from '@renderer/components/panel/UpdatePanel'
import MainLayout from '@renderer/layout/MainLayout'
import { Route, Routes } from 'react-router'

function AppRouter(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route path='panel-management' element={<PanelManagement />} > 
        <Route path='firstPanel' element={<Panel1 />} />
        </Route>
        <Route path='update-panel' element={<UpdatePanel />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter
