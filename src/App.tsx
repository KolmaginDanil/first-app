import {
  IonApp, IonGrid, IonContent,
} from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import React, { useCallback, useEffect, useState } from 'react'
import { UserHeader } from './components/UserHeader'
import { FreeDays } from './components/FreeDays'
import { FreeHours } from './components/FreeHours'
import { useDispatch, useSelector } from 'react-redux'
import { changeFullySelectedTime } from './redux/signReducer'
import { getFullySelectedTime } from './redux/signSelector'
import { nextConsultation } from './common/functions'
import { get } from './firebase/firebase'
import './App.css'
import { BottomButton } from './components/BottomButton'


const App: React.FC = () => {
  const [curTime] = useState(new Date())
  // it will change when user taps on some day or hour
  const [selectedTime, setSelectedTime] = useState(
    () => nextConsultation(curTime)[0],
  )
  // it will change when user taps on SIGN UP FOR A FREE MEETING
  const fullySelectedTime = useSelector(getFullySelectedTime)
  const dispatch = useDispatch()
  const setTime = useCallback((newDate) =>
    dispatch(changeFullySelectedTime(newDate)), [dispatch])

  useEffect(() => {
    get().then(newDate => {
      setSelectedTime(new Date(newDate))
      setTime(newDate)
    })
  }, [setTime])

  return <IonApp className='App'>
    <IonContent>
      <IonGrid>
        <UserHeader />
        <FreeDays {...{ selectedTime, curTime, setSelectedTime }} />
        <FreeHours {...{ selectedTime, curTime, setSelectedTime }} />
        <BottomButton {...{ selectedTime, fullySelectedTime, dispatch }} />
      </IonGrid>
    </IonContent>
  </IonApp>
}

export default App
