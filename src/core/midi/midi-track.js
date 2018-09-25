import { isNil } from 'ramda'
import { Meta, Status } from 'midi-parse'
import { Dispatcher } from 'wasa'
import * as MidiEvents from './midi-events'

const dispatcher = Dispatcher.openSession()

function toTimedEvents({ events }) {
  let delta = 0
  return events.map((event) => {
    const timedEvent = { ...event, ...{ time: event.delta + delta } }
    delta += event.delta
    return timedEvent
  })
}

export function createMidiTrack(audioContext) {
  const tempo = 100
  const division = 96

  let events = []
  let track

  const createEotDispatcher = () => {
    const eotDispatcher = audioContext.createConstantSource()
    const muteGain = audioContext.createGain()
    muteGain.gain.value = 0
    eotDispatcher.connect(muteGain).connect(audioContext.destination)
    eotDispatcher.start(audioContext.currentTime)
    eotDispatcher.onended = () => {
      dispatcher.dispatch('END_OF_TRACK')
    }
    return eotDispatcher
  }

  let slave, startTime

  const noteOn = (time, note) => {
    if (!isNil(slave)) {
      slave.noteOn(note.value, time)
    }
  }

  const noteOff = (time, note) => {
    if (!isNil(slave)) {
      slave.noteOff(note.value, time)
    }
  }

  dispatcher.as('START')
  .subscribe(() => {
    startTime = audioContext.currentTime

    events.forEach((event) => {
      let time = startTime + event.time * (60 / (tempo * division))
      switch (event.type) {
        case Meta.END_OF_TRACK:
          return createEotDispatcher().stop(time)
        case Status.NOTE_ON:
          return noteOn(time, event.data)
        case Status.NOTE_OFF:
          return noteOff(time, event.data)
      }
    })
  })

  return {
    start() {
      startTime = audioContext.currentTime

      events.forEach((event) => {
        let time = startTime + event.time * (60 / (tempo * division))
        switch (event.type) {
          case Meta.END_OF_TRACK:
            return createEotDispatcher().stop(time)
          case Status.NOTE_ON:
            return noteOn(time, event.data)
          case Status.NOTE_OFF:
            return noteOff(time, event.data)
        }
      })
    },
    setSlave(instrument) {
      slave = instrument
      return this
    },
    getSlave() {
      return slave
    },
    get tracks() {
      return Object.keys(MidiEvents)
    },
    get track() {
      return track
    },
    changeTrack(trackName) {
      track = trackName
      events = toTimedEvents(MidiEvents[trackName].tracks[0])
    },
  }
}
