import { useSelector } from 'react-redux'
import { ApplicationState } from '@renderer/store'

export interface SidebarItem {
  label: string
  path: string
  children?: SidebarItem[]
}

export function useSidebarItems(): SidebarItem[] {
  const selectedPanelChild = useSelector((state: ApplicationState) => state.panelChild.child) // use the selected child of panel management section in sidebar
  // const createdPanels = useSelector((state:ApplicationState) => state.panel.panels) // use pannels witch created in panel table

  const sidebarItems = [
    ...(selectedPanelChild.label !== ''
      ? [
          {
            label: selectedPanelChild.label,
            path: selectedPanelChild.path
          }
        ]
      : []),
    {
      label: 'مدیریت پنل',
      path: '/panel-management',
      // children: createdPanels.map(panel => ({
      //   label: panel.panelName,
      //   path: ``
      // }))
      children: [
        {
          label: 'پنل 1',
          path: '/panel-management/firstPanel',
          children: [{ label: 'پنل 7', path: '/' }]
        },
        { label: 'پنل 2', path: '/fe' }
      ]
    },
    {
      label: 'آپدیت پنل',
      path: 'update-panel',
      children: [{ label: 'پنل 5', path: '/fe' }]
    }
  ]

  return sidebarItems
}
