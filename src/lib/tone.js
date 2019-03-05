const toneStub = {
  Sequence: () => null,
  Transport: {
    bpm: {
      value: null
    },
    swing: null,
    start: () => null,
    stop: () => null
  },
  MonoSynth: () => ({
    toMaster: () => null
  }),
  Sampler: () => ({
    toMaster: () => null
  })
}

const tone = process.env.NODE_ENV !== 'test' ? require('tone') : toneStub

export default tone
