import React, { useState, useRef } from 'react'
import audio from '../audio/alarm.mp3'

function Alarm() {
  const [playing, setPlaying] = useState(false)
  const alarm = useRef(new Audio(audio))
  
  const handleClick = () => {
    setPlaying(prev => !prev)
    if(!playing) alarm.current.play()
    else alarm.current.pause()
  }

  return (
    <div className="alarm">
      <select name="alarm">
        <option>Yuyake Koyake</option>
      </select>
      <button onClick={() => handleClick()}>
        {playing ? 'pause' : 'play'}</button>
    </div>
  )
}

export default Alarm