import clsx from 'clsx'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'img'>) {
  const { className, alt, ...rest } = props

  return (
    <img
      src="https://storage.googleapis.com/lingdb/arkeologo.svg"
      alt={alt ?? 'Arkeomarket logo'}
      {...rest}
      className={clsx(className)}
      aria-hidden={props.alt ? undefined : false}
    />
  )
}
