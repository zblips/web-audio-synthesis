import { isNil } from 'ramda'
import { Status, Meta } from 'midi-parse'
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

export function createMidiTrack(audioContext, { tracks }) {
  const tempo = 100
  const division = 96

  let events = toTimedEvents(tracks[0])

  let noteOffEvents = []

  dispatcher.as('MIDI_TRACK_CHANGED')
  .subscribe((trackName) => {
    console.log(trackName)
    events = toTimedEvents(MidiEvents[trackName][0])
  })

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

  return {
    start() {
      startTime = audioContext.currentTime
      events.forEach((event) => {
        let time = startTime + event.time * (60 / (tempo * division))
        switch (event.type) {
          case Meta.END_OF_TRACK:
            return dispatcher.dispatch('END_OF_TRACK', time)
          case Status.NOTE_ON:
            return noteOn(time, event.data)
          case Status.NOTE_OFF:
            noteOffEvents.push(event.data)
            return noteOff(time, event.data)
        }
      })
    },
    stop(time = audioContext.currentTime) {
      dispatcher.dispatch('STOP')
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
  }
}
