import { createContext, useContext, useState, type ReactNode } from 'react'

type Widgets = {
  precoDia: boolean
  cotacoes: boolean
  eventCalendar: boolean
  weather: boolean
  podcast: boolean
  revista: boolean
}

type WidgetPreferencesContextType = {
  widgets: Widgets
  toggleWidget: (key: keyof Widgets) => void
}

const defaultWidgets: Widgets = {
  precoDia: true,
  cotacoes: true,
  eventCalendar: true,
  weather: true,
  podcast: true,
  revista: true,
}

const WidgetPreferencesContext = createContext<WidgetPreferencesContextType>({
  widgets: defaultWidgets,
  toggleWidget: () => {},
})

export function WidgetPreferencesProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<Widgets>(defaultWidgets)

  const toggleWidget = (key: keyof Widgets) => {
    setWidgets(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <WidgetPreferencesContext.Provider value={{ widgets, toggleWidget }}>
      {children}
    </WidgetPreferencesContext.Provider>
  )
}

export function useWidgetPreferences() {
  return useContext(WidgetPreferencesContext)
}
