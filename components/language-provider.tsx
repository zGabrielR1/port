"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'es' | 'pt'

interface TranslationsType {
  [key: string]: { [key: string]: string | string[] }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: TranslationsType = {
  en: {
    'hero.greeting': 'Hi, I\'m',
    'hero.subtitle': 'Full-Stack Developer & Software Engineer',
    'hero.description': 'I craft exceptional digital experiences with modern technologies. Passionate about clean code, innovative solutions, and building products that make a difference.',
    'hero.viewWork': 'View My Work',
    'hero.downloadCV': 'Download CV',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'about.title': 'About Me',
    'about.badge': 'Get to know me',
    'about.description1': 'Passionate software developer with expertise in modern web technologies and a love for creating innovative solutions that make a real impact.',
    'about.description2': 'With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies.',
    'about.drives': 'What drives me:',
    'about.values.0': 'Problem Solver',
    'about.values.1': 'Team Player',
    'about.values.2': 'Continuous Learner',
    'about.values.3': 'Innovation Focused'
  },
  es: {
    'hero.greeting': 'Hola, soy',
    'hero.subtitle': 'Desarrollador Full-Stack & Ingeniero de Software',
    'hero.description': 'Creo experiencias digitales excepcionales con tecnologías modernas. Apasionado por el código limpio, soluciones innovadoras y construir productos que marquen la diferencia.',
    'hero.viewWork': 'Ver Mi Trabajo',
    'hero.downloadCV': 'Descargar CV',
    'nav.about': 'Acerca de',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'about.title': 'Acerca de Mí',
    'about.badge': 'Conóceme',
    'about.description1': 'Desarrollador de software apasionado con experiencia en tecnologías web modernas y amor por crear soluciones innovadoras que generan impacto.',
    'about.description2': 'Con más de 5 años de experiencia en desarrollo de software, me especializo en construir aplicaciones web escalables utilizando tecnologías de vanguardia.',
    'about.drives': 'Lo que me impulsa:',
    'about.values.0': 'Solucionador de Problemas',
    'about.values.1': 'Jugador de Equipo',
    'about.values.2': 'Aprendiz Continuo',
    'about.values.3': 'Enfocado en la Innovación'
  },
  pt: {
    'hero.greeting': 'Olá, eu sou',
    'hero.subtitle': 'Desenvolvedor Full-Stack & Engenheiro de Software',
    'hero.description': 'Crio experiências digitais excepcionais com tecnologias modernas. Apaixonado por código limpo, soluções inovadoras e construir produtos que fazem a diferença.',
    'hero.viewWork': 'Ver Meu Trabalho',
    'hero.downloadCV': 'Baixar CV',
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',
    'nav.contact': 'Contato',
    'about.title': 'Sobre Mim',
    'about.badge': 'Conheça-me',
    'about.description1': 'Desenvolvedor de software apaixonado com expertise em tecnologias web modernas e amor por criar soluções inovadoras que fazem impacto.',
    'about.description2': 'Com mais de 5 anos de experiência em desenvolvimento de software, especializo-me em construir aplicações web escaláveis usando tecnologias de ponta.',
    'about.drives': 'O que me impulsiona:',
    'about.values.0': 'Solucionador de Problemas',
    'about.values.1': 'Trabalho em Equipe',
    'about.values.2': 'Aprendizado Contínuo',
    'about.values.3': 'Focado na Inovação'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return (translations[language]?.[key] as string) || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}