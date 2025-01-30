import { handleAddCity } from '@renderer/features/citiesSlice'
import { addCity, clearMessages, selectProvince } from '@renderer/features/provincesSlice'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface AddCityProps {
  setIsModalOpen: (value: boolean) => void
}

// validation schema for creating panel
const validationSchema = Yup.object({
  city: Yup.string().required('لطفا نام شهر را وارد کنید')
})

// create panel function
function AddCity({ setIsModalOpen }: AddCityProps): JSX.Element {
  const dispatch: ApplicationDispatch = useDispatch()
  const {
    selectedProvince: province,
    successMessage,
    errorMessage
  } = useSelector((state: ApplicationState) => state.provinces)

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      dispatch(clearMessages()) // Clear messages after showing the toast
      setIsModalOpen(false) // Close the modal on success
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      dispatch(clearMessages()) // Clear messages after showing the toast
    }
  }, [successMessage, errorMessage, dispatch, setIsModalOpen])

  // handle submiting the form of creating panel
  const handleSubmit: FormikConfig<FormikValues>['onSubmit'] = (values) => {
    if (province !== null) {
      dispatch(addCity({ province: province.province, city: { city: values.city } }))
      dispatch(selectProvince(province))
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-4 h-full text-black w-full bg-white">
        <h1>افزودن شهر</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ city: '' }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col items-start space-y-2">
                <label htmlFor="city">نام شهر</label>
                <Field
                  name="city"
                  type="text"
                  placeholder="نام شهر"
                  className={`px-2 rounded-md  w-[320px] h-[48px] border border-1 border-[#3B3B3B]`}
                />
                {errors.city && touched.city && (
                  <div className="text-red-500 mt-1 text-sm">{errors.city}</div>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="px-3 rounded-md bg-[#09A1A4] text-white w-1/3 h-[48px]"
                >
                  ایجاد
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="px-3 border border-1 bg-red-500 rounded-md w-1/3 h-[48px] text-white"
                >
                  انصراف
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default AddCity
