import React from 'react'

function XGCard({ xg }) {

  const getLabel = () => {
    if (xg === null) return 'No Prediction Yet'

    if (xg < 0.1) return 'Very Difficult Chance'
    if (xg < 0.3) return 'Low Quality Chance'
    if (xg < 0.5) return 'Decent Opportunity'
    if (xg < 0.7) return 'High Quality Chance'

    return 'Almost Certain Goal'
  }
  return (
    <div className='bg-slate-800 p-6 rounded-xl shadow-lg mt-6 text-center'>

      <h2 className='text-2xl font-bold mb-4'>
        Predicted xG
      </h2>

      <p className='text-5xl text-green-400 font-bold'>
        {xg !== null
          ? xg.toFixed(3)
          : '--'}
      </p>

      <p className='text-slate-300 text-lg'>
        {getLabel()}
      </p>
    </div>
  )
}

export default XGCard