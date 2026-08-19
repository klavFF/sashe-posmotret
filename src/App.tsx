import { useEffect, useMemo, useRef, useState } from 'react'
import { collectTags, coverSrc, films, STATUS_OPTIONS, tagTone, youtubeId } from './data/films'
import type { Film, FilmStatus } from './data/films'
import { useFilmStatuses } from './hooks/useFilmStatuses'
import screamImg from './assets/screamer.png'
import screamSound from './assets/screamer.mp3'

const SCREAM_MS = 2000

function App() {
  const { statuses, setStatus, ready, error } = useFilmStatuses()
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [trailerFilm, setTrailerFilm] = useState<Film | null>(null)
  const [screaming, setScreaming] = useState(false)
  const screamAudio = useRef<HTMLAudioElement | null>(null)
  const screamTimer = useRef<number | null>(null)
  const allTags = useMemo(() => collectTags(films), [])
  const visible = useMemo(
    () =>
      activeTags.length
        ? films.filter((film) => activeTags.every((tag) => film.tags.includes(tag)))
        : films,
    [activeTags],
  )
  const total = films.length
  const marked = films.filter((film) => statuses[film.id]).length

  function toggleTag(tag: string) {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    )
  }

  useEffect(() => {
    const audio = new Audio(screamSound)
    audio.preload = 'auto'
    screamAudio.current = audio
    return () => {
      audio.pause()
      if (screamTimer.current) window.clearTimeout(screamTimer.current)
    }
  }, [])

  function triggerScream() {
    if (screaming) return
    setScreaming(true)
    const audio = screamAudio.current
    if (audio) {
      audio.currentTime = 0
      void audio.play().catch(() => {})
    }
    screamTimer.current = window.setTimeout(() => {
      audio?.pause()
      if (audio) audio.currentTime = 0
      setScreaming(false)
      screamTimer.current = null
    }, SCREAM_MS)
  }

  return (
    <>
      <AutumnLeaves />
      <div className="page">
        <header className="hero">
          <p className="eyebrow">как и обещал</p>
          <div className="hero-row">
            <div className="hero-copy">
              <h1>
                Осенний список <span className="wink" aria-hidden="true">😉</span>
              </h1>
              <p className="lede">
                Пока добавлю что вспомню, работаем в режиме бета-теста) 
              </p>
              <p className="counter">
                {ready
                  ? activeTags.length
                    ? `показано ${visible.length} · отмечено ${marked} из ${total}`
                    : `отмечено ${marked} из ${total}`
                  : 'загружаем отметки…'}
              </p>
            </div>
            <button type="button" className="scream-btn" onClick={triggerScream} disabled={screaming}>
              Страшная кнопка <span aria-hidden="true">💀</span>
            </button>
          </div>
        </header>

        {error ? <p className="banner">{error}</p> : null}

        <div className="filters" aria-label="Фильтр по тегам">
          {allTags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              selected={activeTags.includes(tag)}
              onToggle={() => toggleTag(tag)}
            />
          ))}
          {activeTags.length ? (
            <button type="button" className="filter-clear" onClick={() => setActiveTags([])}>
              сбросить
            </button>
          ) : null}
        </div>

        <main>
          {visible.length ? (
            <ul className="films">
              {visible.map((film) => (
                <FilmRow
                  key={film.id}
                  film={film}
                  status={statuses[film.id]}
                  activeTags={activeTags}
                  onSelect={(next) => setStatus(film.id, next)}
                  onToggleTag={toggleTag}
                  onTrailer={setTrailerFilm}
                />
              ))}
            </ul>
          ) : (
            <p className="empty">Нет фильмов с такими тегами.</p>
          )}
        </main>
      </div>
      {trailerFilm ? (
        <TrailerModal film={trailerFilm} onClose={() => setTrailerFilm(null)} />
      ) : null}
      {screaming ? (
        <div className="screamer" aria-hidden="true">
          <img src={screamImg} alt="" />
        </div>
      ) : null}
    </>
  )
}

