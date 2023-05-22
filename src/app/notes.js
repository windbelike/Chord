
const aNotes = {
  AFlat: 'A♭',
  A: 'A',
  ASharp: 'A♯'
}

const bNotes = {
  BFlat: 'B♭',
  B: 'B'
}

const cNotes = {
  C: 'C',
  CSharp: 'C♯'
}

const dNotes = {
  DFlat: 'D♭',
  D: 'D',
  DSharp: 'D♯'
}

const eNotes = {
  EFlat: 'E♭',
  E: 'E'
}

const fNotes = {
  F: 'F',
  FSharp: 'F♯'
}

const gNotes = {
  GFlat: 'G♭',
  G: 'G',
  GSharp: 'G♯'
}

export const allNotes = {
  ...aNotes,
  ...bNotes,
  ...cNotes,
  ...dNotes,
  ...eNotes,
  ...fNotes,
  ...gNotes
}

// all scales
export const cMajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const gMajorScale = ['G', 'A', 'B', 'C', 'D', 'E', 'F♯']

export const rootsSelection = {
  CMajorRoots: cMajorScale
}

export const academicQualities = ['maj', 'min', 'aug', 'dim']
export const simpleQualities = ['', '-', '+', '°']
