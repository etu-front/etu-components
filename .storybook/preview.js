
import React from 'react'
import { ThemeProvider } from 'styled-components'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
// THEME

const THEME = {
  primaryColor: '#00a5ff',
  successColor: '#50b127',
  errorColor: '#ff4141',
  dangerColor: '#ff3636',
  infoColor: '#3549f5',
  warningColor: '#fdc920'
}

const withThemeProvider = (Story, context) => (<ThemeProvider theme={THEME}><Story {...context} /></ThemeProvider>)
export const decorators = [withThemeProvider]
