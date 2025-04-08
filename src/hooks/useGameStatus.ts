import { useEffect, useState } from 'react'
import useAppId from './useAppId'
import games from '../data/games.json'

export const GameStatusType = {
  SUPPORTED: 'Supported',
  RUNNING: 'Running',
  PLANNED: 'Planned',
  BROKEN: 'Broken',
  DENIED: 'Denied',
  UNKNOWN: 'Unknown'
} as const

type GameStatusType = typeof GameStatusType[keyof typeof GameStatusType]

export function useGameStatus(): GameStatusType | null {
  const [gameStatus, setGameStatus] = useState<GameStatusType | null>(null)
  const appId = useAppId()

  useEffect(() => {
    if (!appId) return

    async function getGameStatus() {
      try {
        // First try to find by Steam ID
        const gameBySteamId = Object.values(games).find(game => {
          const steamId = game.storeIds?.steam
          if (!steamId) return false
          const numericSteamId = Number(steamId)
          return !isNaN(numericSteamId) && numericSteamId === appId
        })

        if (gameBySteamId) {
          setGameStatus(gameBySteamId.status as GameStatusType)
          return
        }

        // If not found by Steam ID, try to get the game name from Steam
        // @ts-ignore
        const appDetails = await window.SteamClient.Apps.GetAppOverviewByGameID(appId)
        if (!appDetails?.display_name) {
          setGameStatus(GameStatusType.UNKNOWN)
          return
        }

        // Search by game name
        const gameByName = Object.values(games).find(game => 
          game.name.toLowerCase() === appDetails.display_name.toLowerCase()
        )

        if (gameByName) {
          setGameStatus(gameByName.status as GameStatusType)
        } else {
          setGameStatus(GameStatusType.UNKNOWN)
        }
      } catch (error) {
        console.error('Failed to get game status:', error)
        setGameStatus(GameStatusType.UNKNOWN)
      }
    }

    getGameStatus()
  }, [appId])

  return gameStatus
} 