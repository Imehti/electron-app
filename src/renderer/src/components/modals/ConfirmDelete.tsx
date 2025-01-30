interface ConfirmDeleteProps {
  title: string
  setIsDeleteModalOpen: (value: boolean) => void
  onDeleteConfirm: () => void // A callback that gets called when delete is confirmed
}

const ConfirmDelete = ({
  title,
  setIsDeleteModalOpen,
  onDeleteConfirm
}: ConfirmDeleteProps): JSX.Element => {
  // Handle the delete confirmation
  const handleDeleteConfirm = () : void => {
    onDeleteConfirm() // Trigger the deletion logic passed from parent
    setIsDeleteModalOpen(false) // Close the modal
  }

  // Handle the close without delete (if the user clicks 'No')
  const handleCancel = () : void => {
    setIsDeleteModalOpen(false) // Close the modal without doing anything
  }

  return (
    <div className="flex flex-col space-y-8 p-4 bg-white">
      <h1 className="text-center">{title}</h1>
      <div className="flex items-center justify-center gap-6">
        <button
          className="px-3 rounded-md bg-[#09A1A4] text-white w-1/3 h-[48px]"
          onClick={handleDeleteConfirm} // Handle the 'Yes' click (Confirm deletion)
        >
          بله
        </button>
        <button
          className="px-3 border border-1 bg-red-500 rounded-md w-1/3 h-[48px] text-white"
          onClick={handleCancel} // Handle the 'No' click (Cancel deletion)
        >
          خیر
        </button>
      </div>
    </div>
  )
}

export default ConfirmDelete
