import React from 'react'

function XGCard({ xg }) {
  return (
    <div className='bg-slate-800 p-6 rounded-xl shadow-lg mt-6 text-center'>

      <h2 className='text-2xl font-bold mb-4'>
        Predicted xG
      </h2>

      <p className='text-5xl text-green-400 font-bold'>
        {xg !== null
          ? xg.toFixed(4)
          : '--'}
      </p>
    </div>
  )
}

export default XGCard