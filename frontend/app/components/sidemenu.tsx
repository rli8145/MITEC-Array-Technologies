import React from 'react'
import Link from 'next/link'
import Sidemenuitem from './sidemenuitem'

const Sidemenu = () => {
  return (
    <div className='flex flex-col rounded-lg gap-3 items-center'>
        <h1 className='font-bold text-3xl stack-sans-text-title mb-8'>OptiCO<sub>2</sub></h1>
        <Link href='/dashboard' className='w-full'>
          <Sidemenuitem src='/dashboard.svg' label='Dashboard' className='hover:text-black transition-colors text-gray-300 w-full' />
        </Link>
        <div className='w-30 border-[0.5px] border-gray-200'></div>
        <Link href='/reports' className='w-full'>
          <Sidemenuitem src='/bar-chart.svg' label='Reports' className='hover:text-black transition-colors text-gray-300 w-full' />
        </Link>
        <Link href='/account' className='w-full'>
          <Sidemenuitem src='/user.svg' label='Account' className='hover:text-black transition-colors text-gray-300 w-full' />
        </Link>
    </div>
  )
}

export default Sidemenu
