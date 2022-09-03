declare module '@quoll/ui-themes' {
  type Theme = {
    default: {
      colors: string
      font: {
        family: string
        color: colorPalette.mineShaft
      }
      media: {
        [string]: number
      }
    }
  }

  export default Theme
}
