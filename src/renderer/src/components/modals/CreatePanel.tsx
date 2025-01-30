import { clearMessages, handleCreatePanel } from '@renderer/features/panelSlice'
import { ApplicationDispatch, ApplicationState } from '@renderer/store'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import InputField from '../reusable-form-field/InputFiled'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface CreatePanelProps {
  setIsModalOpen: (value: boolean) => void
}

// Regex for validating IPv4 addresses
const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/

// validation schema for creating panel
export const validationSchema = Yup.object({
  branchName: Yup.string().required('لطفا نام پنل را وارد کنید'),
  branchCode: Yup.number().required('لطفا کد شعبه را وارد کنید'),
  uploadCode: Yup.number().required('لطفا کد آپلود یا دانلود را وارد کنید'),
  wanIp: Yup.string()
    .matches(ipv4Regex, 'لطفا آی پی خارجی معتبر وارد کنید')
    .required('لطفا آی پی خارجی را وارد کنید'),
  localIp: Yup.string()
    .matches(ipv4Regex, 'لطفا آی پی داخلی معتبر وارد کنید')
    .required('لطفا آی پی داخلی را وارد کنید'),
  wanPort: Yup.number()
    .typeError('پورت خارجی حتما باید عدد باشد')
    .min(1, 'پورت خارجی باید حداقل 1 باشد')
    .max(65535, 'مقدار پورت خارجی نباید بیشتر از 65535 باشد')
    .required('لطفا مقدار پورت خارجی را وارد کنید'),
  localPort: Yup.number()
    .typeError('پورت داخلی حتما باید عدد باشد')
    .min(1, 'پورت داخلی باید حداقل 1 باشد')
    .max(65535, 'مقدار پورت داخلی نباید بیشتر از 65535 باشد')
    .required('لطفا مقدار پورت داخلی را وارد کنید'),
  panelType: Yup.string().required('لطفا نوع پنل را انتخاب کنید'),
  serialNumber: Yup.string()
    .matches(/^\d+$/, 'شماره سریال باید عدد باشد')
    .min(1, 'شماره سریال باید حداقل یک عدد باشد')
    .max(32, 'شماره سریال نباید بیشتر از 32 رقم باشد')
    .required('لطفا شماره سریال را وارد کنید'),
  description: Yup.string().notRequired()
})

function CreatePanel({ setIsModalOpen }: CreatePanelProps): JSX.Element {
  const dispatch: ApplicationDispatch = useDispatch()
  const { errorMessage, successMessage } = useSelector((state: ApplicationState) => state.panel)


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
    dispatch(handleCreatePanel(values)) // create pannel and store that panel in panel slice
    setIsModalOpen(false) // after submiting the form close modal
    console.log(values)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 h-full text-black w-full bg-white px-4">
        <h1>ایجاد پنل</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            branchName: '',
            branchCode: null,
            uploadCode: null,
            wanIp: '',
            wanPort: null,
            localIp: '',
            localPort: null,
            panelType: '',
            serialNumber: '',
            description: ''
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              {/* first row */}
              <div className="flex items-center gap-3 pb-4">
                {/* branch name */}
                <InputField name="branchName" label="نام شعبه" type="text" formik={formikProps} />
                {/* branch code */}
                <InputField
                  name="branchCode"
                  label="کد شعبه"
                  type="number"
                  formik={formikProps}
                  min="1"
                />
                {/* upload or download code */}
                <InputField
                  name="uploadCode"
                  label="کد آپلود / دانلود"
                  type="number"
                  min="1"
                  formik={formikProps}
                />
              </div>

              {/* second row */}
              <div className="flex items-center gap-3 pb-4">
                {/* foreign IP */}
                <InputField
                  name="wanIp"
                  label="آی پی خارجی"
                  type="text"
                  formik={formikProps}
                  className="w-[70%]"
                />
                {/* foreign port */}
                <InputField
                  name="wanPort"
                  label="پورت خارجی"
                  type="number"
                  formik={formikProps}
                  min="1"
                />
              </div>

              {/* third row */}
              <div className="flex items-center gap-3 pb-4">
                {/* local IP */}
                <InputField
                  name="localIp"
                  label="آی پی داخلی"
                  type="text"
                  formik={formikProps}
                  className="w-[70%]"
                />
                {/* local port */}
                <InputField
                  name="localPort"
                  label="پورت داخلی"
                  type="number"
                  min="1"
                  formik={formikProps}
                />
              </div>

              {/* forth row */}
              <div className="flex items-cente w-full gap-3 pb-4">
                {/* panel type selection */}
                <InputField
                  name="panelType"
                  type="string"
                  as="select"
                  label="انتخاب نوع پنل"
                  formik={formikProps}
                  className="w-[60%]"
                />
                {/* panel's serial number */}
                <InputField
                  name="serialNumber"
                  label="شماره سریال پنل"
                  type="text"
                  formik={formikProps}
                  className="w-[40%]"
                />
              </div>

              {/* description */}
              <div className="flex flex-col items-start space-y-2 ">
                <label htmlFor="description">توضیحات:</label>
                <Field
                  as="textarea"
                  name="description"
                  className="px-2 rounded-md min-h-[48px] w-full border border-1 border-[#3B3B3B] resize-y max-h-[140px]"
                />
              </div>

              {/* create or cancel buttons */}
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

export default CreatePanel
