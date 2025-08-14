"use client"
import React, { useEffect, useState } from 'react'
import { getCategory } from '../../../../services/api'
import Products from '../Products/Products'

function Categories() {
    const [data, setData] = useState([])
    useEffect(() => {
        getCategory().then(res => setData(res))
    }, [])

    return (
        <div>
            <div className='bg-white z-50 fixed w-full xl:top-[130px] lg:top-[90px] md:top-[70px] sm:top-[70px] top-[70px] shadow-lg border-t-[1px] border-[#f2f2f2] md:border-0  py-5'>
                <div className='top-[-10px] container mx-auto text-[14px] md:text-[16px] capitalize flex gap-5 md:justify-between overflow-x-auto hide-scrollbar px-3 '>
                    {
                        data.map(item => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    const section = document.getElementById(item.category.toLowerCase());
                                    if (section) {
                                        const yOffset = -180; 
                                        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}

                                className="cursor-pointer hover:bg-gray-100 rounded-[20px] px-4 py-1 transition-all ease-in-out duration-200 "
                            >
                                {item.category}
                            </div>
                        ))
                    }
                </div>
            </div>
            <Products />
        </div>
    )
}

export default Categories