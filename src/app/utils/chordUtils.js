const { rootsSelection, allNotes, natualMajorScaleChordOption } = require('./notes')

// get a random chord
export function getRandomChord ({ simpleMode, chordIn }) {
  let chordList = []
  if (chordIn == 'Any') {
    chordList = buillAllChordsNotation({ simpleMode })
  } else {
    // chord in natual major scale mode
    chordList = natualMajorScaleChordOption[chordIn]
  }

  const randomIndex = Math.floor(Math.random() * chordList.length)
  return chordList[randomIndex]
}

const academicQualities = ['maj', 'min', 'aug', 'dim']
const simpleQualities = ['', '-', '+', '°']

function buillAllChordsNotation ({ simpleMode }) {
  const qualities = simpleMode ? simpleQualities : academicQualities
  const chordList = []

  for (const note in allNotes) {
    for (const quality of qualities) {
      chordList.push(`${allNotes[note]}${quality}`)
    }
  }
  return chordList
}
