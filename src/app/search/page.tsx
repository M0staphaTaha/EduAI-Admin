"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect } from 'react';
import {  useGetAllStudentsQuery } from "@/features/User-Management/studentApi";
import Spinner from "@/components/spinner";
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";

const Search = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type Student = Record<string, any>;
    const { data, error, isLoading } = useGetAllStudentsQuery({
        archived: "false",
        page: 0,
        size: 1000000
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
    useEffect(() => {
        if (data) {
          console.log("Response Data:", data);
          const filtered = data.data.content.filter((student: Student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredStudents(filtered);
        }
        if (error) {
          console.log("Error:", error);
        }
      }, [data, searchTerm, error]);
    return ( 
        <>
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12`}>
            <div className="flex w-full h-full justify-center p-2 overflow-auto">
                <div className="grid bg-white rounded-xl w-full h-full overflow-auto ">
                    <div className="flex gap-2 bg-gray-200 h-[70px] rounded-t-xl items-center pl-3 font-semibold overflow-auto">
                        <Link className="text-blue-500 underline underline-offset-4" href="/search">Student</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/teacher">Teacher</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/employee">Employee</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/worker">Worker</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/fees">Fees</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/infrastructure">Infrastructure</Link>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-7">
                        <div className="grid p-4">
                            <div className="flex gap-3 md:justify-center">
                                <div>
                                    <label htmlFor="icon" className="sr-only">Search</label>
                                    <div className="relative min-w-48 md:min-w-80">
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                            <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                        </div>
                                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" id="icon" name="icon" className="py-2 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                                    </div>
                                </div>
                                <div>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-1.5">
                                        <option selected>Search by Name </option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="font-semibold">0 Students Found</p>
                            </div>
                            <div className="h-[450px] grid justify-center items-center">
                                {
                                    isLoading ? <Spinner/>:
                                    <div>
                                        {filteredStudents.length > 0 && searchTerm ? (
                                            <ul>
                                                {filteredStudents.map((student) => (
                                                <li key={student.id}>{student.name}</li>
                                                ))}
                                            </ul>
                                            ) : (
                                                  <img src="/images/nothing.png" alt="" />
                                            )}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="border rounded-xl h-full w-full"></div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Search;