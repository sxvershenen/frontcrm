import type { Location, NavigateOptions, To } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom"

export type BackgroundLocationState = {
  backgroundLocation?: Location
  backgroundScrollY?: number
}

export function getBackgroundLocationState(
  state: unknown,
): BackgroundLocationState | undefined {
  if (!state || typeof state !== "object") {
    return undefined
  }

  return state as BackgroundLocationState
}

export function createBackgroundLocationState(
  location: Location,
): BackgroundLocationState {
  return {
    backgroundLocation: location,
    backgroundScrollY: window.scrollY,
  }
}

export function useBackgroundNavigate() {
  const navigate = useNavigate()
  const location = useLocation()

  return (to: To, options: NavigateOptions = {}) => {
    const suppliedState =
      options.state && typeof options.state === "object" ? options.state : {}

    navigate(to, {
      ...options,
      state: {
        ...suppliedState,
        ...createBackgroundLocationState(location),
      },
    })
  }
}
