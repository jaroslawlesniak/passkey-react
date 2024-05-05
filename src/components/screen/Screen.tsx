import React, { PropsWithChildren } from 'react'

const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}

export default Screen