import { useState, useEffect } from 'react'
import image from '../../assets/images/pazh.png'
import { FaChevronDown, FaCloudUploadAlt, FaTools, FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { handlePanelChildClick } from '@renderer/features/panelChildSclice'
import { contentVariants } from '../framer-motion/animations'

interface SidebarItem {
  label: string
  path: string
  children?: SidebarItem[]
}

interface SidebarLinksProps {
  sidebarItems: SidebarItem[]
}

function SidebarNavigation({ sidebarItems }: SidebarLinksProps): JSX.Element {
  // State hooks for tracking active section, child, and grandchild in the sidebar
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeChild, setActiveChild] = useState<string | null>(null)
  const [activeGrandChild, setActiveGrandChild] = useState<string | null>(null)

  console.log(activeSection);

  // Router hooks to manage navigation
  const navigate = useNavigate()
  const location = useLocation()

  // Redux state to check if sidebar is open
  const isSidebarOpen = useSelector((state: ApplicationState) => state.sidebar.isSidebarOpen)

  // Redux dispatch hook for dispatching actions
  const dispatch: ApplicationDispatch = useDispatch()

  // Icons for specific parent items
  const parentIcons: { [key: string]: JSX.Element } = {
    'مدیریت پنل': <FaTools size={16} className="ml-2" />,
    'آپدیت پنل': <FaCloudUploadAlt size={16} className="ml-2" />
  }

  // useEffect hook to determine the active section, child, or grandchild based on the current location
  useEffect(() => {
    const currentPath = location.pathname

    const activeItem = sidebarItems.find(
      (item) =>
        matchPath(item.path, currentPath) ||
        (item.children && item.children.some((child) => matchPath(child.path, currentPath)))
    )
    if (activeItem) {
      setActiveSection(activeItem.label)
    } else {
      // Only set activeSection if no other active section has been set.
      if (!activeSection) {
        setActiveSection(null)
      }
    }
  }, [location, sidebarItems]) 

  const handleBackClick = (): void => {
    navigate(-1) // Navigate to the previous page
    setActiveSection(null)
    setActiveChild(null)
    setActiveGrandChild(null)
  }

  const handleParentClick = (sectionLabel: string): void => {
    setActiveSection(sectionLabel)
    // Reset active child and grandchild when selecting a new parent
    setActiveChild(null)
    setActiveGrandChild(null)
  }

  const handleChildClick = (childLabel: string, child: SidebarItem): void => {
    console.log(child)
    setActiveChild(childLabel)
    setActiveGrandChild(null) // Reset grandchild selection when selecting a child

    if (activeSection === 'مدیریت پنل') {
      dispatch(handlePanelChildClick(child))
    }
  }

  const renderChildren = (children: SidebarItem[], isGrandChild: boolean = false): JSX.Element => {
    return (
      <motion.ul
        className={`flex flex-col space-y-2 mt-2 ${isGrandChild ? 'ml-8' : 'ml-4'} text-right no-scrollbar text-lg w-full`}
        initial="exit"
        animate="enter"
        exit="exit"
        variants={contentVariants}
      >
        {children.map((child) => {
          return (
            <motion.li key={child.label} variants={contentVariants}>
              <NavLink
                to={child.path}
                className={`flex flex-row-reverse justify-end items-center cursor-pointer p-2 mr-4 ${activeChild === child.label ? 'bg-[#E1F4F4] text-[#09A1A4] rounded-lg' : ''}`}
                onClick={() => {
                  handleChildClick(child.label, child)
                }}
              >
                <span>{child.label}</span>
              </NavLink>
              {activeChild === child.label && child.children && child.children.length > 0 && (
                <div className="ml-4">{renderChildren(child.children, true)}</div>
              )}
            </motion.li>
          )
        })}
      </motion.ul>
    )
  }

  return (
    <>
      {isSidebarOpen && (
        <motion.div
          className="mt-8"
          initial="exit"
          animate="enter"
          exit="exit"
          variants={contentVariants}
        >
          <div className="flex flex-col items-start justify-center space-y-16">
            {/* Display the sidebar image if no section is active */}
            {!activeSection && <img src={image} alt="Sidebar" className="w-full" />}

            {/* Display the active section or child label */}
            {activeSection && (
              <div className="flex items-center gap-4 w-full px-6">
                <FaArrowRight onClick={() => handleBackClick()} className="cursor-pointer" />
                <h1 className="text-lg">
                  {activeGrandChild ? activeGrandChild : activeChild ? activeChild : activeSection}
                </h1>
              </div>
            )}

            <ul className="flex flex-col w-full mt-8 space-y-10 pt-0 no-scrollbar p-4 text-lg">
              {/* Render parent items when no section is active */}
              {!activeSection &&
                sidebarItems.map((item) => (
                  <div key={item.label} className="relative group w-full">
                    <NavLink
                      to={item.path}
                      className={`flex flex-row-reverse items-center space-x-3 cursor-pointer ${
                        isSidebarOpen && activeSection === item.label
                          ? 'bg-[#E1F4F4] text-[#09A1A4] rounded-lg p-1'
                          : ''
                      }`}
                      onClick={() => handleParentClick(item.label)}
                    >
                      <FaChevronDown
                        size={10}
                        className={`transform transition-transform duration-200 rotate-90 ${
                          isSidebarOpen ? 'block' : 'hidden'
                        }`}
                      />
                      {isSidebarOpen && <span className="flex-1">{item.label}</span>}
                      <span className={`${!isSidebarOpen ? 'hidden' : 'mt-0'}`}>
                        {parentIcons[item.label]}
                      </span>
                    </NavLink>
                  </div>
                ))}

              {/* Render children for the active section */}
              {activeSection &&
                sidebarItems
                  .filter((item) => item.label === activeSection)
                  .map((item) => (
                    <motion.div
                      key={item.label}
                      initial="exit"
                      animate="enter"
                      exit="exit"
                      variants={contentVariants}
                      className={`border-r-[3px] ${item.children ? 'border-[#09A1A4]' : 'border-none'} overflow-hidden`}
                    >
                      <AnimatePresence>
                        {
                          <motion.div
                            key={activeSection}
                            variants={contentVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                          >
                            {/* Render children recursively */}
                            {item.children ? (
                              renderChildren(item.children || [], false)
                            ) : (
                              <span>هیچ آیتمی وجود ندارد</span>
                            )}
                          </motion.div>
                        }
                      </AnimatePresence>
                    </motion.div>
                  ))}
            </ul>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default SidebarNavigation
