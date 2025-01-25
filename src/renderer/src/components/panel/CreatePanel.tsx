import { handleCreatePanel } from '@renderer/features/panelSlice'
import { ApplicationDispatch } from '@renderer/store'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'



interface CreatePanelProps {
  setIsModalOpen: (value: boolean) => void
}

// validation schema for creating panel
const validationSchema = Yup.object({
  panelName: Yup.string().required('لطفا نام پنل را وارد کنید')
})


// create panel function
function CreatePanel({ setIsModalOpen }: CreatePanelProps): JSX.Element {
  
  const dispatch: ApplicationDispatch = useDispatch() 

  // handle submiting the form of creating panel
  const handleSubmit: FormikConfig<FormikValues>['onSubmit'] = (values) => {
    dispatch(handleCreatePanel(values)) // create pannel and store that panel in panel slice
    setIsModalOpen(false) // after submiting the form close modal
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-4 h-full text-black w-full bg-gray-100">
        <h1>ایجاد پنل جدید</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ panelName: '' }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='flex flex-col items-start space-y-2'>
                <label htmlFor='panelName'>نام پنل</label>
                <Field name="panelName" type="text" placeholder="نام پنل" className={`px-2 rounded-md  w-[320px] h-[48px] border border-1 border-[#3B3B3B]`} />
                {errors.panelName && touched.panelName && (
                  <div className="text-red-500 mt-1 text-sm">{errors.panelName}</div>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button type="submit" className="px-3 rounded-md bg-[#09A1A4] text-white w-1/3 h-[48px]">
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

export default CreatePanel
