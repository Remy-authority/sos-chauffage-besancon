'use client'

import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { pose, vuUneFois } from '@/lib/motion'

type Props = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: ElementType
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

/**
 * Enveloppe d'apparition au scroll. Primitive unique du site : c'est elle qui
 * garantit que chaque bloc se pose avec le même timing et la même courbe.
 * Les états sont nommés `repos` / `actif` (vocabulaire T3, cf. lib/motion.ts).
 */
export function AnimatedSection({
  children,
  className = '',
  variants = pose,
  delay = 0,
  as = 'div',
  id,
  ...rest
}: Props) {
  const Balise = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Balise
      id={id}
      initial="repos"
      whileInView="actif"
      viewport={vuUneFois}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Balise>
  )
}

export default AnimatedSection
