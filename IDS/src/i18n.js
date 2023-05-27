import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
    .use(Backend) // Habilita o backend do i18next
    .use(LanguageDetector) // Habilita a detecção automática de linguagem
    .use(initReactI18next) // Habilita o módulo de inicialização do hook

    .init({
        fallbackLng: 'pt', // Linguagem padrão utilizada
        debug: false, // Detecta e guarda um cookie em cache da linguagem fornecida
        detection: {
            order: ['queryString', 'cookie'], // Ordem de detecção de linguagem
            cache: ['cookie'] // Guarda um cookie em cache da linguagem fornecida
        },
        interpolation: {
            escapeValue: false // Não escapa os valores para o React
        }
    })

export default i18n;