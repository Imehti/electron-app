import { useCallback } from 'react'

interface UseKeyboardNavigationOptions<T> {
  items: T[]
  onSelect: (item: T) => void
  onRowIndexChange?: (index: number) => void
}

type HandleKeyDown<T> = (
  event: React.KeyboardEvent<HTMLDivElement>,
  selectedRowIndex: number,
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>
) => void

const useKeyboardNavigation = <T>({
  items,
  onSelect,
  onRowIndexChange
}: UseKeyboardNavigationOptions<T>): { handleKeyDown: HandleKeyDown<T> } => {
  const handleKeyDown: HandleKeyDown<T> = useCallback(
    (event, selectedRowIndex, setSelectedRowIndex) => {
      switch (event.key) {
        case 'ArrowDown':
          setSelectedRowIndex((prevIndex) =>
            prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex
          )
          if (selectedRowIndex < items.length - 1) {
            onRowIndexChange?.(selectedRowIndex + 1)
          }
          break
        case 'ArrowUp':
          setSelectedRowIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
          if (selectedRowIndex > 0) {
            onRowIndexChange?.(selectedRowIndex - 1)
          }
          break
        case 'Enter':
          if (selectedRowIndex >= 0) {
            const selected = items[selectedRowIndex]
            onSelect(selected)
          }
          break
      }
    },
    [items, onSelect, onRowIndexChange]
  )

  return { handleKeyDown }
}

export default useKeyboardNavigation
