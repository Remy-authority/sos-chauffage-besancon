/**
 * Halo diffus posé derrière les fonds sombres. Contrairement aux gros blobs
 * animés en JavaScript des templates précédents, T3 se contente de deux
 * dégradés radiaux en CSS, mis en dérive par une animation Tailwind : même
 * profondeur visuelle, aucun composant client, aucun coût de rendu au scroll.
 */
type Props = {
  className?: string
  teinte?: 'laiton' | 'jura' | 'fonte'
  taille?: number
  /** Position dans le cycle de dérive, pour désynchroniser deux halos voisins. */
  decalage?: number
}

const degrades: Record<NonNullable<Props['teinte']>, string> = {
  laiton:
    'radial-gradient(circle at 34% 32%, rgb(var(--c-laiton-franc) / 0.34), rgb(var(--c-laiton-patine) / 0.12) 42%, transparent 70%)',
  jura:
    'radial-gradient(circle at 34% 32%, rgb(var(--c-jura-tendre) / 0.32), rgb(var(--c-jura-sombre) / 0.14) 44%, transparent 72%)',
  fonte:
    'radial-gradient(circle at 34% 32%, rgb(var(--c-fonte-brut) / 0.6), rgb(var(--c-fonte-nuit) / 0.2) 45%, transparent 72%)',
}

export function HaloThermique({
  className = '',
  teinte = 'jura',
  taille = 460,
  decalage = 0,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute animate-derive rounded-jauge blur-3xl ${className}`}
      style={{
        width: taille,
        height: taille,
        background: degrades[teinte],
        animationDelay: `${decalage}s`,
        willChange: 'transform',
      }}
    />
  )
}

export default HaloThermique
