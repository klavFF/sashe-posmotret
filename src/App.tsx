import { categories, STATUS_OPTIONS } from './data/films'
import type { Film, FilmStatus } from './data/films'
import { useFilmStatuses } from './hooks/useFilmStatuses'

function App() {
  const { statuses, setStatus, ready, error } = useFilmStatuses()
  const total = categories.reduce((sum, category) => sum + category.films.length, 0)
  const marked = Object.keys(statuses).length

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">общий список</p>
        <h1>Саше посмотреть</h1>
        <p className="lede">
          Фильмы уже здесь. Осталось отметить: посмотрю, смотрела или не мой вайб.
        </p>
        <p className="counter">
          {ready ? `отмечено ${marked} из ${total}` : 'загружаем отметки…'}
        </p>
      </header>

      {error ? <p className="banner">{error}</p> : null}

      <main>
        {categories.map((category) => (
          <section key={category.id} className="category">
            <h2>{category.title}</h2>
            <ul className="films">
              {category.films.map((film) => (
                <FilmRow
                  key={film.id}
                  film={film}
                  status={statuses[film.id]}
                  onSelect={(next) => setStatus(film.id, next)}
                />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}

type FilmRowProps = {
  film: Film
  status?: FilmStatus
  onSelect: (status: FilmStatus) => void
}

function FilmRow({ film, status, onSelect }: FilmRowProps) {
  return (
    <li className={`film${status ? ` is-${status}` : ''}`}>
      <div className="film-meta">
        <h3>{film.title}</h3>
        <span>{film.year}</span>
      </div>
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
