import React from 'react'

const NavigationItem = ({title, image}) => {
    return (
        <div className='w-20 h-20 bg-gray-700 rounded-full flex justify-center items-center cursor-pointer'>
            {title}
        </div>
    )
}

export default NavigationItem