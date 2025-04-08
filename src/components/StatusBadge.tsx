import { FaCheckCircle, FaExclamationCircle, FaClock, FaBan, FaQuestionCircle } from 'react-icons/fa'
import { staticClasses } from '@decky/ui'
import { useGameStatus, GameStatusType } from '../hooks/useGameStatus'
import { useEffect, useState } from 'react'
import useAppId from '../hooks/useAppId'

const statusColors = {
  [GameStatusType.SUPPORTED]: {
    bg: '#2e7d32',
    text: '#ffffff',
    icon: FaCheckCircle,
  },
  [GameStatusType.RUNNING]: {
    bg: '#0288d1',
    text: '#ffffff',
    icon: FaCheckCircle,
  },
  [GameStatusType.PLANNED]: {
    bg: '#ed6c02',
    text: '#ffffff',
    icon: FaClock,
  },
  [GameStatusType.BROKEN]: {
    bg: '#d32f2f',
    text: '#ffffff',
    icon: FaExclamationCircle,
  },
  [GameStatusType.DENIED]: {
    bg: '#9e9e9e',
    text: '#ffffff',
    icon: FaBan,
  },
  [GameStatusType.UNKNOWN]: {
    bg: '#616161',
    text: '#ffffff',
    icon: FaQuestionCircle,
  },
}

export default function StatusBadge() {
  const status = useGameStatus() || GameStatusType.UNKNOWN
  const { bg, text, icon: Icon } = statusColors[status]

  const [appName, setAppName] = useState('')
  useEffect(() => {
    async function getGameName() {
      const appId = useAppId()

      // @ts-ignore
      const appDetails = await window.SteamClient.Apps.GetAppOverviewByGameID(appId)
      setAppName(appDetails.display_name)
    }
    getGameName()
  }, [])

  return (
    <div
      className={staticClasses.Title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: bg,
        color: text,
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      <Icon size={16} />
      <span>{status} {appName || 'not found'}</span>
    </div>
  )
}
