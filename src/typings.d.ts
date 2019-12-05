type ThemeKeys =
  'primaryColor' | 'successColor' | 'warningColor' | 'errorColor' | 'infoColor' | 'dangerColor' |
  'normalColor' | 'primaryLightColor' | 'primaryLighterColor' |
  'tabHeight'

declare let THEME: {
  [k in ThemeKeys]: string
}

declare let ICON_FONT_URL: string
