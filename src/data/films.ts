export type FilmStatus = 'willWatch' | 'watched' | 'notMyVibe'

export type Film = {
  id: string
  title: string
  tags: string[]
  cover?: string
  trailer?: string
}

export const STATUS_OPTIONS: { id: FilmStatus; label: string }[] = [
  { id: 'willWatch', label: 'посмотрю' },
  { id: 'watched', label: 'смотрела' },
  { id: 'notMyVibe', label: 'не мой вайб' },
]

export const TAG_TONE_COUNT = 8

export function tagTone(tag: string) {
  let hash = 0
  for (const char of tag) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return hash % TAG_TONE_COUNT
}

export function coverSrc(cover: string) {
  if (/^https?:\/\//i.test(cover)) return cover
  return `${import.meta.env.BASE_URL}${cover.replace(/^\//, '')}`
}

export function youtubeId(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be' || parsed.hostname.endsWith('.youtu.be')) {
      return parsed.pathname.split('/').filter(Boolean)[0] ?? null
    }
    if (parsed.hostname.includes('youtube.com')) {
      const fromQuery = parsed.searchParams.get('v')
      if (fromQuery) return fromQuery
      const parts = parsed.pathname.split('/').filter(Boolean)
      const marker = parts.findIndex((part) => part === 'embed' || part === 'shorts')
      if (marker >= 0) return parts[marker + 1] ?? null
    }
    return null
  } catch {
    return null
  }
}

export function collectTags(items: Film[]) {
  const seen = new Set<string>()
  const tags: string[] = []
  for (const film of items) {
    for (const tag of film.tags) {
      if (!seen.has(tag)) {
        seen.add(tag)
        tags.push(tag)
      }
    }
  }
  return tags
}

/**
 * Список фильмов живёт здесь. Чтобы добавить фильм:
 * 1. Добавьте объект в массив films
 * 2. Укажите уникальный id латиницей — по нему хранится статус в Firebase
 * 3. Теги — любые строки, их можно несколько
 * 4. cover и trailer необязательны: постер и иконка трейлера появятся сами
 * 5. Сохраните файл и задеплойте
 *
 * Не меняйте id уже отмеченных фильмов, иначе статус потеряется.
 */
