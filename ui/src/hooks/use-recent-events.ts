import { useEffect, useState } from 'react'

const STORAGE_KEY = 'snaphouse_recent_events'
const MAX_RECENT_EVENTS = 5

export interface RecentEvent {
  id: string
  name: string
  url: string
  timestamp: number
}

export function useRecentEvents() {
  const [events, setEvents] = useState<RecentEvent[]>([])

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as RecentEvent[]
        setEvents(parsed)
      }
    } catch (error) {
      console.error('Failed to load recent events:', error)
    }
  }, [])

  const addRecentEvent = (event: Omit<RecentEvent, 'timestamp'>) => {
    setEvents((prev) => {
      // Check if event already exists
      const existingIndex = prev.findIndex((e) => e.id === event.id)

      let updated: RecentEvent[]

      if (existingIndex !== -1) {
        // Move existing event to top with updated timestamp
        const existing = prev[existingIndex]
        updated = [
          { ...existing, timestamp: Date.now() },
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ]
      } else {
        // Add new event to top
        updated = [{ ...event, timestamp: Date.now() }, ...prev]
      }

      // Keep only the most recent MAX_RECENT_EVENTS
      updated = updated.slice(0, MAX_RECENT_EVENTS)

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save recent events:', error)
      }

      return updated
    })
  }

  const removeRecentEvent = (id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id)

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save recent events:', error)
      }

      return updated
    })
  }

  const clearRecentEvents = () => {
    setEvents([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear recent events:', error)
    }
  }

  return {
    events,
    addRecentEvent,
    removeRecentEvent,
    clearRecentEvents,
  }
}
