"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateParticipationsMutation } from "@/features/Document-Management/participationApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const AddNewParticipation = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createCertificate, { isLoading }] = useCreateParticipationsMutation();

  const onSubmit = async (formData: any) => {
    const data = new FormData();
    data.append(
      "certificate",
      JSON.stringify({
        userId: formData.userId,
        title_en: formData.title_en,
        title_ar: formData.title_ar,
        title_fr: formData.title_fr,
        issueDate: formData.issueDate,
      }),
    );
    data.append("file", formData.file[0]); // Assuming 'endDate' is the file input

    try {
      await createCertificate(data).unwrap();
      toast.success("Certificate created successfully");
    } catch (err) {
      toast.error("Failed to create Certificate");
    }
  };

  return (
    <>
      <div
        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-[900px] items-center justify-center gap-5 rounded-xl bg-white p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-[800px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="3" y1="21" x2="21" y2="21" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="5 6 12 3 19 6" />
                <line x1="4" y1="10" x2="4" y2="21" />
                <line x1="20" y1="10" x2="20" y2="21" />
                <line x1="8" y1="14" x2="8" y2="17" />
                <line x1="12" y1="14" x2="12" y2="17" />
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="font-sans text-[22px] font-semibold">
                Participation Certificates
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="userId"
                className="grid font-sans text-[18px] font-semibold"
              >
                User Id
                <input
                  id="userId"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("userId", { required: true })}
                />
                {errors.userId && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="title_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                Title (en)
                <input
                  id="title_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("title_en", { required: true })}
                />
                {errors.title_en && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="title_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                Title (ar)
                <input
                  id="title_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("title_ar", { required: true })}
                />
                {errors.title_ar && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="title_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                Title (fr)
                <input
                  id="title_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("title_fr", { required: true })}
                />
                {errors.title_fr && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="issueDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                Graduation Semester
                <input
                  id="issueDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("issueDate", { required: true })}
                />
                {errors.issueDate && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="file"
                className="grid font-sans text-[18px] font-semibold"
              >
                Document
                <input
                  id="file"
                  type="file"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("file", { required: true })}
                />
                {errors.file && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-[140px] rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewParticipation;
