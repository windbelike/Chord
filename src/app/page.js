'use client'
import { useEffect, useRef, useState } from 'react'
import { allNotes } from './notes'
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'

export default function Home () {
  const [chord, setChord] = useState('Cmaj')
  const [speed, setSpeed] = useState(2) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const modeName = simpleMode ? 'Simple' : 'Academic'
  const [chordQueue, setChordQueue] = useState(['Cmaj'])
  console.log('chordQueue:' + JSON.stringify(chordQueue))

  useEffect(() => {
    let safeSpeed = speed
    if (safeSpeed < 0.1) {
      safeSpeed = 1
    }
    const interval = setInterval(() => {
      const currentChord = getRandomChord({ simpleMode })
      chordQueue.push(currentChord)
      if (chordQueue.length > 10) {
        chordQueue.shift()
      }
      setChord(currentChord)
      setChordQueue([...chordQueue])
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
        <div className='rounded-lg text-center text-9xl bg-white
                w-[400px] h-[160px] p-2'>
          {chord}
        </div>
        <div className='flex mt-8'>
          <button>
            <CaretLeftFilled className="hover:bg-gray-200 rounded-lg" style={{ fontSize: '56px' }} />
          </button>
          <button>
            <CaretRightFilled className=" hover:bg-gray-200 rounded-lg" style={{ fontSize: '56px' }} />
          </button>
        </div>
        <div className='flex items-center m-3'>
          <span>Speed:&nbsp;</span>
          <input className='h-9 p-2 border-2' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
          <button className='ml-5 bg-black text-white rounded-lg w-28 h-12' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
        </div>
      </div>
    </div>
  )
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
