import SidebarNavigation from './SidebarNavigation'
import { useSidebarItems } from '@renderer/hooks/useSidebarItems'

function Sidebar(): JSX.Element {
  const sidebarItems = useSidebarItems()

  return (
    <>
      <div className="relative">
        <SidebarNavigation sidebarItems={sidebarItems} />
        
      </div>
    </>
  )
}

export default Sidebar
