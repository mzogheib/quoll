// Color names from https://www.color-blindness.com/color-name-hue/

const colorPalette = {
  black: '#000000',
  gainsboro: '#DCDCDC',
  grey: '#7F7F7F',
  matterhorn: '#4F4F4F',
  mediumAquamarine: '#6FCF97',
  mineShaft: '#333333',
  royalBlue: '#2F80ED',
  transparent: 'transparent',
  white: '#FFFFFF',
  whiteSmoke: '#F2F2F2',
}

export default {
  default: {
    colors: colorPalette,
    font: {
      family: 'Roboto, sans-serif',
      color: colorPalette.mineShaft,
    },
  },
}
