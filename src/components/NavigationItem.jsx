import React from 'react'

const NavigationItem = ({onClick, title, image}) => {
    return (
        <div onClick={onClick} className='w-20 h-20 bg-gray-700 rounded-full flex justify-center items-center cursor-pointer bg-cover hover:drop-shadow-xl hover:border-2 border-amber-400 transition-all duration-75 relative' style={{backgroundImage: `url(${image})`}}>
            <div className="black-overlay bg-black absolute inset-0 rounded-full opacity-40"></div>
            <p className='z-10'>
                {title}
            </p>
        </div>
    )
}

export default NavigationItem