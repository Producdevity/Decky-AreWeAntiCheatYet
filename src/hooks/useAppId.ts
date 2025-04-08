import { useParams } from "@decky/ui"
// import { useState } from "react"
// import appTypes from "../constants/appTypes"

function useAppId(): number | null {
  // const [appId, setAppId] = useState<string>()
  const { appid } = useParams<{ appid: string }>()

  return appid ? parseInt(appid) : null 
  // const appDetails = SteamClient.Apps.GetAppOverviewByGameID(parseInt(pathId))
  // const appDetails = appStore.GetAppOverviewByGameID(parseInt(pathId))
  // const isSteamGame = Boolean(
  //   appTypes[appDetails?.app_type as keyof typeof appTypes]
  // )
  // return isSteamGame ? appId : null
}

export default useAppId