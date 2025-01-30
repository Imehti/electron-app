import { useEffect } from 'react'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addProvince, clearMessages } from '@renderer/features/provincesSlice'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'

interface AddProvinceProps {
  setIsModalOpen: (value: boolean) => void
}

// Validation schema for adding a province
const validationSchema = Yup.object({
  province: Yup.string().required('لطفا نام استان را وارد کنید')
})

function AddProvince({ setIsModalOpen }: AddProvinceProps): JSX.Element {
  const dispatch: ApplicationDispatch = useDispatch()
  const { errorMessage, successMessage } = useSelector((state: ApplicationState) => state.provinces)

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

  const handleSubmit: FormikConfig<FormikValues>['onSubmit'] = (values) => {
    dispatch(addProvince(values)) // Dispatch action to add province
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-4 h-full text-black w-full bg-white">
        <h1>افزودن استان</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ province: '' }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col items-start space-y-2">
                <label htmlFor="province">نام استان</label>
                <Field
                  name="province"
                  type="text"
                  placeholder="نام استان"
                  className="px-2 rounded-md w-[320px] h-[48px] border border-1 border-[#3B3B3B]"
                />
                {errors.province && touched.province && (
                  <div className="text-red-500 mt-1 text-sm">{errors.province}</div>
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

      {/* ToastContainer to display notifications */}
    </>
  )
}

export default AddProvince
