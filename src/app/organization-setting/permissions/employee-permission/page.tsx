/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from "@/components/spinner";
import { useGetAllEmployeePermissionsQuery } from "@/features/Organization-Setteings/employeePermissionApi";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";

const EmployeePermission = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type EmployeePermission = Record<string, any>;
    const [search, setSearch] = useState("");
    const { data, error, isLoading } = useGetAllEmployeePermissionsQuery(null);
    const [selectAll, setSelectAll] = useState(false); 

    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
      }, [data, error]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !selectAll;
        });
    };

    useEffect(() => {
        const handleOtherCheckboxes = () => {
            const allCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            const selectAllCheckbox = document.getElementById('checkbox-all-search') as HTMLInputElement | null;
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                setSelectAll(allChecked);
            }
        };

        const otherCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleOtherCheckboxes);
        });

        return () => {
            otherCheckboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', handleOtherCheckboxes);
            });
        };
    }, []);

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
    );
    return ( 
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap`}>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management">Organization Settings</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen`}>
            <div className="flex justify-left gap-5 text-[20px] max-[725px]:text-[15px] flex-wrap font-semibold mb-[80px] mt-[50px] ml-4">
                    <Link href="/organization-setting/permissions/department-permission" >
                    Department 
                    </Link>
                    <Link href="/organization-setting/permissions/employee-permission" className="text-blue-500 underline">
                    Employee
                    </Link>
                </div>
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="mb-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div> 
                    <div className="flex justify-center">
                        <Link href="/organization-setting/permissions/add/employee" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] ease-in font-semibold duration-300">+ Add Employee Permissions</Link>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                        <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        {/* Add event listener for select all checkbox */}
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 -gray-800 focus:ring-2" onChange={handleSelectAll} />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                is Full Academic
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                is Full Administration
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                is Full Communication
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                is Full Operations
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    view
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data?.data.content.filter((employeePermission: EmployeePermission) => {
                            return search.toLocaleLowerCase() === '' ? employeePermission : employeePermission.name.toLocaleLowerCase().includes(search);
                        }).map((employeePermission: EmployeePermission) => (
                            <tr key={employeePermission.id} className="bg-white border-b  hover:bg-gray-50">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                    <p> {employeePermission.name} </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employeePermission.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employeePermission.isFullAcademic ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employeePermission.isFullAdministration ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employeePermission.isFullCommunication ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employeePermission.isFullOperations ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/organization-setting/permissions/employee-permission/${employeePermission.id}`} className="font-medium text-blue-600 hover:underline">edit</Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="px-2 py-1 rounded-lg text-white bg-red-500 font-semibold shadow-lg ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default EmployeePermission;