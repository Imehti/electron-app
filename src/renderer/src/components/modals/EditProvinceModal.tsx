import * as Yup from 'yup'
import ReusableEditForm from './ReusableEditForm'

interface EditProvinceProps {
  setIsModalOpen: (value: boolean) => void
}

const validationSchema = Yup.object({
  provinceName: Yup.string().required('لطفا نام استان را وارد کنید')
})

const handleSubmit = (values): void => {
  // Handle form submission, e.g., save the province
  console.log(values.provinceName)
}

const EditProvinceModal = ({ setIsModalOpen }: EditProvinceProps): JSX.Element => {
  const fields = [
    { name: 'provinceName', label: 'نام جدید استان', type: 'text' }
    ]

  return (
    <ReusableEditForm
      initialValues={{ provinceName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      setIsModalOpen={setIsModalOpen}
    />
  )
}

export default EditProvinceModal
