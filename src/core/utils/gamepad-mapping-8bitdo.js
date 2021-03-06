// This mapping is for the windows Mode. Power + x
const buttonsMapping = [
  {
    mappingIndex: 0,
    btnInfo: 'B',
    mode: 'KEYBOARD_EVENT',
    key: 'ArrowRight',
    action: null,
  },
  {
    mappingIndex: 1,
    btnInfo: 'A',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
  {
    mappingIndex: 2,
    btnInfo: 'Y',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
  {
    mappingIndex: 3,
    btnInfo: 'X',
    mode: 'KEYBOARD_EVENT',
    key: 'ArrowUp',
    action: null,
  },
  {
    mappingIndex: 4,
    btnInfo: 'L1',
    mode: 'KEYBOARD_EVENT',
    key: 'ArrowLeft',
    action: null,
  },
  {
    mappingIndex: 5,
    btnInfo: 'R1',
    mode: 'KEYBOARD_EVENT',
    key: 'ArrowLeft',
    action: null,
  },
  {
    mappingIndex: 6,
    btnInfo: 'L2',
    mode: 'KEYBOARD_EVENT',
    key: 'l',
    action: null,
  },
  {
    mappingIndex: 7,
    btnInfo: 'R2',
    mode: 'KEYBOARD_EVENT',
    key: 'r',
    action: null,
  },
  {
    mappingIndex: 8,
    btnInfo: 'SELECT',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
  {
    mappingIndex: 9,
    btnInfo: 'START',
    mode: 'KEYBOARD_EVENT',
    key: 'z',
    action: null,
  },
  {
    mappingIndex: 10,
    btnInfo: 'Joystick Button LEFT',
    mode: 'KEYBOARD_EVENT',
    key: 'z',
    action: null,
  },
  {
    mappingIndex: 11,
    btnInfo: 'Joystick Button RIGHT',
    mode: 'KEYBOARD_EVENT',
    key: 'z',
    action: null,
  },
  {
    mappingIndex: 12,
    btnInfo: 'Button Arrow UP',
    mode: 'KEYBOARD_EVENT',
    key: 'z',
    action: null,
  },
  {
    mappingIndex: 13,
    btnInfo: 'Button Arrow DOWN',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
  {
    mappingIndex: 14,
    btnInfo: 'Button Arrow LEFT',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
  {
    mappingIndex: 15,
    btnInfo: 'Button Arrow RIGHT',
    mode: 'KEYBOARD_EVENT',
    key: 'a',
    action: null,
  },
]

const axesMapping = [
  {
    mappingIndex: 0,
    axeInfo: 'Left stick 🢀🢂',
    throwKeyEvent: true,
    key1: 'a',
    key2: 'z',
  },
  {
    mappingIndex: 1,
    axeInfo: 'Left stick 🢁🢃',
    throwKeyEvent: true,
    negativeThreshold: -0.99,
    positiveThreshold: 0.99,
    key1: 'a',
    key2: 'z',
  },
  {
    mappingIndex: 2,
    axeInfo: 'Right stick 🢀🢂',
    throwKeyEvent: true,
    key1: 'a',
    key2: 'z',
  },
  {
    mappingIndex: 3,
    axeInfo: 'Right stick 🢁🢃',
    throwKeyEvent: true,
    key1: 'a',
    key2: 'z',
  },
  {
    mappingIndex: 6,
    axeInfo: 'Arrow stick 🢀🢂',
    throwKeyEvent: true,
    key1: 'a',
    key2: 'z',
  },
  {
    mappingIndex: 7,
    axeInfo: 'Arrow stick 🢁🢃',
    throwKeyEvent: true,
    key1: 'a',
    key2: 'z',
  },
]

export const eightbitdoGamepad = {
  identifier: '8Bitdo',
  debug: true,
  buttonsMapping,
  axesMapping,
}
