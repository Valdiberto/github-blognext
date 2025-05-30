import { ComponentProps, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

type ExternalLinkProps = ComponentProps<'a'> & {
  text: string
  icon?: ReactNode
}

export function ExternalLink({ text, icon, ...rest }: ExternalLinkProps) {
  return (
    <a
      className="flex items-center gap-2 border-b-2 border-transparent text-xs leading-[160%] font-bold text-blue-500 uppercase transition-colors duration-200 hover:border-blue-500"
      {...rest}
    >
      {text}
      {icon ?? (
        <FontAwesomeIcon className="h-3 w-3" icon={faUpRightFromSquare} />
      )}
    </a>
  )
}
