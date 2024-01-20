import React from 'react'

function Digit({ value, diff, handleClick, editable }) {
  return (
    <div className='digit'>
      <button className={`digit-controls inc ${editable ? '' : 'disabled'}`} onClick={() => { 
        if(editable) handleClick(diff) 
      }}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
          <polyline fill="none" stroke="#000000" strokeWidth="15" strokeLinecap="round" 
          strokeLinejoin="round" strokeMiterlimit="10" points="87.8,32.2 50,7.8 12.2,32.2"/>
        </svg>
      </button>
      <div>{ value }</div>
      <button className={`digit-controls dec ${editable ? '' : 'disabled'}`} onClick={() => {
        if(editable) handleClick(-diff)
      }}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
          <polyline fill="none" stroke="#000000" strokeWidth="15" strokeLinecap="round" 
          strokeLinejoin="round" strokeMiterlimit="10" points="12.2,7.8 50,32.2 87.8,7.8"/>
        </svg>
      </button>
    </div>
  )
}

export default Digit