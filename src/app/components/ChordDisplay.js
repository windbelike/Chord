'use client'
import { useEffect, useRef, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight, AiOutlinePause, AiOutlinePlayCircle } from 'react-icons/ai'
import { getRandomChord } from '../utils/chordUtils'

const chordQueueMaxLen = 10
const minSpeedSec = 0.1
const maxSpeedSec = 10000
const safeSpeedSec = 1
const defaultChord = 'Cmaj'

export default function ChordDisplay () {
  const [speed, setSpeed] = useState(1) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const [currChordIndex, setCurrChordIndex] = useState(0) // current chord index
  const [pause, setPause] = useState(false) // pause status
  const [chordQueue, setChordQueue] = useState([defaultChord])
  const modeName = simpleMode ? 'Simple' : 'Academic'
  const [allRootsMode, setAllRootsMode] = useState(true)
  const roots = allRootsMode ? 'AllRoots' : 'CMajorRoots'

  const chord = useChord({ speed, simpleMode, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue, roots })

  function isLeftDisabled () {
    return currChordIndex <= 0
  }

  function isRightDisabled () {
    return currChordIndex >= chordQueue.length - 1
  }

  function buttonDiabledColor (disabled) {
    return disabled ? 'text-gray-400' : ''
  }

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
    <div className='bg-stone-500' >
      {/* todo adapting to mobile device */}
      {/* Chord screen */}
      <div className='h-screen w-screen overflow-hidden flex flex-col justify-center items-center'>
        <div className='rounded-lg text-9xl flex items-center justify-center grow-0
                w-[400px] h-[200px]'>
          {(chord[1] == '♯' || chord[1] == '♭')
            ? <div>
              {chord[0]}
              <span className="align-super">{chord[1]}
              </span>
              {chord.slice(2)}
            </div>
            : chord }
        </div>
        {/* Timemachine button */}
        <div className='flex mt-8 space-x-8' >
          <button disabled={isLeftDisabled()} onClick={onClickLeft} className={' rounded-lg  ' + buttonDiabledColor(isLeftDisabled())}>
            <AiFillCaretLeft style={{ fontSize: '90px' }} />
          </button>
          <button onClick={onClickPause} className=''>
            {pause ? <AiOutlinePlayCircle style={{ fontSize: '90px' }} /> : <AiOutlinePause style={{ fontSize: '90px' }} />}
          </button>
          <button disabled={isRightDisabled()} onClick={onClickRight} className={' rounded-lg  ' + buttonDiabledColor(isRightDisabled())}>
            <AiFillCaretRight style={{ fontSize: '90px' }} />
          </button>
        </div>
        {/* Functional button */}
        <div className='flex items-center mt-10 font-bold'>
          <span>Speed:&nbsp;</span>
          <input className='rounded-lg h-9 p-2 border-2 bg-slate-200' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
        </div>
        <div className='mt-10 flex space-x-3'>
          <button className=' text-white bg-black rounded-lg w-28 h-14' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
          <button className=' text-white bg-black rounded-lg w-28 h-14' onClick={() => setAllRootsMode(!allRootsMode)}>{roots}</button>
        </div>
        {/* <dialog id="rootDialog" className='p-0 w-64 rounded-lg'>
          <div className=' bg-stone-600 flex flex-col h-full p-4 space-y-5'>
            <button className='text-xl font-bold hover:bg-slate-200'>All</button>
            <button className='text-xl font-bold'>Root In C Major Scale</button>
            <button className='text-xl font-bold'>Root In G Major Scale</button>
          </div>
        </dialog> */}
      </div>
    </div>
  )
}

// doing timemachine stuff
function isInTimemachineState (currChordIndex, chordQueue) {
  return currChordIndex < chordQueue.length - 1
}

function useChord ({ speed, simpleMode, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue, roots }) {
  let safeChordIndex = currChordIndex
  if (currChordIndex >= chordQueue.length) {
    safeChordIndex = chordQueue.length - 1
  } else if (currChordIndex < 0) {
    safeChordIndex = 0
  }

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
      const currentChord = getRandomChord({ simpleMode, roots })
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
