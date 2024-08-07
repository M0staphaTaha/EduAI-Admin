/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Archive = () => {
    return ( 
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/archive">Archive</Link>
        </div>
        <div className={`lg:ml-[290px] mt-12 grid justify-center `}>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive/driver" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/driver.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Driver</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive/employee" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/employee.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Employee</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive/parent" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/Vector.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Parent</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive//student" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                    <img src="/images/student.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Student</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive//teacher" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                    <img src="/images/Teacher.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Teacher</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/archive//worker" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                    <img src="/images/Worker.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Worker</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/bus" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <svg className="h-12 w-12 text-[#000000] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="6" cy="17" r="2" />  <circle cx="18" cy="17" r="2" />  <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />  <polyline points="16 5 17.5 12 22 12" />  <line x1="2" y1="10" x2="17" y2="10" />  <line x1="7" y1="5" x2="7" y2="10" />  <line x1="12" y1="5" x2="12" y2="10" /></svg>
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Bus</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/book" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                    <svg className="h-11 w-11 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Library</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/rooms" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                    <img src="/images/Door.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Room</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/educational-affairs/grads" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/grads.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Grades</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/course/resource" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/mapping.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Resource</p>
                </Link>
            </div>
            <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                <Link href="/financial-management" className="grid items-center justify-center text-center" >
                    <div className="bg-[#ebebeb] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                        <img src="/images/dollar.png" alt="#" />
                    </div>
                    <p className="text-[22px] font-semibold mt-2">Fees</p>
                </Link>
            </div>

        </div>

    </div>
    </>
     );
}
 
export default Archive;