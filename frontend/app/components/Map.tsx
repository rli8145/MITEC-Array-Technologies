import React from 'react'
import PrecipMap from './Plotlyjs'

// Plotly component is implemented in JS; cast to any to avoid TSX prop checks
const PrecipMapAny = PrecipMap as any;

const Map: React.FC<{ onPointClick?: (txt: string) => void; selectedCity?: string, queryResult?: any }> = ({ onPointClick, selectedCity, queryResult }) => {
  return (
    <div className='flex flex-1 border bg-base rounded-md '>
      <PrecipMapAny onPointClick={onPointClick} selectedCity={selectedCity} queryResult={queryResult} />
    </div>
  )
}

export default Map