function MapleLeaf() {
  return (
    <svg viewBox="0 0 160 190" aria-hidden="true">
      <path
        fill="currentColor"
        d="
          M80 6
          L88 30 L102 20 L96 40 L118 32 L104 50
          L108 56
          L132 30 L128 50 L154 46 L138 66 L156 76 L130 80
          L126 88
          L146 100 L132 106 L140 126 L114 112
          L110 124 L80 128 L50 124
          L46 112 L20 126 L28 106 L14 100
          L34 88
          L30 80 L4 76 L22 66 L6 46 L32 50 L28 30
          L52 56
          L56 50 L42 32 L64 40 L58 20 L72 30
          Z
        "
      />
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
        opacity="0.42"
        style={{ mixBlendMode: 'multiply' }}
      >
        <path d="M80 120V26" />
        <path d="M80 120 130 52" />
        <path d="M80 120 30 52" />
        <path d="M80 120 128 110" />
        <path d="M80 120 32 110" />
        <path d="M80 120q7 30 0 56" />
      </g>
    </svg>
  )
}

const SIDE_LEAVES = [
  { className: 'leaf leaf-side leaf-l1' },
  { className: 'leaf leaf-side leaf-l3' },
  { className: 'leaf leaf-side leaf-r1' },
  { className: 'leaf leaf-side leaf-r3' },
]

const FALLING_LEAVES = [
  { className: 'leaf leaf-fall leaf-f1' },
  { className: 'leaf leaf-fall leaf-f2' },
  { className: 'leaf leaf-fall leaf-f3' },
  { className: 'leaf leaf-fall leaf-f4' },
  { className: 'leaf leaf-fall leaf-f5' },
  { className: 'leaf leaf-fall leaf-f6' },
  { className: 'leaf leaf-fall leaf-f7' },
  { className: 'leaf leaf-fall leaf-f8' },
]

function AutumnLeaves() {
  return (
    <div className="autumn" aria-hidden="true">
      {SIDE_LEAVES.map((leaf) => (
        <span key={leaf.className} className={leaf.className}>
          <MapleLeaf />
        </span>
      ))}
      {FALLING_LEAVES.map((leaf) => (
        <span key={leaf.className} className={leaf.className}>
          <MapleLeaf />
        </span>
      ))}
    </div>
  )
}

type TagChipProps = {
  tag: string
  selected?: boolean
  onToggle: () => void
}

function TagChip({ tag, selected, onToggle }: TagChipProps) {
  return (
    <button
      type="button"
      className={`tag tag-tone-${tagTone(tag)}${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onToggle}
    >
      {tag}
    </button>
  )
}

type FilmRowProps = {
  film: Film
  status?: FilmStatus
  activeTags: string[]
  onSelect: (status: FilmStatus) => void
  onToggleTag: (tag: string) => void
  onTrailer: (film: Film) => void
}

function FilmPoster({ cover, title }: { cover: string; title: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      className="film-poster"
      src={coverSrc(cover)}
      alt=""
      title={title}
      onError={() => setFailed(true)}
    />
  )
}

function TrailerIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <path fill="currentColor" d="M7.2 4.6v10.8L16 10 7.2 4.6z" />
    </svg>
  )
}

function FilmRow({ film, status, activeTags, onSelect, onToggleTag, onTrailer }: FilmRowProps) {
  return (
    <li className={`film${status ? ` is-${status}` : ''}`}>
      <div className="film-meta">
        {film.cover ? <FilmPoster cover={film.cover} title={film.title} /> : null}
        <div className="film-heading">
          <h3>{film.title}</h3>
          {film.trailer ? (
            <button
              type="button"
              className="trailer-btn"
              aria-label={`Трейлер: ${film.title}`}
              onClick={() => onTrailer(film)}
            >
              <TrailerIcon />
            </button>
          ) : null}
        </div>
      </div>
      {film.tags.length ? (
        <div className="film-tags">
          {film.tags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              selected={activeTags.includes(tag)}
              onToggle={() => onToggleTag(tag)}
            />
          ))}
        </div>
      ) : (
        <div className="film-tags" />
      )}
      <div className="status-group" role="group" aria-label={`Статус: ${film.title}`}>
        {STATUS_OPTIONS.map((option) => {
          const selected = status === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={`status-btn status-btn-${option.id}${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onSelect(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </li>
  )
}

type TrailerModalProps = {
  film: Film
  onClose: () => void
}

function TrailerModal({ film, onClose }: TrailerModalProps) {
  const videoId = film.trailer ? youtubeId(film.trailer) : null

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Трейлер: ${film.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <p>{film.title}</p>
          <button type="button" className="modal-close" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-frame">
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={`Трейлер: ${film.title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="modal-error">Не получилось открыть трейлер.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
