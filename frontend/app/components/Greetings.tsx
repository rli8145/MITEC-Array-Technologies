import React from 'react'

const Greetings = () => {
  return (
    <div className='flex items-center justify-between w-full inset-shadow-sm p-4'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-xl'>Hello, CompanyName</h1>
        <p className='text-gray-400'>Let's help you find the ideal steel manufacturer for your company fit.</p>
      </div>

      <div className='flex items-center gap-2'>
        <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center'>
          <span className='text-xs font-medium text-gray-700'>JD</span>
        </div>
        <div>
          <h1 className='font-medium'>John Doe</h1>
          <p className='text-xs text-gray-500'>Admin</p>
        </div>
      </div>
    </div>
  )
}

export default Greetings
