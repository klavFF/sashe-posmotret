export type FilmStatus = 'willWatch' | 'watched' | 'notMyVibe'

export type Film = {
  id: string
  title: string
  tags: string[]
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
 * 4. Сохраните файл и задеплойте
 *
 * Не меняйте id уже отмеченных фильмов, иначе статус потеряется.
 */
export const films: Film[] = [
  { id: 'interstellar', title: 'Интерстеллар', tags: ['лега','поплачешь','фантастика'] },
  { id: 'harry-potter', title: 'Гарри Поттер', tags: ['лега','фэнтези'] },
  { id: 'amelie', title: 'Амели', tags: ['лайтовое','на подумать'] },
  { id: 'get-out', title: 'Прочь', tags: ['лайтовое','детектив','типо ужастик'] },
  { id: 'knives-out', title: 'Достать ножи', tags: ['лайтовое','детектив'] },
  { id: 'the-hangover', title: 'Мальчишник в Вегасе', tags: ['лайтовое','посмеяться'] },
  { id: 'igra-endera', title: 'Игра Эндера', tags: ['на подумать','фантастика'] },
  { id: 'obsession', title: 'Обсессия', tags: ['ужастик'] },
  { id: 'bring-her-back', title: 'Верни её из мёртвых', tags: ['ужастик'] },
  { id: 'in-the-dark', title: 'Взаперти', tags: ['драма'] },
  { id: 'one-plus-one', title: '1+1', tags: ['драма','посмеяться','лега'] },
  { id: 'meet-me-in-the-moon', title: 'До встречи с тобой', tags: ['драма','поплачешь'] },
  { id: 'sinister', title: 'Синистер', tags: ['ужастик'] },
  { id: 'constantin', title: 'Константин', tags: ['фентези'] },
  { id: 'barbarian', title: 'Варвар', tags: ['ужастик'] },
  { id: 'silence', title: 'Тишина', tags: ['типо ужастик'] },
  { id: 'bird-box', title: 'Птичий короб', tags: ['типо ужастик','фантастика'] },
  { id: 'seven', title: 'Семь', tags: ['лега','детектив'] },
  { id: 'kolobok', title: 'Колобок', tags: ['лега','ужастик','фентези','посмеяться'] },
]
