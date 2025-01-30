import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import InputField from '../reusable-form-field/InputFiled'

interface ReusableFormProps {
  initialValues: Record<string, any>
  validationSchema: Yup.ObjectSchema
  onSubmit: (values: Record<string, any>) => void
  fields: Array<{ name: string; label: string; type: string }>
  setIsModalOpen: (value: boolean) => void
}

const ReusableEditForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  setIsModalOpen,
}: ReusableFormProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <h1 className="text-center">ویرایش</h1>

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form>
            {fields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                formik={formikProps}
              />
            ))}

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
  )
}

export default ReusableEditForm