export const films: Film[] = [
  {
    id: 'interstellar',
    title: 'Интерстеллар',
    tags: ['лега','поплачешь','фантастика'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg',
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
  },
  {
    id: 'harry-potter',
    title: 'Гарри Поттер',
    tags: ['лега','фэнтези'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg',
    trailer: 'https://www.youtube.com/watch?v=VyHV0BRtdxo',
  },
  {
    id: 'amelie',
    title: 'Амели',
    tags: ['лайтовое','на подумать'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/9/9b/Amelie_DVD_box.jpg',
    trailer: 'https://www.youtube.com/watch?v=2UT5xaAfxWU',
  },
  {
    id: 'knives-out-3',
    title: 'Достать ножи 3',
    tags: ['лайтовое','детектив'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/1/15/%D0%94%D0%BE%D1%81%D1%82%D0%B0%D1%82%D1%8C_%D0%BD%D0%BE%D0%B6%D0%B8_-_%D0%92%D0%BE%D1%81%D0%BA%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%BA%D0%BE%D0%B9%D0%BD%D0%B8%D0%BA%D0%B0.jpg',
    trailer: 'https://www.youtube.com/watch?v=0hc8yz5-d5Y',
  },
  {
    id: 'the-hangover',
    title: 'Мальчишник в Вегасе',
    tags: ['лайтовое','посмеяться'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/c/cd/The_Hangover.jpg',
    trailer: 'https://www.youtube.com/watch?v=tcdUhdOlz9M',
  },
  {
    id: 'obsession',
    title: 'Обсессия',
    tags: ['ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/0/05/Obsession_theatrical_poster.jpeg',
    trailer: 'https://www.youtube.com/watch?v=TaaDkbG3I7g',
  },
  {
    id: 'bring-her-back',
    title: 'Верни её из мёртвых',
    tags: ['ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/0/0b/%D0%92%D0%B5%D1%80%D0%BD%D0%B8_%D0%B5%D1%91_%D0%B8%D0%B7_%D0%BC%D1%91%D1%80%D1%82%D0%B2%D1%8B%D1%85.jpg',
    trailer: 'https://www.youtube.com/watch?v=kBskrYZfhw8',
  },
  {
    id: 'in-the-dark',
    title: 'Взаперти',
    tags: ['драма'],
    cover: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Shut_In_%282022_film%29.jpg',
  },
  {
    id: 'constantin',
    title: 'Константин',
    tags: ['фэнтези'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/8/89/Constantine_Poster.jpg',
    trailer: 'https://www.youtube.com/watch?v=DEa508Xmmio',
  },
  {
    id: 'barbarian',
    title: 'Варвар',
    tags: ['ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/a/a0/%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80_2022_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg',
    trailer: 'https://www.youtube.com/watch?v=Dr89pmKrqkI',
  },
  {
    id: 'silence',
    title: 'Тишина',
    tags: ['типо ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/0/00/Hush_%28film%2C_2016%29.jpg',
    trailer: 'https://www.youtube.com/watch?v=Q_P8WCbhC6s',
  },
  {
    id: 'seven',
    title: 'Семь',
    tags: ['лега','детектив'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/8/83/Se7en_%28poster%29.jpg',
    trailer: 'https://www.youtube.com/watch?v=UKgMoL2JQ0I',
  },
  {
    id: 'kolobok',
    title: 'Колобок',
    tags: ['лега','ужастик','фэнтези','посмеяться'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/e/e9/Kolobok-Film.webp',
    trailer: 'https://www.youtube.com/watch?v=SvORH9us11I',
  },
  {
    id: 'vershina',
    title: 'Вершина',
    tags: ['лайтовое'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/1/1f/%D0%92%D0%B5%D1%80%D1%88%D0%B8%D0%BD%D0%B0_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2026%2C_%D0%91%D0%B0%D0%BB%D1%8C%D1%82%D0%B0%D1%81%D0%B0%D1%80_%D0%9A%D0%BE%D1%80%D0%BC%D0%B0%D0%BA%D1%83%D1%80%29.jpg',
    trailer: 'https://www.youtube.com/watch?v=r3PgJWNsp20',
  },
  {
    id: 'exit-8',
    title: 'Выход 8',
    tags: ['лайтовое'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/0/04/%D0%92%D1%8B%D1%85%D0%BE%D0%B4_8_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2025%29_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg',
    trailer: 'https://www.youtube.com/watch?v=DlRQ1oatOt8',
  },
  {
    id: 'mirrors',
    title: 'Зеркала',
    tags: ['ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/0/07/Mirrors_%28movie-poster%29.jpg',
    trailer: 'https://www.youtube.com/watch?v=O92QxxgeCO8',
  },
  {
    id: 'cabin-in-the-woods',
    title: 'Хижина в лесу',
    tags: ['типо ужастик','лайтовое','фэнтези'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/1/10/The_Cabin_in_the_Woods.jpg',
    trailer: 'https://www.youtube.com/watch?v=NsIilFNNmkY',
  },
  {
    id: 'prometheus',
    title: 'Прометей',
    tags: ['ужастик','фантастика'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/b/b3/Prometheus_poster.jpg',
    trailer: 'https://www.youtube.com/watch?v=pyz9ktII0dM',
  },
  {
    id: 'the-mummy-2026',
    title: 'Мумия',
    tags: ['ужастик'],
    cover: 'https://upload.wikimedia.org/wikipedia/ru/c/cb/%D0%9C%D1%83%D0%BC%D0%B8%D1%8F_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2026%29.jpg',
    trailer: 'https://www.youtube.com/watch?v=FNJdxi2ZSEA',
  },
]
