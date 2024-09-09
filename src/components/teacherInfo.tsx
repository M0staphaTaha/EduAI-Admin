/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

const TeacherInfo = ({ data }: { data: any }) => {
  return (
    <>
      <div className="grid rounded-xl bg-bgPrimary p-5">
        <div className="flex justify-between">
          <h1 className="font-sans font-semibold text-textPrimary">
            Teacher Information
          </h1>
          <Link href={`/edit-teacher/${data.data.id}`}>
            <svg
              className="h-6 w-6 text-textPrimary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
        </div>

        <div className="grid items-center justify-center text-center">
          {data.data.picture == null ? (
            <img
              src="/images/userr.png"
              className="mr-2 h-[120px] w-[120px] rounded-full"
              alt="#"
            />
          ) : (
            <img
              src={data.data.picture}
              className="mr-2 h-[120px] w-[120px] rounded-full"
              alt="#"
            />
          )}
          <h1 className="font-sans font-semibold text-textPrimary">
            {data.data.name}
          </h1>
          <p className="font-sans font-semibold text-textPrimary">
            {" "}
            <span className="font-sans font-semibold text-textSecondary">
              Teacher ID :
            </span>
            {data.data.id}
          </p>
        </div>

        <div className="grid justify-start">
          <h1 className="font-sans text-[22px] font-semibold text-textPrimary">
            Basic Details
          </h1>
          <div className="grid w-[400px] grid-cols-2 max-[485px]:w-[240px]">
            <h3 className="font-sans font-semibold text-textSecondary">
              Email:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.email}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Salary:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.salary == null ? `Not specified` : data.data.salary}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Date Of Birth:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.birthDate}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Gender:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              nationality:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.nationality}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Gender:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Qualification:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.qualification}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Religion:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.religion}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Address:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              13,street, Zamalk,Cairo
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Mobile:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.number}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1">
          <p className="font-sans text-[20px] font-semibold text-textPrimary">
            About the Teacher:
          </p>
          <p className="mb-5 font-sans text-[16px] font-semibold text-textSecondary">
            {data.data.about}
          </p>
        </div>
      </div>
    </>
  );
};

export default TeacherInfo;
