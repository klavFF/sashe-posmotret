import { useCallback, useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import type { FilmStatus } from '../data/films'
import { db } from '../firebase'

const statusesRef = collection(db, 'statuses')

export function useFilmStatuses() {
  const [statuses, setStatuses] = useState<Record<string, FilmStatus>>({})
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      statusesRef,
      (snapshot) => {
        const next: Record<string, FilmStatus> = {}
        snapshot.forEach((item) => {
          const status = item.data().status as FilmStatus | undefined
          if (status) next[item.id] = status
        })
        setStatuses(next)
        setReady(true)
        setError(null)
      },
      (snapshotError) => {
        setReady(true)
        setError(
          snapshotError.code === 'permission-denied'
            ? 'Нет доступа к базе. Обновите правила Firestore.'
            : 'Не получилось загрузить статусы.',
        )
      },
    )

    return unsubscribe
  }, [])

  const setStatus = useCallback(
    async (filmId: string, next: FilmStatus) => {
      const current = statuses[filmId]
      const value = current === next ? null : next
      const previous = statuses

      setStatuses((prev) => {
        const copy = { ...prev }
        if (value) copy[filmId] = value
        else delete copy[filmId]
        return copy
      })
      setError(null)

      try {
        const filmRef = doc(db, 'statuses', filmId)
        if (value) {
          await setDoc(filmRef, {
            status: value,
            updatedAt: serverTimestamp(),
          })
        } else {
          await deleteDoc(filmRef)
        }
      } catch {
        setStatuses(previous)
        setError('Не получилось сохранить. Попробуйте ещё раз.')
      }
    },
    [statuses],
  )

  return { statuses, setStatus, ready, error }
}
