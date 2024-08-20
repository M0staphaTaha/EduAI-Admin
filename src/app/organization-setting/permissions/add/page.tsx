"use client"
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Permissions = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    return (
        <>
            <div className={`flex justify-left gap-5 text-[20px] max-[725px]:text-[15px] flex-wrap ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} font-semibold mb-[20px] mt-[50px] ml-4`}>
                <Link href="/organization-setting/permissions/add" className="text-blue-500 underline">
                    Department
                </Link>
                <Link href="/organization-setting/permissions/add/employee" >
                    Employee
                </Link>
            </div>
            <div className="lg:ml-[270px] mr-[5px]  flex justify-center items-center h-[650px] relative mt-5 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen">
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-[1000px] h-[600px] overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-[18px] text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="px-6 py-6 whitespace-nowrap ">
                                    Permission
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Applicable For
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white   hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4  text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                    </label>

                                    
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="grid grid-cols-2 gap-3">
                                        <span className="grid items-center gap-2 text-[18px] text-black font-semibold">
                                            Sections
                                            <select id="countries" className="bg-white outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                                <option selected>Choose Section </option>
                                                <option value="US">Teacher</option>

                                            </select>
                                        </span>

                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                    </label>

                                    
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                </td>
                            </tr>
                            <tr className="bg-white  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                    </label>

                                    
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                </td>
                            </tr>
                            <tr className="bg-white  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                    </label>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Permissions;