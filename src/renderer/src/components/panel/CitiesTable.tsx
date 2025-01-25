import { FaEdit, FaTrash } from 'react-icons/fa'

interface CitiesTableProps {
  className?: string
}

function CitiesTable({ className }: CitiesTableProps): JSX.Element {
  return (
    <>
      <div
        className={`flex flex-col items-center space-y-6 w-full h-full border border-1 border-gray-300 shadow-md p-6 rounded-[10px] bg-white ${className}`}
      >
        <div className="flex justify-between text-sm w-full">
          <input
            className={`h-[40px] w-[60%] rounded-md border-1 border-[#3B3B3B] px-5 bg-gray-200`}
            type="text"
            placeholder="جست و جو شهر"
          />
          <button className="px-5 rounded-lg bg-[#09A1A4] text-white">افزودن شهر</button>
        </div>
        <table className="border-collapse border  w-full text-center">
          <thead className="bg-inherit">
            <tr>
              <th className="border border-gray-300 w-[10%]">ردیف</th>
              <th className="border border-gray-300 p-1">شهر</th>
              <th className="border border-gray-300 w-[20%]">تنظیمات</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
            <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">تهران</td>
              <td className="px-1 py-3 flex justify-evenly">
                <FaEdit cursor={'pointer'} color="orange" />
                <FaTrash cursor={'pointer'} color="red" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CitiesTable
