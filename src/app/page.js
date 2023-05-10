'use client'
import {
  chordParserFactory,
  chordRendererFactory
} from 'chord-symbol/lib/chord-symbol.js' // bundled version
import { useEffect, useRef, useState } from 'react'
import { allNotes } from './notes'

export default function Home () {
  const [chord, setChord] = useState('Cmaj')
  const [speed, setSpeed] = useState(1) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const modeName = simpleMode ? 'Simple Notation' : 'Academic Notation'
  const [chordQueue, setChordQueue] = useState([])
  // console.log('Home rendering, chordQueue: ' + chordQueue)

  useEffect(() => {
    let safeSpeed = speed
    if (safeSpeed < 0.1) {
      safeSpeed = 1
    }
    const interval = setInterval(() => {
      // const randomChord = getRandomChord({ simpleMode })
      // setChord(randomChord)
      // dequeue
      // const head = chordQueue.shift()
      // console.log('queue head: ' + head)
      makeNextChordAsShowen(chordQueue)
      if (checkIfAllChordsIsShowen(chordQueue)) {
        setChordQueue(getTenRamdonChordsWithState({ simpleMode }))
      } else {
        setChordQueue([...chordQueue])
      }
    }, safeSpeed * 1000)
    return () => clearInterval(interval)
  }, [speed, simpleMode, chordQueue])

  function onSpeedChange (e) {
    if (isNaN(e.target.value)) {
      return
    }
    setSpeed(e.target.value)
  }

  return (
    <div className='' >
      {/* todo adapting to mobile device */}
      <div className='h-screen w-screen overflow-hidden flex flex-col justify-center items-center'>
        <div className='flex relative w-[400px] h-[170px] max-sm:scale-75'>
          {
            chordQueue.map((chordWithState, index) => {
              const translateStr = chordWithState.showen ? '200px -200px' : '0px 0px'
              return (
                <div key={index} className='rounded-lg text-center text-9xl absolute bg-white border-2 border-black
                w-[400px] h-[160px] p-2
                ' style={{
                  left: `${index * 5}px`,
                  bottom: `${index * 5}px`,
                  opacity: chordWithState.showen ? 0 : 1,
                  transitionDuration: '400ms',
                  translate: translateStr
                }}>
                  {chordWithState.chord}
                </div>
              )
            })
          }
        </div>
        <div className='flex items-center m-3'>
          <span>Speed:&nbsp;</span>
          <input className='h-9 p-2 border-2' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
        </div>
        <button className='bg-black text-white rounded-lg w-48 h-16' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
      </div>
    </div>
  )
}

function makeNextChordAsShowen (chordList) {
  for (let i = chordList.length - 1; i >= 0; i--) {
    if (!chordList[i].showen) {
      chordList[i].showen = true
      return
    }
  }
}

function checkIfAllChordsIsShowen (chordList) {
  for (let i = 0; i < chordList.length; i++) {
    if (!chordList[i].showen) {
      return false
    }
  }
  return true
}

function getTenRamdonChordsWithState ({ simpleMode }) {
  const result = []
  for (let i = 0; i < 10; i++) {
    result.push({
      chord: getRandomChord({ simpleMode }),
      showen: false
    })
  }
  return result
}

// get a random chord
function getRandomChord ({ simpleMode }) {
  // console.log("getRandomChord simpleMode:"+ simpleMode)
  const chordNotations = buillAllChordsNotation({ simpleMode })

  const randomIndex = Math.floor(Math.random() * chordNotations.length)
  return chordNotations[randomIndex]
}

function buillAllChordsNotation ({ simpleMode }) {
  // console.log("buillAllChordsNotation simpleMode:" + simpleMode)
  // const parseChord = chordParserFactory();
  // const renderChord = chordRendererFactory({ useShortNamings: true });
  // console.log(renderChord(parseChord("Dbdim")))

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
