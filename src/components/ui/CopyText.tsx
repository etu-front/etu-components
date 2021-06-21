import React, { FC, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Button from './Button'
import { BaseProps } from '../types'

interface IProps extends BaseProps {
  text: string
  /** 毫秒 */
  delay?: number
  copyChildren?: React.ReactNode
  copiedText?: string
  onCopy?: Function
}
const CopyText: FC<IProps> = ({
  text,
  delay = 2000,
  className,
  children,
  copiedText = 'copied',
  onCopy,
  copyChildren
}) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    setCopied(true)
    if (onCopy) onCopy()
    setTimeout(() => setCopied(false), delay)
  }
  return (
    <CopyToClipboard text={text} onCopy={handleCopy} className={className}>
      {copied
        ? copyChildren || <span style={{ color: '#50b127' }}>{copiedText}</span>
        : children || (
          <Button size="small" type="primary">
            复制
          </Button>
        )}
    </CopyToClipboard>
  )
}
export default CopyText
