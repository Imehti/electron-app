import Header from '@renderer/components/header/Header'
import Sidebar from '@renderer/components/sidebar/Sidebar'
import { toggleSidebar } from '@renderer/features/sidebarSlice'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { FaChevronDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'

function MainLayout(): JSX.Element {
  const isSidebarOpen = useSelector((state: ApplicationState) => state.sidebar.isSidebarOpen)
  const dispatch: ApplicationDispatch = useDispatch()

  return (
    <>
      <div className="w-full h-screen bg-gray-300 flex flex-col gap-1">
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside
            className={`h-full relative bg-white transition-all duration-500 ease-linear ${isSidebarOpen ? 'w-[25%]' : 'w-[1%]'}`}
          >
            <Sidebar />
            <div className={`${isSidebarOpen ? 'absolute bottom-0 px-[16%]' : 'hidden'}`}>
              <span>به سفارش بانک کشاورزی ایران</span>
            </div>
            <div
              className={`hidden md:flex items-center justify-center absolute top-[15%]  md:-left-9 rotate-90 w-[40px] h-[40px] rounded-bl-[10px] rounded-br-[10px] text-black bg-white`}
              onClick={() => dispatch(toggleSidebar())}
            >
              <FaChevronDown className={`${isSidebarOpen ? 'rotate-180' : ''}`} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full flex flex-col px-1">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout
