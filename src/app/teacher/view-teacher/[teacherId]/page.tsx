"use client";
import Calendar from "@/components/calendar";
import Spinner from "@/components/spinner";
import TeacherInfo from "@/components/teacherInfo";
import { useGetTeacherByIdQuery } from "@/features/User-Management/teacherApi";
import { useEffect } from "react";

interface ViewTeacherProps {
  params: {
    teacherId: string;
  };
}
const ViewTeacher: React.FC<ViewTeacherProps> = ({ params }) => {
  const { data, error, isLoading } = useGetTeacherByIdQuery(params.teacherId);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="grid py-4 lg:ml-[290px]">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <TeacherInfo data={data} />
          <div className="grid h-[700px] items-center justify-center gap-10 rounded-xl bg-bgPrimary p-5">
            <div className="flex justify-start">
              <h1 className="font-sans font-semibold text-textPrimary">
                Today Schedule
              </h1>
            </div>
            <Calendar />
          </div>
          <div className="grid w-[500px] rounded-xl bg-bgPrimary p-5 max-[1342px]:w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
                <thead className="bg-thead text-xs uppercase text-textPrimary">
                  <tr>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Full Name
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                    >
                      Nahda
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">C45121</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      This is text
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">kdsk</td>
                  </tr>
                  <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                    >
                      Nahda
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">C45121</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      This is text
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">sdsdd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTeacher;
