import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { getBackgroundLocationState } from "@/app/navigation/background-location"

const STORAGE_PREFIX = "svistoplyasovo-crm:scroll:"

export function getScrollContextKey(pathname: string, search: string) {
  return `${STORAGE_PREFIX}${pathname}${search}`
}

export function useBasicScrollContext() {
  const location = useLocation()

  useEffect(() => {
    const storageKey = getScrollContextKey(location.pathname, location.search)
    const locationState = getBackgroundLocationState(location.state)
    const storedScrollY = Number(sessionStorage.getItem(storageKey) ?? 0)
    const initialScrollY = locationState?.backgroundScrollY ?? storedScrollY
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: initialScrollY, behavior: "auto" })
    })

    let scheduledFrame = 0
    const persistScroll = () => {
      if (scheduledFrame) {
        return
      }

      scheduledFrame = window.requestAnimationFrame(() => {
        sessionStorage.setItem(storageKey, String(window.scrollY))
        scheduledFrame = 0
      })
    }

    window.addEventListener("scroll", persistScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      if (scheduledFrame) {
        window.cancelAnimationFrame(scheduledFrame)
      }
      sessionStorage.setItem(storageKey, String(window.scrollY))
      window.removeEventListener("scroll", persistScroll)
    }
  }, [location.key, location.pathname, location.search, location.state])
}
