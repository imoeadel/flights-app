import React from 'react'
import { ReactComponent as NotFoundSvg } from '../assets/page404.svg'

const NotFound404 = () => {

  return (
    <div className="bg-[#f4f7f9] w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <NotFoundSvg />
    </div>
  )
}

export default NotFound404