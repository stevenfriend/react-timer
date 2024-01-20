import React, { useState, useEffect, useRef } from 'react'
import Digit from './Digit'
import audio from '../audio/alarm.mp3'

function Timer() {
  const [time, setTime] = useState(0)
  const [enabled, setEnabled] = useState(false)
  const [running, setRunning] = useState(false)
  const [initialTime, setInitialTime] = useState(0)
  const [digits, setDigits] = useState('000000')
  const max = 360000
  const alarm = useRef(new Audio(audio))

  useEffect(() => {
    let id
    if(running) {
      id = setInterval(() => setTime(prev => --prev), 1000)
    }
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if(time === 0) {
      if(initialTime !== 0 ) alarm.current.play()
      setEnabled(false)  
    } else if(time < 0) {
      setRunning(false)
      setTime(initialTime)
      setInitialTime(0)
    }else setEnabled(true) 
    setDigits(parseTime(time))
  }, [time, initialTime, alarm])

  const handleClick = (diff) => {
    setTime(prev => { 
      let newTime = (prev + diff) % max
      if(newTime < 0) newTime += max
      return newTime
    })
  }

  const parseTime = time => {
    const hours = Math.floor(time / (60 * 60))
    const minutes = Math.floor((time % (60 * 60)) / 60)
    const seconds = Math.floor((time % (60 * 60) % 60))
    const pad = (num) => { return `${num}`.padStart(2, '0') }
    return `${pad(hours)}${pad(minutes)}${pad(seconds)}`
  }
  
  const handleReset = () => {
    console.log('reset was called')
    if(initialTime === 0) {
      setTime(0)
      setEnabled(false)
    } else {
      setRunning(false)
      setTime(initialTime)
      setInitialTime(0)
    }
  }

  const handleStart = () => {
    if(enabled) {
      setRunning(prev => !prev)
      if(initialTime === 0) setInitialTime(time)
    }
  }

  return (
    <div className='timer'>
      <button className={`
          timer-controls
          ${enabled ? 'enabled' : 'disabled'}
          ${initialTime !== 0 ? 'stop' : 'reset'}
        `} 
        onClick={() => handleReset()}
      >{ initialTime !== 0 ? 'Stop' : 'Reset' }</button>
      <Digit value={digits[0]} diff={36000} handleClick={handleClick} editable={!running}/>
      <Digit value={digits[1]} diff={3600} handleClick={handleClick} editable={!running}/>
      :
      <Digit value={digits[2]} diff={600} handleClick={handleClick} editable={!running}/>
      <Digit value={digits[3]} diff={60} handleClick={handleClick} editable={!running}/>
      :
      <Digit value={digits[4]} diff={10} handleClick={handleClick} editable={!running}/>
      <Digit value={digits[5]} diff={1} handleClick={handleClick} editable={!running}/>
      <button className={`
        timer-controls 
        ${enabled ? 'enabled' : 'disabled'}
        ${running ? 'pause' : 'start'}
        `}  
        onClick={() => handleStart()}
      >{running ? 'Pause' : 'Start' }</button>
    </div>
  )
}

export default Timer