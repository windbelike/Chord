const { rootsSelection, allNotes } = require('./notes')

// get a random chord
export function getRandomChord ({ simpleMode, roots }) {
  const chordNotations = buillAllChordsNotation({ simpleMode, roots })

  const randomIndex = Math.floor(Math.random() * chordNotations.length)
  return chordNotations[randomIndex]
}

const academicQualities = ['maj', 'min', 'aug', 'dim']
const simpleQualities = ['', '-', '+', '°']

function buillAllChordsNotation ({ simpleMode, roots }) {
  const qualities = simpleMode ? simpleQualities : academicQualities
  const chordNotations = []

  let notes = rootsSelection[roots]
  if (notes == null) {
    notes = allNotes
  }

  for (const note in notes) {
    for (const quality of qualities) {
      const n = notes[note]
      // const chord = parseChord(`${n}${quality}`);
      // chordNotations.push(renderChord(chord));
      chordNotations.push(`${n}${quality}`)
    }
  }
  return chordNotations
}
