import React from 'react'

const Popup = ({title, description, buttonText, buttonAction, display}) => {
  return (
    <>
      {display &&
        <div className='fixed top-0 left-0 w-full h-full bg-[#242424aa] flex justify-center items-center z-50'>
            <div className='bg-gray-700 p-4 rounded-lg flex flex-col gap-4 max-w-3xl'>
                <h1>{title}</h1>
                <p>{description}</p>
                <button onClick={buttonAction}>{buttonText}</button>
            </div>
        </div>
      }
    </>
  )
}

export default Popup