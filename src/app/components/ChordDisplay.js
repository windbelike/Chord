'use client'
import { useEffect, useRef, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight, AiOutlinePause, AiOutlinePlayCircle } from 'react-icons/ai'
import { getRandomChord } from '../utils/chordUtils'
import { natualMajorScaleChordOption } from '../utils/notes'

const chordQueueMaxLen = 10
const minSpeedSec = 0.1
const maxSpeedSec = 10000
const safeSpeedSec = 1
const defaultChord = 'Cmaj'
const initChordIn = 'Any'

export default function ChordDisplay () {
  const [speed, setSpeed] = useState(1) // speed by seconds
  const [currChordIndex, setCurrChordIndex] = useState(0) // current chord index
  const [pause, setPause] = useState(false) // pause status
  const [chordQueue, setChordQueue] = useState([defaultChord])
  // chord options
  const [chordIn, setchordIn] = useState(initChordIn)
  const [openChordMenu, setOpenChordMenu] = useState(false)
  const chordOptionList = [initChordIn, ...Object.keys(natualMajorScaleChordOption)]

  const chord = useChord({ speed, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue, chordIn })

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

  function onClickOpenChordMenu () {
    setOpenChordMenu(!openChordMenu)
  }

  return (
    <div className='bg-amber-50' >
      {/* todo adapting to mobile device */}
      {/* Chord screen */}
      <div className='h-screen w-screen overflow-hidden flex flex-col justify-center items-center'>
        <div className='rounded-lg text-9xl flex items-center justify-center
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
        {/* Chord Option Munu */}
        <div className='mt-10 flex flex-col items-center'>
          <button className='w-[350px] text-xl hover:bg-gray-600 font-thin text-gray-300 bg-black rounded-lg p-2' onClick={onClickOpenChordMenu} >Chords In <span className='text-white font-bold'>{chordIn}</span> {chordIn == initChordIn ? 'Scale' : 'Natual Major Scale'} <span className='font-bold'>∨</span></button>
          {openChordMenu &&
          <ul className='w-[350px] rounded-lg bg-black columns-3'>
            {chordOptionList.map(k => {
              return <ChordOption key={k} root={k} chordIn={chordIn} setchordIn={setchordIn} setOpenChordMenu={setOpenChordMenu} />
            })}
          </ul>
          }
          <div className='m-4 w-[400px] text-lg break-words font-bold text-center'>
            {chordIn != initChordIn && 'Candidates: ' + natualMajorScaleChordOption[chordIn]}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChordOption ({ chordIn, setchordIn, root, setOpenChordMenu }) {
  function onClickChordOption () {
    setchordIn(root)
    setOpenChordMenu(false)
  }
  return (
    <>
      <li onClick={onClickChordOption} className={'hover:cursor-pointer text-white text-center text-2xl hover:bg-gray-600 rounded-lg' + (root === chordIn ? ' bg-gray-600' : '')}>
        {root}
      </li>
    </>
  )
}

// doing timemachine stuff
function isInTimemachineState (currChordIndex, chordQueue) {
  return currChordIndex < chordQueue.length - 1
}

function useChord ({ speed, currChordIndex, setCurrChordIndex, pause, chordQueue, setChordQueue, chordIn }) {
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
      let nextChord = getRandomChord({ simpleMode: false, chordIn })
      const currChord = chordQueue[safeChordIndex]
      // prevent same chord
      while (nextChord === currChord) {
        nextChord = getRandomChord({ simpleMode: false, chordIn })
      }
      chordQueue.push(nextChord)
      if (chordQueue.length > chordQueueMaxLen) {
        chordQueue.shift()
      }
      setChordQueue([...chordQueue])
      setCurrChordIndex(chordQueue.length - 1)
    }, speed * 1000)
    return () => clearInterval(interval)
  }, [speed, chordQueue, safeChordIndex, pause])

  return chordQueue[safeChordIndex]
}
