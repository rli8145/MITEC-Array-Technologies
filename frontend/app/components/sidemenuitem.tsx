import React from 'react'
import Image from 'next/image'

interface SidemenuItemProps {
  src: string
  alt?: string
  label?: string
  width?: number
  height?: number
  className?: string
}

const Sidemenuitem: React.FC<SidemenuItemProps> = ({
  src,
  alt = 'icon',
  label,
  width = 15,
  height = 15,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} />
      {label && <span className='text-sm'>{label}</span>}
    </div>
  )
}

export default Sidemenuitem
