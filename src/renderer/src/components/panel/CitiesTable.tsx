import React, { useEffect, useState, useRef } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'
import AddCity from '../modals/AddCity'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { toast } from 'react-toastify'
import { clearMessages, deleteCity, selectProvince } from '@renderer/features/provincesSlice'
import { Select } from 'antd'
import ConfirmDelete from '../modals/ConfirmDelete'
import { City } from '@renderer/features/citiesSlice'
import useKeyboardNavigation from '@renderer/hooks/useKeyboardNavigation'
import EditCityModal from '../modals/EditCityModal'

const { Option } = Select

interface CitiesTableProps {
  className?: string
}

function CitiesTable({ className }: CitiesTableProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<any>()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'add' | 'delete' | 'edit' | null
    cityToDelete?: any | null
    cityToEdit?: any | null
  }>({
    isOpen: false,
    type: null,
    cityToDelete: null,
    cityToEdit: null
  })

  const dispatch: ApplicationDispatch = useDispatch()
  const tableRef = useRef<HTMLTableElement>(null)

  const { selectedProvince: province, deleteSuccessMessage } = useSelector(
    (state: ApplicationState) => state.provinces
  )

  useEffect(() => {
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
  }, [deleteSuccessMessage, dispatch])

  const handleDelete = (city: any): void => {
    setModalState({
      isOpen: true,
      type: 'delete',
      cityToDelete: city
    })
  }

  const handleEdit = (city: any): void => {
    setModalState({
      isOpen: true,
      type: 'edit',
      cityToEdit: city
    })
  }

  const handleAddCity = (): void => {
    if (province) {
      setModalState({
        isOpen: true,
        type: 'add'
      })
    } else {
      toast.error('لطفا ابتدا استان را انتخاب کنید', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value)
  }

  const filteredCities =
    province?.cities.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase())) ??
    []

  const { handleKeyDown } = useKeyboardNavigation<City>({
    items: filteredCities,
    onSelect: (city) => {
      setSelectedCity(city)
    }
  })

  const handleRowClick = (city: any, index: number): void => {
    setSelectedRowIndex(index)
    if (selectedCity === city) {
      setSelectedCity(null)
      setSelectedRowIndex(-1)
    } else {
      setSelectedCity(city)
    }
  }

  const confirmDelete = (city: any) => {
    if (province) {
      // Dispatch deleteCity action
      dispatch(deleteCity({ province: province.province, city: city.city }))

      // Filter the updated cities list
      const updatedCities = province.cities.filter((c) => c.city !== city.city)

      // Update the selected province with the updated cities
      dispatch(selectProvince({ ...province, cities: updatedCities }))

      // Close the modal after deletion
      setModalState({
        ...modalState,
        isOpen: false,
        type: null,
        cityToDelete: null
      })
    }
  }

  return (
    <>
      <div
        className={`flex flex-col items-center space-y-6 w-full h-full border border-1 border-gray-300 shadow-md p-6 rounded-[10px] bg-white ${className}`}
      >
        <div className="flex justify-between text-sm w-full">
          <Select
            showSearch
            value={searchTerm}
            placeholder="جست و جو شهر"
            optionFilterProp="children"
            dropdownStyle={{ fontFamily: 'iransans' }}
            onChange={handleSearchChange}
            notFoundContent={<span className="text-black">نتیجه ای یافت نشد</span>}
            filterOption={(input, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
            className="w-[80%] font-[iranSans]"
          >
            <Option key="default" value="">
              جست و جو شهر
            </Option>

            {province?.cities.map((city) => (
              <Option key={city.city} value={city.city}>
                {city.city}
              </Option>
            ))}
          </Select>

          <button className="px-5 rounded-lg bg-[#09A1A4] text-white" onClick={handleAddCity}>
            افزودن شهر
          </button>
        </div>

        <div className="w-full overflow-y-auto no-scrollbar" style={{ maxHeight: '140px' }}>
          <table
            className="border-collapse border w-full text-center"
            tabIndex={0}
            ref={tableRef}
            onKeyDown={(e) => handleKeyDown(e, selectedRowIndex, setSelectedRowIndex)}
          >
            <thead className="bg-inherit">
              <tr>
                <th className="border border-gray-300 w-[10%]">ردیف</th>
                <th className="border border-gray-300 p-1">شهر</th>
                <th className="border border-gray-300 w-[20%]">تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city, index) => (
                <tr
                  className={`${
                    selectedRowIndex === index
                      ? 'bg-[#9cc2cd]'
                      : index % 2 === 0
                        ? 'bg-gray-200'
                        : 'bg-white'
                  } hover:bg-[#35b0b3] transition-all duration-300`}
                  key={city.city}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleRowClick(city, index)}
                  >
                    {city.city}
                  </td>
                  <td className="px-1 py-3 flex justify-evenly">
                    <FaEdit cursor={'pointer'} color="orange" onClick={() => handleEdit(city)} />
                    <FaTrash cursor={'pointer'} color="red" onClick={() => handleDelete(city)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add City */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'add'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <AddCity setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })} />
      </Modal>

      {/* Modal for Confirm Deletion */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'delete'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <ConfirmDelete
          title="آیا مطمئن هستید که می‌خواهید شهر را حذف کنید؟"
          onDeleteConfirm={() => confirmDelete(modalState.cityToDelete)}
          setIsDeleteModalOpen={() => setModalState({ ...modalState, isOpen: false })}
        />
      </Modal>
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'edit'}
        onRequestClose={() => setModalState({ isOpen: false, type: null })}
        className="bg-white py-6 px-4 rounded-lg w-[500px] shadow-2xl bg-opacity-90"
        overlayClassName="fixed inset-0 flex justify-center items-center backdrop-blur-[2px]"
      >
        <EditCityModal setIsModalOpen={() => setModalState({ ...modalState, isOpen: false })} />
      </Modal>
    </>
  )
}

export default CitiesTable
