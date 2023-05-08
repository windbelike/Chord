
import {
	chordParserFactory,
	chordRendererFactory,
} from 'chord-symbol/lib/chord-symbol.js'; // bundled version




export default function Home() {
  
  let chordNotations = buillAllChordsNotation();
  return (
    <>
      {JSON.stringify(chordNotations)}
    </>
   
  )

  
}

function buillAllChordsNotation() {
  const parseChord = chordParserFactory();
  const renderChord = chordRendererFactory({ useShortNamings: false });
    
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

  const qualities = ['ma', 'mi', 'aug', 'dim']
  let chordNotations = [];

  for (let note in notes) {
    for (let quality of qualities) {
      let n = notes[note];
      const chord = parseChord(`${n}${quality}`);
      chordNotations.push(renderChord(chord));
    }
  }
  return chordNotations;
}