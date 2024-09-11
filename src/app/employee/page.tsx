/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import {
  useDeleteEmployeesMutation,
  useGetAllEmployeesQuery,
} from "@/features/User-Management/employeeApi";
import Spinner from "@/components/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import BreadCrumbs from "@/components/BreadCrumbs";

const Employee = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "User Management",
      nameAr: "إدارة المستخدمين",
      nameFr: "Gestion des utilisateurs",
      href: "/user-management",
    },
    {
      nameEn: "Employee",
      nameAr: "موظف",
      nameFr: "Employé",
      href: "/employee",
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  type Employee = Record<string, any>;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, isLoading, refetch } = useGetAllEmployeesQuery({
    archived: "false",
    page: currentPage,
    size: rowsPerPage,
  });
  const [selectAll, setSelectAll] = useState(false);

  const onPageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  const onElementChange = (ele: SetStateAction<number>) => {
    setRowsPerPage(ele);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployees({
        id: id,
        lock: "true",
      }).unwrap();
      toast.success(`Employee with ID ${id} Locked successfully`);
      void refetch();
    } catch (err) {
      toast.error("Failed to lock the Employee");
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectAll;
    });
  };

  useEffect(() => {
    const handleOtherCheckboxes = () => {
      const allCheckboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:not(#checkbox-all-search)',
      );
      const allChecked = Array.from(allCheckboxes).every(
        checkbox => checkbox.checked,
      );
      const selectAllCheckbox = document.getElementById(
        "checkbox-all-search",
      ) as HTMLInputElement | null;
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        setSelectAll(allChecked);
      }
    };

    const otherCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    otherCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", handleOtherCheckboxes);
    });

    return () => {
      otherCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener("change", handleOtherCheckboxes);
      });
    };
  }, []);
  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <div className="flex justify-between text-center max-[502px]:grid max-[502px]:justify-center">
          <div className="mb-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                <svg
                  className="size-4 flex-shrink-0 text-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                onChange={e => setSearch(e.target.value)}
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/add-new-employee"
              className="mb-5 mr-3 w-[210px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              + New Employee
            </Link>
          </div>
        </div>
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-textSecondary rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    {/* Add event listener for select all checkbox */}
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="-gray-800 h-4 w-4 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-hover"
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Name
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  id
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Nationality
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Email
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Mobile
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  view
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.content
                .filter((employee: Employee) => {
                  return search.toLocaleLowerCase() === ""
                    ? employee
                    : employee.name.toLocaleLowerCase().includes(search);
                })
                .map((employee: Employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="h-4 w-4 rounded border-borderPrimary bg-bgSecondary text-primary focus:ring-2 focus:ring-hover"
                        />
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                    >
                      <div className="w-[50px]">
                        {employee.picture == null ? (
                          <img
                            src="/images/userr.png"
                            className="mr-2 h-[40px] w-[40px] rounded-full"
                            alt="#"
                          />
                        ) : (
                          <img
                            src={employee.picture}
                            className="mr-2 h-[40px] w-[40px] rounded-full"
                            alt="#"
                          />
                        )}
                      </div>
                      <p className="text-textSecondary"> {employee.name} </p>
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.gender}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.nationality}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.number}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={`/employee/view-employee/${employee.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="rounded-lg bg-error px-2 py-1 font-semibold text-white shadow-lg delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        Lock
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(data?.data.content.length == 0 || data == null) && (
            <div className="flex w-full justify-center py-3 text-center text-[18px] font-semibold">
              There is No Data
            </div>
          )}
        </div>
        <div className="relative overflow-auto">
          <Pagination
            totalPages={data?.data.totalPages}
            elementsPerPage={rowsPerPage}
            onChangeElementsPerPage={onElementChange}
            currentPage={currentPage}
            onChangePage={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Employee;
