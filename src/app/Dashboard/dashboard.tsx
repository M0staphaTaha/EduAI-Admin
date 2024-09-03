"use client";

import dynamic from "next/dynamic";
import Calendar from "@/components/calendar";
import React, { useEffect, useState } from "react";
import Modal from "@/components/model";
import {
  useGetAllStudentsQuery,
  useGetAllEmployeesQuery,
  useGetAllTeachersQuery,
  useGetAllWorkersQuery,
  useGetEventsInMonthQuery,
} from "@/features/dashboard/dashboardApi";
import { format, parseISO } from "date-fns";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useCreateEventsMutation, useGetAllEventsDashboardQuery } from "@/features/events/eventsApi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const eventSchema = z.object({
  creatorId: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  title_en: z.string().optional(),
  title_ar: z.string().optional(),
  title_fr: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  description_fr: z.string().optional(),
  file: z.any().optional() // Include file in schema to handle it
});

const Dashboard: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const router = useRouter();

  const {
    data: events,
    isLoading: isEvents,
  } = useGetEventsInMonthQuery(null);
  const {
    data: students,
    error: err1,
    isLoading: isStudents,
  } = useGetAllStudentsQuery(null);
  const {
    data: employees,
    error: err2,
    isLoading: isEmployee,
  } = useGetAllEmployeesQuery(null);
  const {
    data: teachers,
    error: err3,
    isLoading: isTeacher,
  } = useGetAllTeachersQuery(null);
  const {
    data: workers,
    error: err4,
    isLoading: isWorker,
  } = useGetAllWorkersQuery(null);
  const {
    data: mettings,
    isLoading: isMeeting,
  } = useGetAllEventsDashboardQuery(null);
  // const { data: notices, isLoading: isNotices } = useGetAllNoticesQuery(null);
  const [createEvent] = useCreateEventsMutation();
  useEffect(() => {
    if (students || employees || teachers || workers || mettings) {
      console.log(teachers);
      console.log(employees);
      console.log(students);
      console.log(workers);
      console.log(mettings);
    }
  }, [
    router,
    students,
    employees,
    teachers,
    workers,
    err1,
    err2,
    err3,
    err4,
    mettings,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [series, setSeries] = useState([
    {
      name: "Expense",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Income",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  const onSubmit = async (formData: any) => {
    try {
      const formDataToSend = new FormData();
      // Create JSON object for request key
      const requestData = {
        creatorId: formData.creatorId,
        startTime: formData.startTime,
        endTime: formData.endTime,
        title_en: formData.title_en,
        title_ar: formData.title_ar,
        title_fr: formData.title_fr,
        description_en: formData.description_en,
        description_ar: formData.description_ar,
        description_fr: formData.description_fr,
      };
      toast.success("Event created success")
      // Append the JSON data as a string to FormData
      formDataToSend.append("request", JSON.stringify(requestData));
      
      // Append the file if it exists
      const file = formData.file?.[0];
      if (file) {
        formDataToSend.append("file", file); // Append the file correctly
      }
      
      const result = await createEvent(formDataToSend).unwrap();
      console.log("Event created:", result);
      handleCloseModal();
    } catch (error) {
      toast.error("Fiald Create Event")
      console.error("Failed to create event:", error);
    }
  };

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      width: 800,
      type: "area" as const,
    },
    colors: ["#f19b78", "#008FFB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
    },
    xaxis: {
      type: "datetime" as const,
      categories: [
        "2024-06-19T00:00:00.000Z",
        "2024-06-19T01:30:00.000Z",
        "2024-06-19T02:30:00.000Z",
        "2024-06-19T03:30:00.000Z",
        "2024-06-19T04:30:00.000Z",
        "2024-06-19T05:30:00.000Z",
        "2024-06-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  type Meeting = Record<string, any>;

  if (
    isStudents ||
    isEmployee ||
    isWorker ||
    isTeacher ||
    isEvents ||
    isMeeting
  )
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mr-10 grid w-full justify-center overflow-x-auto p-6">
      <div className="grid overflow-x-auto">
        <div className="mb-6 flex w-full justify-evenly gap-4 whitespace-nowrap max-[812px]:justify-center max-[576px]:h-[120px]">
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-white p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-gray-400">{students?.message} </p>
            <h1 className="text-[17px] font-semibold">{students?.data} 🧑‍🎓</h1>
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-white p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-gray-400">{employees?.message}</p>
            <h1 className="text-[17px] font-semibold">{employees?.data} 👨‍💼</h1>
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-white p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-gray-400">{teachers?.message}</p>
            <h1 className="text-[17px] font-semibold">{teachers?.data} 👨‍🏫</h1>
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-white p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-gray-400">{workers?.message}</p>
            <h1 className="text-[17px] font-semibold">{workers?.data} 🧑‍🏭</h1>
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-white p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-gray-400">Events</p>
            <h1 className="text-[17px] font-semibold">
              {events?.data}⏰{" "}
              {currentLanguage === "en"
                ? "in this month"
                : currentLanguage === "ar"
                  ? "هذا الشهر"
                  : currentLanguage === "fr"
                    ? "ce mois-ci"
                    : "in this month"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6 grid w-full grid-cols-1 justify-between gap-10 overflow-x-auto 2xl:flex">
        <div className="flex overflow-x-auto rounded-xl max-[1535px]:justify-center">
          <div
            id="chart"
            className="w-[850px] overflow-x-auto rounded-xl bg-white p-2 shadow-xl"
          >
            <p className="text-[18px] font-semibold">
              {" "}
              {currentLanguage === "en"
                ? "School Finance"
                : currentLanguage === "ar"
                  ? "مالية المدرسة"
                  : currentLanguage === "fr"
                    ? "Finance de l'école"
                    : "School Finance"}
            </p>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              width={options.chart.width}
              height={options.chart.height}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid overflow-x-auto rounded-2xl">
            <div className="grid w-[550px] items-center justify-center overflow-x-auto rounded-2xl bg-white p-2 shadow-xl max-[1536px]:h-[450px] max-[1536px]:w-[850px]">
              {mettings?.data.content.map((meeting: Meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-evenly"
                >
                  <div className="mr-3 h-[75px] w-[66px] items-center justify-center rounded-xl bg-[#F9DCA4] p-2 text-center">
                    <h1 className="text-[18px] font-semibold text-[#F79009]">
                      {format(parseISO(meeting.startDate), 'd')}
                    </h1>
                    <h1 className="text-[18px] font-semibold text-[#F79009]">
                    {format(parseISO(meeting.startDate), 'EEE')}

                    </h1>
                  </div>
                  <div className="grid w-[150px] gap-2">
                    <p className="text-[13px] text-[#F79009]">{format(parseISO(meeting.startDate), 'dd - MMMM - yyyy')}
                    </p>
                    <p className="text-[16px] text-gray-400">{meeting.title}</p>
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-[#F79009]"
                        style={{ width: `22%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-3 grid w-[200px] gap-8">
                    <p className="text-[13px] text-[#F79009]">
                      {format(parseISO(meeting.startDate), "hh:mm a")} -{" "}
                      {format(parseISO(meeting.endDate), "hh:mm a")}
                    </p>
                    <p className="text-[16px] text-gray-600">
                      23 Intersted in the event
                    </p>
                  </div>
                </div>
              ))}
              <div className="grid justify-center">
                <button
                  onClick={handleOpenModal}
                  className=" mr-3 w-[120px] whitespace-nowrap rounded-xl bg-[#3E5AF0] px-1 py-1.5 text-[14px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  + New Event
                </button>
              </div>
              <div className="flex justify-end text-end">
                <Link href="/educational-affairs/events" className="text-blue-500 underline font-semibold">More Events</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid w-full grid-cols-1 justify-between gap-10 overflow-x-auto 2xl:flex">
        <div className="grid overflow-x-auto rounded-2xl">
          <div className="flex w-[850px] justify-center overflow-x-auto rounded-2xl bg-white shadow-xl max-[1536px]:w-full">
            <Calendar />
          </div>
        </div>
        <div className="grid overflow-x-auto rounded-xl">
          <div className="grid w-[550px] overflow-x-auto rounded-xl bg-white p-2 shadow-xl max-[1536px]:w-full">
            <p className="text-[20px] font-bold">
              {currentLanguage === "en"
                ? "Notice Board"
                : currentLanguage === "ar"
                  ? "لوحة الإعلانات"
                  : currentLanguage === "fr"
                    ? "Tableau d'affichage"
                    : "Notice Board"}
            </p>
            <div className="">
              <h1 className="text-[18px] font-semibold text-[#F79009]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#3E5AF0]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#57b843]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#f03f3f]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#F79009]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#3E5AF0]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-[#57b843]">
                Leslie Alexander
              </h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="mb-4 text-xl font-light">Create Event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5" encType="multipart/form-data">
            {/* Creator ID */}
            <div className="mb-4">
              <input
                type="number"
                {...register("creatorId")}
                placeholder="Creator ID"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.creatorId && <p className="text-red-500">{errors.creatorId.message as string}</p>}
            </div>

            {/* Start Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("startTime")}
                placeholder="Start Time"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startTime && <p className="text-red-500">{errors.startTime.message as string}</p>}
            </div>

            {/* End Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("endTime")}
                placeholder="End Time"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endTime && <p className="text-red-500">{errors.endTime.message as string}</p>}
            </div>

            {/* Title in English */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_en")}
                placeholder="Title (English)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_en && <p className="text-red-500">{errors.title_en.message as string}</p>}
            </div>

            {/* Title in Arabic */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_ar")}
                placeholder="Title (Arabic)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_ar && <p className="text-red-500">{errors.title_ar.message as string}</p>}
            </div>

            {/* Title in French */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_fr")}
                placeholder="Title (French)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_fr && <p className="text-red-500">{errors.title_fr.message as string}</p>}
            </div>

            {/* Description in English */}
            <div className="mb-4">
              <input
                {...register("description_en")}
                placeholder="Description (English)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_en && <p className="text-red-500">{errors.description_en.message as string}</p>}
            </div>

            {/* Description in Arabic */}
            <div className="mb-4">
              <input
                {...register("description_ar")}
                placeholder="Description (Arabic)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_ar && <p className="text-red-500">{errors.description_ar.message as string}</p>}
            </div>

            {/* Description in French */}
            <div className="mb-4">
              <input
                {...register("description_fr")}
                placeholder="Description (French)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_fr && <p className="text-red-500">{errors.description_fr.message as string}</p>}
            </div>

            {/* File Input */}
            <div className="mb-4">
              <input
                type="file"
                {...register("file")}
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && <p className="text-red-500">{errors.file.message as string}</p>}
            </div>

            <div className="flex justify-between">
              <button type="submit" className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl">
                Add
              </button>
              <button
                onClick={handleCloseModal}
                className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#e44949] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#af4747] hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
    </div>
  );
};

export default Dashboard;
