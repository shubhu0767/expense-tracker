import React from 'react'

const MainWrapper = ({children}) => {
  return (
    <div className='w-[80%] lg:w-[30%] m-auto'>{children}</div>
  )
}

export default MainWrapper