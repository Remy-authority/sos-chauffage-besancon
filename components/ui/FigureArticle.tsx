'use client'

import { useState } from 'react'

/**
 * Figure d'article (visuels du corps), à poser dans les .mdx en JSX de bloc :
 *
 *   <Figure
 *     src="/conseils/<slug>/manometre.jpg"
 *     alt="Description de ce qui est réellement photographié"
 *     legende="Légende courte affichée sous l'image"
 *   />
 *
 * Les textes de l'autoblog sont écrits avant que leurs visuels soient produits :
 * si le fichier n'existe pas encore, la figure ENTIÈRE est masquée (légende
 * comprise) plutôt que d'afficher une image cassée au milieu de l'article.
 * Interdit dans `legende` : tiret cadratin, chiffres non validés.
 */
export function FigureArticle({
  src,
  alt,
  legende,
}: {
  src: string
  alt: string
  legende?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-voile shadow-pose">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block w-full"
          onError={() => setFailed(true)}
        />
      </div>
      {legende && (
        <figcaption className="mt-3 flex gap-3 text-legende leading-relaxed text-calcaire-roche">
          <span aria-hidden="true" className="mt-[0.55em] h-px w-6 shrink-0 bg-laiton-franc" />
          {legende}
        </figcaption>
      )}
    </figure>
  )
}
