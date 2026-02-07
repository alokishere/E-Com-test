import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";

const Benifites = () => {
    const items = [
        { icon: <FaShippingFast />, title: "Free Shipping" },
        { icon: <IoBagCheckOutline />, title: "Secure Checkout" },
        { icon: <FaUserDoctor />, title: "Free Doctor Consultation" },
    ];

    return (
        <div className='bg-[#F8F5F0] px-2 w-full py-3 md:py-0 md:h-16 flex items-center'>
            <div className='container mx-auto flex flex-row md:text-sm text-xs justify-center items-center gap-6 px-4'>
                {items.map((item, idx) => (
                    <div key={idx} className='flex items-center gap-4 text-black group'>
                        <span className='text-3xl md:text-2xl transition-transform duration-300 group-hover:scale-110'>
                            {item.icon}
                        </span>
                        <p className='text-xs md:text-xs font-thin uppercase tracking-wider'>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Benifites