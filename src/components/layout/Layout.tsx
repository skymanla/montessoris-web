import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'stone' | 'none'
}

export function Section({ children, className = "", id, background = 'none' }: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    stone: 'bg-stone-50',
    none: ''
  }

  return (
    <section id={id} className={`py-24 ${bgStyles[background]} ${className}`}>
      {children}
    </section>
  )
}
