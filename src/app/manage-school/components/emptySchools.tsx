/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from '@/components/spinner';
import Link from 'next/link';
import { useState } from 'react';
const EmptySchools = () => {
    const [lol,setLol] = useState(true);
    return ( 
        <>
            <div className='grid justify-center items-center text-center gap-5'>
                <div>
                    <img className='w-[350px]' src="/images/Empty.png" alt="#" />
                </div>
                <div>
                    <h1 className='font-bold text-[20px] font-sans text-[#041631]'>There is no newly added school</h1>
                    <p className="text-[#526484] font-sans text-[15px] font-semibold">You can add a new school by clicking on this button</p>
                </div>
                <div className='mt-3'>
                    <Link href="/add-new-school" className="px-4 py-2.5 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[200px] ease-in duration-300">Add new school</Link>
                </div>
            </div>
        </>
    );
}
 
export default EmptySchools;