import Header from '@renderer/components/header/Header';
import Sidebar from '@renderer/components/sidebar/Sidebar';
import { toggleSidebar } from '@renderer/features/sidebarSlice'; // Your Redux action
import { ApplicationDispatch, ApplicationState } from '@renderer/store';
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { Drawer } from '@mui/material';

function MainLayout(): JSX.Element {
  const isSidebarOpen = useSelector((state: ApplicationState) => state.sidebar.isSidebarOpen);
  const dispatch: ApplicationDispatch = useDispatch();

  const toggleDrawer = (): void => {
    // Dispatch the toggleSidebar action to change the state in Redux
    dispatch(toggleSidebar());
  };

  return (
    <div className="w-full h-screen flex flex-col gap-1 bg-gray-200 relative">
      <div className="flex flex-1">
        {/* Toggle Button (Icon) */}
        <div
          className={`absolute rotate-90 top-[20%] ${
            isSidebarOpen ? 'right-[20%]' : 'right-0'
          } w-[30px] h-[30px] rounded-bl-[10px] rounded-br-[10px] text-black bg-white cursor-pointer z-[1300] flex items-center justify-center transition-all duration-700 shadow-md`}
          onClick={toggleDrawer}
        >
          <FaChevronDown
            className={`${isSidebarOpen ? 'rotate-180' : ''} transition-transform duration-300`}
          />
        </div>

        {/* Drawer (Sidebar) on the Right */}
        <Drawer
          anchor="right"
          open={isSidebarOpen}
          onClose={toggleDrawer}
          variant="temporary"
          transitionDuration={{ exit: 700, enter: 700 }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '20%',
              backgroundColor: 'white',
              transition: 'width 0.5s ease',
              zIndex: 1200, // Ensure Drawer doesn't overlap too much
            },
          }}
        >
          <aside>
            <Sidebar />
          </aside>
          <div className={`${isSidebarOpen ? 'absolute bottom-2 px-[16%]' : 'hidden'}`}>
            <span>به سفارش بانک کشاورزی ایران</span>
          </div>
        </Drawer>

        {/* Main Content */}
        <div className="w-full h-full flex flex-col px-1">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
