import React from 'react'
import PrecipMap from './Plotlyjs'

// Plotly component is implemented in JS; cast to any to avoid TSX prop checks
const PrecipMapAny = PrecipMap as any;

const Map: React.FC<{ onPointClick?: (txt: string) => void; selectedCity?: string }> = ({ onPointClick, selectedCity }) => {
  return (
    <div className='flex flex-1 border bg-base'>
      <PrecipMapAny onPointClick={onPointClick} selectedCity={selectedCity} />
    </div>
  )
}

export default Map
