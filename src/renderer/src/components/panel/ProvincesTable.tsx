import { useState, useRef } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { Select } from 'antd'
import AddProvince from '../modals/AddProvince'
import {
  clearMessages,
  handleDeleteProvince,
  Province,
  selectProvince
} from '@renderer/features/provincesSlice'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { toast } from 'react-toastify'
import ConfirmDelete from '../modals/ConfirmDelete'
import useKeyboardNavigation from '@renderer/hooks/useKeyboardNavigation'
import EditProvinceModal from '../modals/EditProvinceModal'

const { Option } = Select

interface ProvincesTableProps {
  className?: string
}

function ProvincesTable({ className }: ProvincesTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvince, setSelectedProvince] = useState<any>(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1)

  // Consolidating modal state into one
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'add' | 'delete' | 'edit' | null
    provinceToDelete?: any | null
    provinceToEdit?: any | null
  }>({
    isOpen: false,
    type: null,
    provinceToDelete: null,
    provinceToEdit: null
  })

  const dispatch: ApplicationDispatch = useDispatch()
  const { provinces: addedProvinces, deleteSuccessMessage } = useSelector(
    (state: ApplicationState) => state.provinces
  )

  const searchInputRef = useRef<HTMLSelectElement | null>(null)

  const filteredProvince = addedProvinces.filter((province) =>
    province.province.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const { handleKeyDown } = useKeyboardNavigation<Province>({
    items: addedProvinces,
    onSelect: (province) => {
      setSelectedProvince(province)
      dispatch(selectProvince(province))
    }
  })

  const handleSearchChange = (value: string): void => {
    setSelectedRowIndex(-1)
    setSearchTerm(value)
    const selectedProvince = addedProvinces.find((province) => province.province === value)

    if (selectedProvince) {
      dispatch(selectProvince(selectedProvince))
    } else {
      dispatch(selectProvince(null))
    }
  }

  const handleDelete = (province: any): void => {
    setModalState({
      isOpen: true,
      type: 'delete',
      provinceToDelete: province
    })
  }
  const handleEdit = (province: any): void => {
    setModalState({
      isOpen: true,
      type: 'edit',
      provinceToEdit: province
    })
  }

  const confirmDelete = (province: any) => {
    dispatch(handleDeleteProvince({ province: province.province, cities: [] }))

    setModalState({
      ...modalState,
      isOpen: false,
      type: null,
      provinceToDelete: null
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

  const handleRowClick = (province: any, index: number): void => {
    setSelectedRowIndex(index)
    if (selectedProvince?.province === province.province) {
      setSelectedProvince(null)
      dispatch(selectProvince(null))
      setSelectedRowIndex(-1)
    } else {
      setSelectedProvince(province)
      dispatch(selectProvince(province))
    }
  }

  return (
    <>
      <div
        className={`flex flex-col items-center space-y-6 w-full h-full border border-1 border-gray-300 shadow-md p-6 rounded-[10px] bg-white ${className}`}
        tabIndex={0}
      >
        <div className="flex justify-between w-full text-sm relative">
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
            <Option value="">جست و جو استان</Option>
            {addedProvinces.map((province) => (
              <Option key={province.province} value={province.province}>
                {province.province}
              </Option>
            ))}
          </Select>

          <button
            className="px-4 rounded-lg bg-[#09A1A4] text-white"
            onClick={() => setModalState({ isOpen: true, type: 'add', provinceToDelete: null })}
          >
            افزودن استان
          </button>
        </div>

        <div className="w-full overflow-y-auto no-scrollbar" style={{ maxHeight: '140px' }}>
          <table
            className="border-collapse border w-full text-center"
            tabIndex={0}
            onKeyDown={(event) => handleKeyDown(event, selectedRowIndex, setSelectedRowIndex)}
          >
            <thead className="bg-inherit">
              <tr>
                <th className="border border-gray-300 w-[10%]">ردیف</th>
                <th className="border border-gray-300">استان</th>
                <th className="border border-gray-300 p-1 w-[20%]">تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {(filteredProvince.length > 0 ? filteredProvince : addedProvinces).map(
                (province, index) => (
                  <tr
                    className={`${
                      selectedRowIndex === index
                        ? 'bg-[#9cc2cd]'
                        : index % 2 === 0
                          ? 'bg-gray-200'
                          : 'bg-white'
                    } hover:bg-[#35b0b3] transition-all duration-300`}
                    key={province.province}
                  >
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td
                      className="border border-gray-300 p-2 cursor-pointer"
                      onClick={() => handleRowClick(province, index)}
                    >
                      {province.province}
                    </td>
                    <td className="px-1 py-3 flex justify-evenly">
                      <FaEdit
                        cursor={'pointer'}
                        color="orange"
                        onClick={() => handleEdit(province)}
                      />
                      <FaTrash
                        cursor={'pointer'}
                        color="red"
                        onClick={() => handleDelete(province)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'add'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <AddProvince setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })} />
      </Modal>

      {/* Modal for Delete */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'delete'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <ConfirmDelete
          title="آیا مطمئن هستید که می‌خواهید استان را حذف کنید؟"
          setIsDeleteModalOpen={(isOpen: boolean) => setModalState({ ...modalState, isOpen })}
          onDeleteConfirm={() => confirmDelete(modalState.provinceToDelete)}
        />
      </Modal>

      <Modal
        isOpen={modalState.isOpen && modalState.type === 'edit'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <EditProvinceModal setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })} />
      </Modal>
    </>
  )
}

export default ProvincesTable
