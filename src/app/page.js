'use client'
import { useEffect, useRef, useState } from 'react'
import { allNotes } from './notes'
import { AiFillCaretLeft, AiFillCaretRight, AiOutlinePause, AiOutlinePlayCircle } from 'react-icons/ai'

const chordQueueMaxLen = 10
const minSpeedSec = 0.1
const maxSpeedSec = 10000
const safeSpeedSec = 1
const defaultChord = 'Cmaj'

export default function Home () {
  const [speed, setSpeed] = useState(2) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const [currChordIndex, setCurrChordIndex] = useState(0) // current chord index
  const [pause, setPause] = useState(false) // pause status
  const [chordQueue, setChordQueue] = useState([defaultChord])
  const modeName = simpleMode ? 'Simple' : 'Academic'

  const chord = useChord({ speed, simpleMode, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue })

  function onSpeedChange (e) {
    if (isNaN(e.target.value)) {
      return
    }
    setSpeed(e.target.value)
  }

  function onClickPause () {
    setPause(!pause)
  }

  function onClickLeft () {
    setPause(true)
    setCurrChordIndex(currChordIndex - 1)
  }

  function onClickRight () {
    setCurrChordIndex(currChordIndex + 1)
  }

  return (
    <div className='bg-slate-200' >
      {/* todo adapting to mobile device */}
      {/* Chord screen */}
      <div className='h-screen w-screen overflow-hidden flex flex-col justify-center items-center'>
        <div className='rounded-lg text-center text-9xl
                w-[400px] h-[160px]'>
          {chord}
        </div>
        {/* Timemachine button */}
        <div className='flex mt-8 space-x-8' >
          <button onClick={onClickLeft} className='hover:bg-gray-200 rounded-lg active:bg-gray-300'>
            <AiFillCaretLeft style={{ fontSize: '90px' }} />
          </button>
          <button onClick={onClickPause} className=''>
            {pause ? <AiOutlinePlayCircle style={{ fontSize: '90px' }} /> : <AiOutlinePause style={{ fontSize: '90px' }} />}
          </button>
          <button onClick={onClickRight} className='hover:bg-gray-200 rounded-lg active:bg-gray-300'>
            <AiFillCaretRight style={{ fontSize: '90px' }} />
          </button>
        </div>
        {/* Functional button */}
        <div className='flex items-center mt-10 font-bold'>
          <span>Speed:&nbsp;</span>
          <input className='h-9 p-2 border-2 bg-slate-200' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
        </div>
        <button className='mt-10 text-white bg-black rounded-lg w-28 h-14' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
      </div>
    </div>
  )
}

// doing timemachine stuff
function isInTimemachineState (currChordIndex, chordQueue) {
  return currChordIndex < chordQueue.length - 1
}

function useChord ({ speed, simpleMode, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue }) {
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
    // if pause, no need interval
    if (pause) {
      return
    }
    // if safeChordIndex is in timemachine state and hitting playing, need interval with existed chordQueue
    if (isInTimemachineState(safeChordIndex, chordQueue) && !pause) {
      const interval = setInterval(() => {
        setCurrChordIndex(safeChordIndex + 1)
      }, speed * 1000)
      return () => clearInterval(interval)
    }
    // if safeChordIndex is in timemachine state, no need interval
    if (isInTimemachineState(safeChordIndex, chordQueue)) {
      return
    }
    // normal chord carousel state
    if (speed < minSpeedSec) {
      speed = safeSpeedSec
    }
    if (speed >= maxSpeedSec) {
      speed = maxSpeedSec
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
  }, [speed, simpleMode, chordQueue, safeChordIndex, pause])

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
