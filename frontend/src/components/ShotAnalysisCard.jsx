import React from 'react'
import { getShotInsights } from '../utils/footballIntelligence'


function ShotAnalysisCard({ xg }) {

  if (xg === null)
    return null

  return (
    <div className='bg-slate-800 p-6 rounded-2xl shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>
        Shot Analysis
      </h2>

      <p className='text-slate-300 leading-relaxed'>
        {getShotInsights(xg)}
      </p>
    </div>
  )
}

export default ShotAnalysisCard