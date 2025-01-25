import { Outlet, useLocation } from 'react-router';
import ProvincesTable from './ProvincesTable';
import CitiesTable from './CitiesTable';
import PanelsTable from './PanelsTable';
import { AnimatePresence, motion } from 'framer-motion';
import { contentVariants } from '../framer-motion/animations';

function PanelManagement(): JSX.Element {
  const location = useLocation();
  const isNestedRoute = location.pathname !== '/panel-management';

  return (
    <div className="w-full h-full p-7 border-1 flex flex-col bg-gray-200">
      <AnimatePresence>
        <motion.div
          variants={contentVariants}
          initial="exit"
          animate="enter"
          exit="exit"
          className="flex flex-col h-full gap-2"
        >
          {/* Check if a nested route is active */}
          {!isNestedRoute && (
            <>
              {/* Render all tables by default */}
              <div className="grid grid-cols-2 gap-x-2 h-[40%]">
                <ProvincesTable />
                <CitiesTable />
              </div>
              <div className="flex-1 bg-white rounded-[10px] overflow-auto">
                <PanelsTable />
              </div>
            </>
          )}

          {/* Render Outlet for nested routes */}
          {isNestedRoute && <Outlet />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default PanelManagement;
