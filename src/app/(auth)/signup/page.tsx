/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetAllNationalitysQuery,
  useSignupApiDashboardMutation,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

// Define the validation schema using Zod
const signupSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  nid: z.string().nonempty("NID is required"),
  regionId: z.string().nonempty("Region ID is required"),
  gender: z.string().nonempty("Gender is required"),
  religion: z.string().nonempty("Religion is required"),
  number: z.string().nonempty("Number is required"),
  nationality: z.string().nonempty("Nationality is required"),
  employeeType: z.string().nonempty("Employee type is required"),
  qualification: z.string().nonempty("Qualification is required"),
  birthDate: z.string().nonempty("Birthdate is required"),
  name_en: z.string().nonempty("English name is required"),
  name_ar: z.string().nonempty("Arabic name is required"),
  name_fr: z.string().nonempty("French name is required"),
  schoolId: z.string().nonempty("School ID is required"),
  about: z.string().nonempty("About ID is required"),
});

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [loginDashboard, { isLoading, error }] =
    useSignupApiDashboardMutation();
  const {
    data: nationalityData,
    error: nationalityError,
    isLoading: nationalityLoading,
  } = useGetAllNationalitysQuery(null);
  const { data: rigiond } = useGetAllReginionIDQuery(null);

  useEffect(() => {
    if (nationalityData) {
      console.log("Response Data:", nationalityData);
    }
    if (nationalityError) {
      console.log("Error:", nationalityError);
    }
  }, [nationalityData, nationalityError]);

  const onSubmit = async (data: any) => {
    try {
      const result = await loginDashboard(data).unwrap();
      console.log("Account created successfully:", result);
      toast.success("Account created successfully");
      router.replace("/login");
    } catch (err) {
      toast.error((err as any).data?.message || "Failed to create account");
      console.error("Failed to create account:", err);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.warn("Please complete all required inputs");
    }
  }, [errors]);

  if (nationalityLoading)
    return (
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-white duration-300 ease-in max-[1040px]:grid-cols-1">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-white px-4 duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div>
            <img
              className="absolute left-5 top-5"
              src="images/logo.png"
              alt="#"
            />
          </div>
          <div className="mb-5 grid">
            <h1 className="font-sans text-[28px] font-bold text-[#041631]">
              Sign Up
            </h1>
            <p className="font-sans text-[20px] font-semibold text-[#526484]">
              Sign up to enjoy the application
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="grid w-full grid-cols-1 gap-3">
                  <label
                    htmlFor="username"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="username"
                      {...register("username", { required: true })}
                      placeholder=" username"
                      className={`rounded-xl border px-4 py-3 ${errors.username ? "border-[#d74f41]" : "border-zinc-300"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.username && (
                      <span className="text-[13px] text-[#e81123]">
                        Username is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="email"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="email"
                      {...register("email", { required: true })}
                      placeholder=" email"
                      className={`rounded-xl border px-4 py-3 ${errors.email ? "border-[#d74f41]" : "border-zinc-300"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="email"
                    />
                    {errors.email && (
                      <span className="text-[13px] text-[#e81123]">
                        Email is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="password"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="password"
                      {...register("password", { required: true })}
                      placeholder=" password"
                      className={`rounded-xl border px-4 py-3 ${errors.password ? "border-[#d74f41]" : "border-zinc-300"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="password"
                    />
                    {errors.password && (
                      <span className="text-[13px] text-[#e81123]">
                        Password must be at least 8 characters long 123 (@_#*&)
                        A_Z a_z
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="nid"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="nid"
                      {...register("nid", { required: true })}
                      placeholder=" NID"
                      className={`rounded-xl border px-4 py-3 ${errors.nid ? "border-[#d74f41]" : "border-zinc-300"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="number"
                    />
                    {errors.nid && (
                      <span className="text-[13px] text-[#e81123]">
                        NID is Required
                      </span>
                    )}
                  </label>
                  <div className="mt-12 flex w-full justify-end gap-3">
                    <p className="flex w-[120px] cursor-no-drop items-center justify-center gap-2 rounded-xl border border-[#e6e8e7] bg-white px-3 py-2 font-semibold text-[#367aff]">
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      Previous
                    </p>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handleNext}
                    >
                      Next
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="regionId"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="regionId"
                      {...register("regionId", { required: true })}
                      className={`border ${errors.regionId ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select Region Id{" "}
                      </option>
                      {rigiond &&
                        rigiond.data.map(
                          (
                            rigion: {
                              id:
                                | string
                                | number
                                | readonly string[]
                                | undefined;
                              name:
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | Promise<React.AwaitedReactNode>
                                | null
                                | undefined;
                            },
                            index: React.Key | null | undefined,
                          ) => (
                            <option key={index} value={rigion.id}>
                              {rigion.name}
                            </option>
                          ),
                        )}
                    </select>
                    {errors.regionId && (
                      <span className="text-[13px] text-[#e81123]">
                        regionId is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="gender"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="gender"
                      {...register("gender", { required: true })}
                      className={`border ${errors.gender ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select gender{" "}
                      </option>
                      <option value="MALE">Male </option>
                      <option value="FEMALE">Female </option>
                    </select>
                    {errors.gender && (
                      <span className="text-[13px] text-[#e81123]">
                        Gender is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="religion"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="religion"
                      {...register("religion", { required: true })}
                      className={`border ${errors.religion ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select religion{" "}
                      </option>
                      <option value="MUSLIM">Muslim </option>
                      <option value="CHRISTIAN">Christian </option>
                      <option value="OTHERS">Others </option>
                    </select>
                    {errors.religion && (
                      <span className="text-[13px] text-[#e81123]">
                        Religion is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="number"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="number"
                      {...register("number", { required: true })}
                      placeholder=" number"
                      className={`rounded-xl border px-4 py-3 ${errors.number ? "border-[#d74f41]" : "border-zinc-300"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="number"
                    />
                    {errors.number && (
                      <span className="text-[13px] text-[#e81123]">
                        number is Required
                      </span>
                    )}
                  </label>
                  <div className="mt-12 flex w-full justify-end gap-3">
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      Previous
                    </button>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handleNext}
                    >
                      Next
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="nationality"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="nationality"
                      {...register("nationality", { required: true })}
                      className={`border ${errors.nationality ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select Nationality{" "}
                      </option>
                      {nationalityData &&
                        Object.entries(nationalityData.data).map(
                          ([key, value]) => (
                            <option key={String(value)} value={key}>
                              {String(value)}
                            </option>
                          ),
                        )}
                    </select>
                    {errors.nationality && (
                      <span className="text-[13px] text-[#e81123]">
                        Nationality is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="employeeType"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="religion"
                      {...register("employeeType", { required: true })}
                      className={`border ${errors.employeeType ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select religion{" "}
                      </option>
                      <option value="EMPLOYEE">Employee </option>
                      <option value="DRIVER">Driver </option>
                      <option value="WORKER">Worker </option>
                    </select>
                    {errors.employeeType && (
                      <span className="text-[13px] text-[#e81123]">
                        Employee Type is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="qualification"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="qualification"
                      {...register("qualification", { required: true })}
                      className={`border ${errors.qualification ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-[#9a9a9a] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        Select religion{" "}
                      </option>
                      <option value="HIGH_SCHOOL_DIPLOMA">
                        High School Diploma{" "}
                      </option>
                      <option value="MASTER_DEGREE">Master Degree </option>
                      <option value="BACHELOR_DEGREE">Bachelor Degree </option>
                      <option value="DOCTORATE_DEGREE">
                        Doctorate Degree{" "}
                      </option>
                    </select>
                    {errors.qualification && (
                      <span className="text-[13px] text-[#e81123]">
                        Qualification is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="birthDate"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    Birthday
                    <input
                      id="birthDate"
                      {...register("birthDate", { required: true })}
                      placeholder=" NID"
                      className={`w-[400px] rounded-xl border px-4 py-3 max-[458px]:w-[350px] ${errors.birthDate ? "border-[#d74f41]" : "border-zinc-300"} outline-none`}
                      type="date"
                    />
                    {errors.birthDate && (
                      <span className="text-[13px] text-[#e81123]">
                        birthDate is Required
                      </span>
                    )}
                  </label>
                  <div className="mt-12 flex w-full justify-end gap-3">
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      Previous
                    </button>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handleNext}
                    >
                      Next
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="name_en"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_en"
                      {...register("name_en", { required: true })}
                      placeholder=" English Name"
                      className={`w-[400px] rounded-xl border px-4 py-3 ${errors.name_en ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_en && (
                      <span className="text-[13px] text-[#e81123]">
                        English Name is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="name_ar"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_ar"
                      {...register("name_ar", { required: true })}
                      placeholder=" Arabic Name"
                      className={`w-[400px] rounded-xl border px-4 py-3 ${errors.name_ar ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_ar && (
                      <span className="text-[13px] text-[#e81123]">
                        Arabic Name is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="name_fr"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_fr"
                      {...register("name_fr", { required: true })}
                      placeholder=" French Name"
                      className={`w-[400px] rounded-xl border px-4 py-3 ${errors.name_fr ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_fr && (
                      <span className="text-[13px] text-[#e81123]">
                        French Name is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="schoolId"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="schoolId"
                      {...register("schoolId", { required: true })}
                      placeholder=" schoolId"
                      className={`w-[400px] rounded-xl border px-4 py-3 ${errors.schoolId ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[458px]:w-[350px]`}
                      type="number"
                    />
                    {errors.schoolId && (
                      <span className="text-[13px] text-[#e81123]">
                        schoolId is Required
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="about"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <textarea
                      id="about"
                      {...register("about", { required: true })}
                      placeholder=" about"
                      className={`w-[400px] rounded-xl border px-4 py-3 max-[458px]:w-[350px] ${errors.about ? "border-[#d74f41]" : "border-zinc-300"} outline-none`}
                    />
                    {errors.about && (
                      <span className="text-[13px] text-[#e81123]">
                        about is Required
                      </span>
                    )}
                  </label>
                  <div className="mt-12 flex w-full justify-end gap-3">
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      Previous
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-[#367aff] px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                    >
                      {isLoading ? " Loading..." : "SignUp"}
                    </button>
                  </div>
                </div>
              )}
              {error && (
                <p className="font-semibold text-[#e81123]">
                  You may not have completed the data or entered it correctly!
                </p>
              )}
              <div className="mt-4 flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-[#526484]">
                  Already have an account?
                </p>
                <a
                  href="/login"
                  className="flex font-sans font-medium text-[#367aff] hover:underline"
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end max-[1040px]:hidden">
          <img
            className="h-[928px] w-[600px]"
            src="images/signup.png"
            alt="#"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
