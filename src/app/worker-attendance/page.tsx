/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import {
  useCreateAttendanceMutation,
  useGetAllEmpolyeesAttendQuery,
  useUpdateAttendanceMutation,
} from "@/features/attendance/attendanceApi";
import Spinner from "@/components/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";

const WorkerAttendance = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  type Employee = Record<string, any>;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, isLoading, refetch } = useGetAllEmpolyeesAttendQuery({
    employeeType: "WORKER",
    role: "EMPLOYEE",
    page: currentPage,
    size: rowsPerPage,
  });
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [createAttendance] = useCreateAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();

  const handleSelect = (
    label: string,
    index: number,
    userId: undefined,
    driverStatus: string | null,
    attendenceId: number,
    checkin: Date,
    checkout: Date,
  ) => {
    setSelectedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = newStates[index] === label ? label : label; // Toggle selection
      return newStates;
    });

    const attendanceData = {
      userId: userId,
      attendenceId: attendenceId,
      status: label === "P" ? "PRESENT" : label === "A" ? "ABSENT" : "LEAVE",
      absenceReason: null,
      checkInTime: checkin,
      checkOutTime: checkout,
    };

    if (driverStatus === null) {
      // Use createAttendance if status is null
      createAttendance(attendanceData)
        .unwrap()
        .then(response => {
          console.log("Attendance recorded:", response);
          refetch();
          toast.success("Attendance recorded successfully");
        })
        .catch(error => {
          console.error("Failed to record attendance:", error);
          toast.error("Failed to record attendance");
        });
    } else {
      // Use updateAttendance if status is not null
      updateAttendance({
        formData: attendanceData,
        id: attendanceData.attendenceId,
      })
        .unwrap()
        .then(response => {
          console.log("Attendance updated:", response);
          refetch();
          toast.info("Attendance updated successfully");
        })
        .catch(error => {
          console.error("Failed to update attendance:", error);
          toast.error("Failed to update attendance");
        });
    }
  };

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

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="text-[18px] font-semibold text-secondary hover:text-blue-400 hover:underline"
          href="/"
        >
          Operations
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="text-[18px] font-semibold text-secondary hover:text-blue-400 hover:underline"
          href="/attendances"
        >
          Attendances
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-secondary hover:text-blue-400 hover:underline"
          href="/worker-attendance"
        >
          Worker
        </Link>
      </div>
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
                  className="size-4 flex-shrink-0 text-gray-400"
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
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {data?.data.content
            .filter((employee: Employee) => {
              return search.toLocaleLowerCase() === ""
                ? employee
                : employee.userFullName.toLocaleLowerCase().includes(search);
            })
            .map((employee: Employee, index: number) => (
              <div
                key={index}
                className="grid h-[320px] w-[300px] items-center justify-center rounded-xl bg-bgPrimary shadow-lg"
              >
                <div className="grid items-center justify-center gap-2 whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  <div className="grid w-[120px] items-center justify-center text-center">
                    <div className="flex justify-center">
                      {employee.picture == null ? (
                        <img
                          src="/images/userr.png"
                          className="h-[100px] w-[100px] rounded-full"
                          alt="#"
                        />
                      ) : (
                        <img
                          src={employee.picture}
                          className="h-[100px] w-[100px] rounded-full"
                          alt="#"
                        />
                      )}
                    </div>
                    <p className="mt-4 text-[22px]">
                      {" "}
                      {employee.userFullName}{" "}
                    </p>
                    <p className="whitespace-nowrap font-semibold text-[#526484]">
                      Worker: {employee.userId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-center">
                  {["P", "A", "L"].map(label => (
                    <label
                      key={label}
                      className={`flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full border p-5 text-center text-[24px] font-semibold ${
                        selectedStates[index] === label ||
                        (label === "P" && employee.status === "PRESENT") ||
                        (label === "L" && employee.status === "LEAVE") ||
                        (label === "A" && employee.status === "ABSENT")
                          ? label === "P"
                            ? "bg-green-300 text-white"
                            : label === "A"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-300 text-white"
                          : "bg-bgPrimary"
                      } `}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedStates[index] === label}
                        onChange={() =>
                          handleSelect(
                            label,
                            index,
                            employee.userId,
                            employee.status,
                            employee.attendanceId,
                            employee.checkInTime,
                            employee.checkOutTime,
                          )
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          {(data?.data.content.length == 0 || data == null) && (
            <div className="flex w-full justify-center py-3 text-center text-[18px] font-semibold">
              There is No Data
            </div>
          )}
        </div>
        <div className="relative overflow-auto">
          <Pagination
            totalPages={data?.data.totalPagesCount}
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

export default WorkerAttendance;
