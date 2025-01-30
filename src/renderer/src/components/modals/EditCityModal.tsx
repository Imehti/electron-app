import * as Yup from 'yup'
import ReusableEditForm from './ReusableEditForm'

interface EditCityProps {
  setIsModalOpen: (value: boolean) => void
}

const validationSchema = Yup.object({
  cityName: Yup.string().required('لطفا نام شهر را وارد کنید')
})

const handleSubmit = (values): void => {
  console.log(values)
}

const EditCityModal = ({ setIsModalOpen }: EditCityProps): JSX.Element => {
  const fields = [{ name: 'cityName', label: 'نام جدید شهر', type: 'text' }]

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

export default EditCityModal
