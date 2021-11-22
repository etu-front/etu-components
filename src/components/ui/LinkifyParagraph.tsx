import React from 'react'

const LINK_REGEX = /(https?:\/\/[^\s]+)/gi
const LINE_BREAK = /(\n|\r\n|\r)/g

interface IProps {
  str: string
  target?: '_blank' | '_self'
  className?: string
  linkColor?: string
}

const LinkifyParagraph: React.FC<IProps> = React.memo(props => {
  const lineBreakParse = (str: string) => {
    const strs = str
      .replace(/ /g, '\u00a0')
      .split(LINE_BREAK)
      .filter(text => !!text)
    return strs.map((part, idx) => <React.Fragment key={idx}>{LINE_BREAK.test(part) ? <br /> : part}</React.Fragment>)
  }
  const parts = props.str.split(LINK_REGEX).filter(text => text !== '')
  const { linkColor = '#2432e2' } = props
  return (
    <div className={props.className}>
      {parts.map((part, idx) => {
        if (part.startsWith('http')) {
          return (
            <a target={props.target || '_blank'} key={idx} href={part} style={{ color: linkColor }}>
              {part}
            </a>
          )
        }
        return lineBreakParse(part)
      })}
    </div>
  )
})

export default LinkifyParagraph
