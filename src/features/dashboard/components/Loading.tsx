import { Skeleton } from '@mui/material'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <>
      <Skeleton variant="text" width={60} height={30} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </>
  )
}

export default Loading