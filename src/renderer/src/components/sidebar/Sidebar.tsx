import { useLocation } from 'react-router'
import SidebarNavigation from './SidebarNavigation'
import { useSidebarItems } from '@renderer/hooks/useSidebarItems'

function Sidebar(): JSX.Element {
  const sidebarItems = useSidebarItems()
  const location = useLocation()
  console.log(location);

  return (
    <>
      <div className="relative">
        <SidebarNavigation sidebarItems={sidebarItems} />
        
      </div>
    </>
  )
}

export default Sidebar
