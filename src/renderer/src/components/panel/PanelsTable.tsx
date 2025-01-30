import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import React, { useRef, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { clearMessages, handleDeletePanel, Panel } from '@renderer/features/panelSlice'
import { removePanelChild } from '@renderer/features/panelChildSclice'
// import ContextMenu from './ContextMenu'
import CreatePanel from '../modals/CreatePanel'
import { toast } from 'react-toastify'
import useKeyboardNavigation from '@renderer/hooks/useKeyboardNavigation'
import ConfirmDelete from '../modals/ConfirmDelete'
import EditPanelModal from '../modals/EditPanelModal'
import { Select } from 'antd'

interface PanelsTableProp {
  className?: string
}

function PanelsTable({ className }: PanelsTableProp): JSX.Element {
  // const [contextMenu, setContextMenu] = useState<{ x: number; y: number }>() // set the position of context menu
  const [selectedPanel, setSelectedPanel] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'add' | 'delete' | 'edit' | null
    panelToDelete?: any | null
    panelToEdit?: any | null
  }>({
    isOpen: false,
    type: null
  })

  const searchInputRef = useRef<HTMLSelectElement | null>(null)

  const { panels, deleteSuccessMessage } = useSelector((state: ApplicationState) => state.panel) // use panels which are created by user in create panel function
  const dispatch: ApplicationDispatch = useDispatch()

  const filteredPanels = panels.filter((panel) =>
    panel.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  ///    delete selected panel from panel's table and also remove that panel from sidebar
  // const handleDelete = (panel): void => {
  //   dispatch(handleDeletePanel({ branchName: panel.branchName }))
  //   dispatch(removePanelChild(panel))
  //   if (deleteSuccessMessage) {
  //     toast.success(deleteSuccessMessage, {
  //       position: 'top-right',
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true
  //     })
  //     dispatch(clearMessages()) // Clear messages after showing the toast
  //   }
  // }

  const handleDelete = (panel: any): void => {
    setModalState({
      isOpen: true,
      type: 'delete',
      panelToDelete: panel
    })
  }

  const confirmDelete = (panel: any) => {
    dispatch(handleDeletePanel({ branchName: panel.branchName }))
    dispatch(removePanelChild(panel))
    dispatch(removePanelChild(panel))

    setModalState({
      ...modalState,
      isOpen: false,
      type: null,
      panelToDelete: null
    })

    if (deleteSuccessMessage) {
      toast.success(deleteSuccessMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      dispatch(clearMessages())
    }
  }

  const handleEdit = (panel: any): void => {
    setModalState({
      isOpen: true,
      type: 'edit',
      panelToEdit: panel
    })
  }

  const { handleKeyDown } = useKeyboardNavigation<Panel>({
    items: panels,
    onSelect: (panel) => {
      setSelectedPanel(panel)
    }
  })

  // const handleRightClick = (e: React.MouseEvent): void => {
  //   e.preventDefault()
  //   setContextMenu({
  //     x: e.clientX,
  //     y: e.clientY
  //   })
  // }

  const handleSearchChange = (value: string): void => {
    setSelectedRowIndex(-1)
    setSearchTerm(value)
  }

  const handleRowClick = (panel: any, index: number): void => {
    setSelectedRowIndex(index)
    if (selectedPanel === panel) {
      setSelectedPanel(null)
      setSelectedRowIndex(-1)
    } else {
      setSelectedPanel(panel)
    }
  }

  return (
    <>
      <div
        className={`flex flex-col items-center space-y-8 h-full border border-1 border-gray-300 shadow-md p-4 rounded-[10px] ${className}`}
      >
        <div className="flex w-full justify-between px-4">
          <Select
            ref={searchInputRef}
            value={searchTerm}
            showSearch
            placeholder="جست و جو استان"
            optionFilterProp="children"
            dropdownStyle={{ fontFamily: 'iransans' }}
            onChange={handleSearchChange}
            notFoundContent={<span className="text-black">نتیجه ای یافت نشد</span>}
            className="w-[80%] font-[iranSans]"
          >
            <Option value="">جست و جو پنل</Option>
            {panels.map((panel) => (
              <Option key={panel.branchName} value={panel.branchName}>
                {panel.branchName}
              </Option>
            ))}
          </Select>
          <button
            className="px-2 rounded-lg bg-[#09A1A4] text-white w-[13%]"
            onClick={() => setModalState({ isOpen: true, type: 'add' })}
          >
            افزودن پنل
          </button>
        </div>

        <div className="w-full overflow-y-auto no-scrollbar" style={{ maxHeight: '300px' }}>
          <table
            className="table-fixed border-collapse border border-[#3B3B3B] text-center w-full"
            tabIndex={0}
            onKeyDown={(event) => handleKeyDown(event, selectedRowIndex, setSelectedRowIndex)}
          >
            <thead className="bg-inherit">
              <tr>
                <th className="border p-1 w-[5%]">ردیف</th>
                <th className="border p-2">نام پنل</th>
                <th className="border p-2">Local Ip</th>
                <th className="border p-2">Local Port</th>
                <th className="border p-2">Wan Ip</th>
                <th className="border p-2">Wan Port</th>
                <th className="border p-2">سریال پنل</th>
                <th className="border p-2">مدل پنل</th>
                <th className="border p-2">ورژن</th>
                <th className="border p-2">توضیحات</th>
                <th className="border p-2">تنظیمات</th>
              </tr>
            </thead>

            <tbody>
              {(filteredPanels.length > 0 ? filteredPanels : panels).map((panel, index) => (
                <tr
                  key={panel.branchName}
                  className={`${
                    selectedRowIndex === index
                      ? 'bg-[#9cc2cd]'
                      : index % 2 === 0
                        ? 'bg-gray-200'
                        : 'bg-white'
                  } hover:bg-[#35b0b3] transition-all duration-300`}
                  // onContextMenu={(e) => handleRightClick(e)}
                  onClick={() => handleRowClick(panel, index)}
                >
                  <td className="border border-gray-200 p-2">{index + 1}</td>
                  <td className="border border-gray-200 p-2">{panel.branchName}</td>
                  <td className="border border-gray-200 p-2">{panel.localIp}</td>
                  <td className="border border-gray-200 p-2">{panel.localPort}</td>
                  <td className="border border-gray-200 p-2">{panel.wanIp}</td>
                  <td className="border border-gray-200 p-2">{panel.wanPort}</td>
                  <td className="border border-gray-200 p-2">{panel.serialNumber}</td>
                  <td className="border border-gray-200 p-2">{panel.panelType}</td>
                  <td className="border border-gray-200 p-2">{panel.uploadCode}</td>
                  <td className="border border-gray-200 p-2">{panel.description}</td>
                  <td className="border border-gray-200 px-1 py-3">
                    <div className="flex justify-evenly">
                      <FaEdit cursor="pointer" color="orange" onClick={() => handleEdit(panel)} />
                      <FaTrash onClick={() => handleDelete(panel)} cursor="pointer" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* context menu */}
      {/* <div>
        <ContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} />
      </div> */}

      <Modal
        isOpen={modalState.isOpen && modalState.type === 'add'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <CreatePanel setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })} />
      </Modal>

      {/* Modal for Delete */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'delete'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <ConfirmDelete
          title="آیا مطمئن هستید که می‌خواهید پنل را حذف کنید؟"
          setIsDeleteModalOpen={(isOpen: boolean) => setModalState({ ...modalState, isOpen })}
          onDeleteConfirm={() => confirmDelete(modalState.panelToDelete)}
        />
      </Modal>

      {/* edit modal */}

      <Modal
        isOpen={modalState.isOpen && modalState.type === 'edit'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <EditPanelModal
          setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })}
          panel={modalState.panelToEdit!}
        />
      </Modal>
    </>
  )
}

export default PanelsTable
