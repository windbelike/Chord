
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

export const academicIntervals = ['maj', 'min', 'aug', 'dim']
export const simpleIntervals = ['', '-', '+', '°']

// all 12 notes (sharp only)
export const keys12ShapOnly = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// all 12 notes (flat only) todo impl
export const keys12FlatOnly = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']

const allKeyCount = 12
const fullToneDist = 2
const halfToneDist = 1

function nextFullTone (currKey, candidates) {
  const currIndex = candidates.indexOf(currKey)
  if (currIndex == -1) {
    return
  }

  const nextIndex = (currIndex + fullToneDist) % allKeyCount
  return candidates[nextIndex]
}

function nextHalfTone (currKey, candidates) {
  const currIndex = candidates.indexOf(currKey)
  if (currIndex == -1) {
    return
  }

  const nextIndex = (currIndex + halfToneDist) % allKeyCount
  return candidates[nextIndex]
}

// generate scales from a root
// major scale interval: full full half full full full half （tone）
// 2 full 1 half 3 full 1 half
function generateMajorScaleKeys (root) {
  if (keys12ShapOnly.indexOf(root) == -1) {
    console.error('invalid root for ScaleNotes')
    return []
  }
  const keys = [root]

  let nextKey = root
  // 2 full tone
  for (let i = 0; i < 2; i++) {
    nextKey = nextFullTone(nextKey, keys12ShapOnly)
    keys.push(nextKey)
  }
  // 1 half tone
  nextKey = nextHalfTone(nextKey, keys12ShapOnly)
  keys.push(nextKey)
  // 3 full tone
  for (let i = 0; i < 3; i++) {
    nextKey = nextFullTone(nextKey, keys12ShapOnly)
    keys.push(nextKey)
  }
  // 1 half tone, don't need this
  // nextKey = nextHalfTone(nextKey, keys12ShapOnly)
  // keys.push(nextKey)

  return keys
}

// fixme interval notation bug
console.log(generateMajorScaleKeys('F'))

function generateMinorScaleKeys (root) {

}

function determineInterval (root, third, fifth) {

}
