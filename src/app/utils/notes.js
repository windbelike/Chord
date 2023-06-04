
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

// all natural major scales
/**
 * see: https://piano-music-theory.com/2016/05/31/major-scales/
 * C Major Scale: C – D – E – F – G – A – B – C

 * Major scales with sharps:
  G Major Scale: G – A – B – C – D – E – F♯ – G
  D Major Scale: D – E – F♯ – G – A – B – C♯ – D
  A Major Scale: A – B – C♯ – D – E – F♯ – G♯ – A
  E Major Scale: E – F♯ – G♯ – A – B – C♯ – D♯ – E
  B Major Scale: B – C♯ – D♯ – E – F♯ – G♯ – A♯ – B

  Major scales with flats:
  F Major Scale: F – G – A – B♭ – C – D – E – F
  B Flat Major Scale: B♭ – C – D – E♭ – F – G – A – B♭
  E Flat Major Scale: E♭ – F – G – A♭ – B♭ – C – D – E♭
  A Flat Major Scale: A♭ – B♭ – C – D♭ – E♭ – F – G – A♭
  D Flat Major Scale: D♭ – E♭ – F – G♭ – A♭ – B♭ – C – D♭

  Enharmonic Major Scales:
  F Sharp Major Scale: F♯ – G♯ – A♯ – B – C♯ – D♯ – E♯ – F♯
  G Flat Major Scale: G♭ – A♭ – B♭ – C♭ – D♭ – E♭ – F – G♭
 */
export const cMajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

export const gMajorScale = ['G', 'A', 'B', 'C', 'D', 'E', 'F♯']
export const dMajorScale = ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯']
export const aMajorScale = ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯']
export const eMajorScale = ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯']
export const bMajorScale = ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯']
export const fSharpMajorScale = ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯']

export const fMajorScale = ['F', 'G', 'A', 'B♭', 'C', 'D', 'E']
export const bFlatMajorScale = ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A']
export const eFlatMajorScale = ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D']
export const aFlatMajorScale = ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G']
export const dFlatMajorScale = ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C']
export const gFlatMajorScale = ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F']

const key2NumberMap = new Map()
key2NumberMap.set('B♯', 0)
key2NumberMap.set('C', 0)
key2NumberMap.set('C♯', 1)
key2NumberMap.set('D♭', 1)
key2NumberMap.set('D', 2)
key2NumberMap.set('D♯', 3)
key2NumberMap.set('E♭', 3)
key2NumberMap.set('E', 4)
key2NumberMap.set('F♭', 4)
key2NumberMap.set('E♯', 5)
key2NumberMap.set('F', 5)
key2NumberMap.set('F♯', 6)
key2NumberMap.set('G♭', 6)
key2NumberMap.set('G', 7)
key2NumberMap.set('G♯', 8)
key2NumberMap.set('A♭', 8)
key2NumberMap.set('A', 9)
key2NumberMap.set('A♯', 10)
key2NumberMap.set('B♭', 10)
key2NumberMap.set('B', 11)
key2NumberMap.set('C♭', 11)

const flat = '♭'
const sharp = '♯'

// circle of the fifth major version
export const circleOfTheFifth = {
  C: cMajorScale,
  G: gMajorScale,
  D: dMajorScale,
  A: aMajorScale,
  E: eMajorScale,
  B: bMajorScale,
  'F♯': fSharpMajorScale,
  F: fMajorScale,
  'B♭': bFlatMajorScale,
  'E♭': eFlatMajorScale,
  'A♭': aFlatMajorScale,
  'D♭': dFlatMajorScale,
  'G♭': gFlatMajorScale
}

// all natural minor scales

export const rootsSelection = {
  CMajorRoots: cMajorScale
}

export const academicChordQualities = ['maj', 'min', 'aug', 'dim']
export const simpleChordQualities = ['', '-', '+', '°']
export const chordQualifies = {
  diminished: 'dim',
  minor: 'min',
  major: 'maj',
  augmented: 'aug'
}

const fullToneDist = 2
const halfToneDist = 1

// generate scales from a root
function generateMajorScaleKeys (root) {
  return circleOfTheFifth[root]
}

function generateMinorScaleKeys (root) {

}

function generateMajorScaleChords (root, candidates) {
  if (candidates.indexOf(root) == -1) {
    console.error('invalid root for MajorScaleChords')
    return []
  }

  const chordList = []
  let rootIndex = candidates.indexOf(root)

  for (let i = 0; i < 7; i++) {
    root = candidates[rootIndex]
    const thirdIndex = (rootIndex + 2) % candidates.length
    const fifthIndex = (rootIndex + 4) % candidates.length
    const third = candidates[thirdIndex]
    const fifth = candidates[fifthIndex]
    rootIndex++
    const chord = determineChord(root, third, fifth)
    chordList.push(chord)
  }

  return chordList
}

function determineChord (root, third, fifth) {
  // third for short
  const rootThirdInterval = determineInterval(root, third)
  // fifth for short
  const rootFifthInterval = determineInterval(root, fifth)

  // console.log('root:' + root)
  // console.log('third:' + third)
  // console.log('fifth:' + fifth)
  // console.log('rootThirdInterval:' + rootThirdInterval)
  // console.log('rootFifthInterval:' + rootFifthInterval)
  // console.log('\n')

  if (rootThirdInterval == fullToneDist + halfToneDist && rootFifthInterval == 3 * fullToneDist) {
    // diminished, third: full + half ; fifth: full + full + full
    return root + chordQualifies.diminished
  } else if (rootThirdInterval == fullToneDist + halfToneDist && rootFifthInterval == (3 * fullToneDist) + halfToneDist) {
    // // minor, third: full + half ; fifth: full + full + half + full
    return root + chordQualifies.minor
  } else if (rootThirdInterval == 2 * fullToneDist && rootFifthInterval == (3 * fullToneDist) + halfToneDist) {
  // major, third: full + full + half ; fifth: full + full + half + full
    return root + chordQualifies.major
  } else if (rootThirdInterval == 2 * fullToneDist && rootFifthInterval == 4 * fullToneDist) {
  // augmented， third: full + full + half ; fifth: full + full + half + full + half
    return root + chordQualifies.augmented
  } else {
    return 'unknown chords'
  }
}

function determineInterval (first, second) {
  const firstIndex = key2NumberMap.get(first)
  const secondIndex = key2NumberMap.get(second)
  // console.log(`${first}, ${firstIndex}, ${second}, ${secondIndex}`)
  let dist = 0
  if (secondIndex < firstIndex) {
    dist = secondIndex + 12 - firstIndex
  } else if (secondIndex > firstIndex) {
    dist = secondIndex - firstIndex
  }

  return dist
}

console.log('=-========================')
for (const i in circleOfTheFifth) {
  console.log('Key:' + i)
  console.log(generateMajorScaleChords(i, generateMajorScaleKeys(i)))
}

// const root = 'D'
// const candidate = generateMajorScaleKeys(root)
// console.log(candidate)
// console.log(generateMajorScaleChords(root, candidate))
