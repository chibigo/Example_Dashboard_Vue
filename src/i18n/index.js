import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import vi from './locales/vi.json'

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCAL,
  legacy: false,
  globalInjection: true,
  messages: { en, vi }
})