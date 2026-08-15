export type FilmStatus = 'willWatch' | 'watched' | 'notMyVibe'

export type Film = {
  id: string
  title: string
  year: number
}

export type Category = {
  id: string
  title: string
  films: Film[]
}

export const STATUS_OPTIONS: { id: FilmStatus; label: string }[] = [
  { id: 'willWatch', label: 'посмотрю' },
  { id: 'watched', label: 'смотрела' },
  { id: 'notMyVibe', label: 'не мой вайб' },
]

/**
 * Список фильмов живёт здесь. Чтобы добавить фильм:
 * 1. Выберите категорию (или добавьте новую)
 * 2. Укажите уникальный id латиницей — по нему хранится статус в Firebase
 * 3. Сохраните файл и задеплойте
 *
 * Не меняйте id уже отмеченных фильмов, иначе статус потеряется.
 */
export const categories: Category[] = [
  {
    id: 'warm',
    title: 'Тёплое',
    films: [
      { id: 'amelie', title: 'Амели', year: 2001 },
      { id: 'before-sunrise', title: 'Перед рассветом', year: 1995 },
      { id: 'little-women', title: 'Маленькие женщины', year: 2019 },
    ],
  },
  {
    id: 'evening',
    title: 'На вечер',
    films: [
      { id: 'portrait-of-a-lady-on-fire', title: 'Портрет девушки в огне', year: 2019 },
      { id: 'la-la-land', title: 'Ла-ла ленд', year: 2016 },
      { id: 'everything-everywhere', title: 'Всё везде и сразу', year: 2022 },
    ],
  },
  {
    id: 'strange',
    title: 'Странное',
    films: [
      { id: 'parasite', title: 'Паразиты', year: 2019 },
      { id: 'get-out', title: 'Прочь', year: 2017 },
      { id: 'oldboy', title: 'Олдбой', year: 2003 },
    ],
  },
  {
    id: 'funny',
    title: 'Смешное',
    films: [
      { id: 'grand-budapest', title: 'Отель «Гранд Будапешт»', year: 2014 },
      { id: 'knives-out', title: 'Достать ножи', year: 2019 },
      { id: 'the-hangover', title: 'Мальчишник в Вегасе', year: 2009 },
    ],
  },
]
