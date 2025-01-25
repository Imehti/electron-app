import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { handleDeletePanel } from '@renderer/features/panelSlice'
import { removePanelChild } from '@renderer/features/panelChildSclice'
// import ContextMenu from './ContextMenu'
import CreatePanel from './CreatePanel'

interface PanelsTableProp {
  className?: string
}

function PanelsTable({ className }: PanelsTableProp): JSX.Element {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number }>() // set the position of context menu
  const [selectedPanel, setSelectedPanel] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false) //store the status of modal
  const createdPanels = useSelector((state: ApplicationState) => state.panel.panels) // use panels which are created by user in create panel function

  const dispatch: ApplicationDispatch = useDispatch()

  ///    delete selected panel from panel's table and also remove that panel from sidebar
  const handleDelete = (panelName): void => {
    dispatch(handleDeletePanel({ panelName: panelName }))
    dispatch(removePanelChild(panelName))
  }

  const handleRightClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleClick = (panel): void => {
    setSelectedPanel(panel)
  }

  return (
    <>
      <div
        className={`flex flex-col items-center space-y-8 h-full border border-1 border-gray-300 shadow-md p-4 rounded-[10px] ${className}`}
      >
        <div className="flex w-full justify-between px-4">
          <input
            className={`h-[40px] w-[80%] rounded-md border-1 border-[#3B3B3B] px-5 bg-gray-200`}
            type="text"
            placeholder="جست و جو پنل"
          />
          <button
            className="px-2 rounded-lg bg-[#09A1A4] text-white w-[13%]"
            onClick={() => setIsModalOpen(true)}
          >
            افزودن پنل
          </button>
        </div>

        <div className="w-full overflow-y-auto no-scrollbar" style={{ maxHeight: '300px' }}>
          <table className="table-fixed border-collapse border border-[#3B3B3B] text-center w-full">
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
              {createdPanels.map((panel, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-400 transition-all duration-300 ${selectedPanel === panel ? '' : ''} ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
                  onContextMenu={(e) => handleRightClick(e)}
                  onClick={() => handleClick(panel)}
                >
                  <td className="border border-gray-200 p-2">{index + 1}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 p-2">{panel.panelName}</td>
                  <td className="border border-gray-200 px-1 py-3">
                    <div className="flex justify-evenly">
                      <FaEdit cursor="pointer" color="orange" />
                      <FaTrash
                        onClick={() => handleDelete(panel.panelName)}
                        cursor="pointer"
                        color="red"
                      />
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
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-gray-100 py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[1px]"
      >
        <CreatePanel setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  )
}

export default PanelsTable
