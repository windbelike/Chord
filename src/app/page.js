'use client'
import { useEffect, useRef, useState } from 'react'
import { allNotes } from './notes'
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'

const chordQueueMaxLen = 10
const minSpeedSec = 0.1
const maxSpeedSec = 10000
const safeSpeedSec = 1
const defaultChord = 'Cmaj'

export default function Home () {
  const [speed, setSpeed] = useState(2) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const [currChordIndex, setCurrChordIndex] = useState(0) // current chord index
  const modeName = simpleMode ? 'Simple' : 'Academic'

  const chord = useChord(speed, simpleMode, currChordIndex, setCurrChordIndex)

  function onSpeedChange (e) {
    if (isNaN(e.target.value)) {
      return
    }
    setSpeed(e.target.value)
  }

  function onClickLeft () {
    setCurrChordIndex(currChordIndex - 1)
  }

  function onClickRight () {
    setCurrChordIndex(currChordIndex + 1)
  }

  return (
    <div className='' >
      {/* todo adapting to mobile device */}
      {/* Chord screen */}
      <div className='h-screen w-screen overflow-hidden flex flex-col justify-center items-center'>
        <div className='rounded-lg text-center text-9xl bg-white
                w-[400px] h-[160px] p-2'>
          {chord}
        </div>
        {/* Timemachine button */}
        <div className='flex mt-8 space-x-8' >
          <button onClick={onClickLeft} className='hover:bg-gray-200 rounded-lg active:bg-gray-300'>
            <CaretLeftFilled style={{ fontSize: '56px' }} />
          </button>
          <button onClick={onClickRight} className='hover:bg-gray-200 rounded-lg active:bg-gray-300'>
            <CaretRightFilled style={{ fontSize: '56px' }} />
          </button>
        </div>
        {/* Functional button */}
        <div className='flex items-center m-3'>
          <span>Speed:&nbsp;</span>
          <input className='h-9 p-2 border-2' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
          <button className='ml-5 bg-black text-white rounded-lg w-28 h-10' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
        </div>
      </div>
    </div>
  )
}

function useChord (speed, simpleMode, currChordIndex, setCurrChordIndex) {
  const [chordQueue, setChordQueue] = useState([defaultChord])
  console.log('chordQueue', JSON.stringify(chordQueue))
  let safeChordIndex = currChordIndex
  if (currChordIndex >= chordQueue.length) {
    safeChordIndex = chordQueue.length - 1
  } else if (currChordIndex < 0) {
    safeChordIndex = 0
  }
  console.log('safeChordIndex:', safeChordIndex)
  console.log('currChordIndex:', currChordIndex)

  useEffect(() => {
    setCurrChordIndex(safeChordIndex)
  }, [currChordIndex])

  useEffect(() => {
    if (speed < minSpeedSec) {
      speed = safeSpeedSec
    }
    if (speed >= maxSpeedSec) {
      speed = maxSpeedSec
    }
    // if safeChordIndex is on timemachine state, no interval
    if (safeChordIndex != chordQueue.length - 1) {
      return
    }
    const interval = setInterval(() => {
      const currentChord = getRandomChord({ simpleMode })
      chordQueue.push(currentChord)
      if (chordQueue.length > chordQueueMaxLen) {
        chordQueue.shift()
      }
      setChordQueue([...chordQueue])
      setCurrChordIndex(chordQueue.length - 1)
    }, speed * 1000)
    return () => clearInterval(interval)
  }, [speed, simpleMode, chordQueue, safeChordIndex])

  return chordQueue[safeChordIndex]
}

// get a random chord
function getRandomChord ({ simpleMode }) {
  const chordNotations = buillAllChordsNotation({ simpleMode })

  const randomIndex = Math.floor(Math.random() * chordNotations.length)
  return chordNotations[randomIndex]
}

function buillAllChordsNotation ({ simpleMode }) {
  const academicQualities = ['maj', 'min', 'aug', 'dim']
  const simpleQualities = ['', '-', '+', '°']
  const qualities = simpleMode ? simpleQualities : academicQualities
  const chordNotations = []

  for (const note in allNotes) {
    for (const quality of qualities) {
      const n = allNotes[note]
      // const chord = parseChord(`${n}${quality}`);
      // chordNotations.push(renderChord(chord));
      chordNotations.push(`${n}${quality}`)
    }
  }
  return chordNotations
}
