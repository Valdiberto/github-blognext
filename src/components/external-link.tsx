import { ComponentProps, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

type ExternalLinkProps = ComponentProps<'a'> & {
  text: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function ExternalLink({
  text,
  icon,
  iconPosition = 'right',
  ...rest
}: ExternalLinkProps) {
  const resolvedIcon = icon ?? (
    <FontAwesomeIcon className="mb-1 flex h-3 w-3" icon={faUpRightFromSquare} />
  )
  return (
    <a
      className="flex items-center gap-2 border-b-2 border-transparent text-xs leading-[160%] font-bold text-blue-500 uppercase transition-colors duration-200 hover:border-blue-500"
      {...rest}
    >
      {iconPosition === 'left' && resolvedIcon}
      <span>{text}</span>

      {iconPosition === 'right' && resolvedIcon}
    </a>
  )
}
