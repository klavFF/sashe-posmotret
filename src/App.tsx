import { useMemo, useState } from 'react'
import { collectTags, films, STATUS_OPTIONS, tagTone } from './data/films'
import type { Film, FilmStatus } from './data/films'
import { useFilmStatuses } from './hooks/useFilmStatuses'

function App() {
  const { statuses, setStatus, ready, error } = useFilmStatuses()
  const [activeTags, setActiveTags] = useState<string[]>([])
  const allTags = useMemo(() => collectTags(films), [])
  const visible = useMemo(
    () =>
      activeTags.length
        ? films.filter((film) => activeTags.every((tag) => film.tags.includes(tag)))
        : films,
    [activeTags],
  )
  const total = films.length
  const marked = Object.keys(statuses).length

  function toggleTag(tag: string) {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    )
  }

  return (
    <>
      <AutumnLeaves />
      <div className="page">
        <header className="hero">
          <p className="eyebrow">как и обещал</p>
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
                />
              ))}
            </ul>
          ) : (
            <p className="empty">Нет фильмов с такими тегами.</p>
          )}
        </main>
      </div>
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
}

function FilmRow({ film, status, activeTags, onSelect, onToggleTag }: FilmRowProps) {
  return (
    <li className={`film${status ? ` is-${status}` : ''}`}>
      <div className="film-meta">
        <h3>{film.title}</h3>
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

export default App
