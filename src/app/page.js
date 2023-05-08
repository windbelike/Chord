"use client"
import {
	chordParserFactory,
	chordRendererFactory,
} from 'chord-symbol/lib/chord-symbol.js'; // bundled version
import { useEffect, useRef, useState } from 'react';



export default function Home() {
  const [chord, setChord] = useState('No Chord')
  const [speed, setSpeed] = useState(1) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  let modeName = simpleMode ? 'Simple Notation' : 'Academic Notation'

  useEffect(() => {
    let safeSpeed = speed
    if (safeSpeed < 0.1) {
      safeSpeed = 1
    }
    const interval = setInterval(() => {
      setChord(getRandomChord({simpleMode: simpleMode}))
    }, safeSpeed * 1000);
    return () => clearInterval(interval)
  }, [speed, simpleMode])

  function onSpeedChange(e) {
    if (isNaN(e.target.value)) {
      return
    }
    setSpeed(e.target.value)
  }

  return (
    <div className='' >
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='flex'>
          <div className='text-9xl'>
            {chord}
          </div>
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

// get a random chord
function getRandomChord({simpleMode}) {
  console.log("getRandomChord simpleMode:"+ simpleMode)
  const chordNotations = buillAllChordsNotation({simpleMode});

  let randomIndex = Math.floor(Math.random() * chordNotations.length);
  return chordNotations[randomIndex];
}
function buillAllChordsNotation({simpleMode}) {
  console.log("buillAllChordsNotation simpleMode:" + simpleMode)
  // const parseChord = chordParserFactory();
  // const renderChord = chordRendererFactory({ useShortNamings: false });
    
  const notes = {
    AFlat: 'A♭',
    A: 'A',
    ASharp: 'A#',
    BFlat: 'B♭',
    B: 'B',
    C: 'C',
    CSharp: 'C#',
    DFlat: 'D♭',
    D: 'D',
    DSharp: 'D#',
    EFlat: 'E♭',
    E: 'E',
    F: 'F',
    FSharp: 'F#',
    GFlat: 'G♭',
    G: 'G',
    GSharp: 'G#',
  };

  const academicQualities = ['maj', 'min', 'aug', 'dim']
  const simpleQualities = ['', 'm', '+', 'dim']
  const qualities = simpleMode ? simpleQualities : academicQualities
  let chordNotations = [];

  for (let note in notes) {
    for (let quality of qualities) {
      let n = notes[note];
      // const chord = parseChord(`${n}${quality}`);
      // chordNotations.push(renderChord(chord));
      chordNotations.push(`${n}${quality}`)
    }
  }
  return chordNotations;
}