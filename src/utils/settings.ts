export interface Settings {
  showBadge: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  showBadge: true,
}

const SETTINGS_PREFIX = '@AWACY'
const SETTINGS_CHANGE_EVENT = `${SETTINGS_PREFIX}/settings-change`
const SETTINGS_KEY = `${SETTINGS_PREFIX}/settings`

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT, { detail: settings }))
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

export function getSettings(): Settings {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY)
    return settings ? { ...DEFAULT_SETTINGS, ...JSON.parse(settings) } : DEFAULT_SETTINGS
  } catch (error) {
    console.error('Failed to load settings:', error)
    return DEFAULT_SETTINGS
  }
}

export function subscribeToSettings(callback: (settings: Settings) => void): () => void {
  const handler = (event: CustomEvent<Settings>) => callback(event.detail)
  window.addEventListener(SETTINGS_CHANGE_EVENT as any, handler as EventListener)
  return () => window.removeEventListener(SETTINGS_CHANGE_EVENT as any, handler as EventListener)
}

