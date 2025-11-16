import React from 'react'
import Link from 'next/link'
import Sidemenuitem from './sidemenuitem'
import Image from 'next/image'

const Sidemenu = () => {
  return (
    <div className='flex flex-col rounded-lg gap-3 items-center'> 
        <Image className='py-[-50px] mb-8' src='/logoimg.png' width={150} height={150} alt='OptiCO2' />
        <Link href='/dashboard' className='w-full'>
          <Sidemenuitem src='/dashboard.svg' label='Dashboard' className='hover:text-black transition-colors text-black w-full' />
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
