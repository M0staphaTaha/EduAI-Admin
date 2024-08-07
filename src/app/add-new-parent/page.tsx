"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "@/components/spinner";
import { useCreateParentsMutation } from "@/features/User-Management/parentApi";
import { useGetAllNationalitysQuery, useGetAllReginionIDQuery } from "@/features/signupApi";
import { toast } from "react-toastify";
import { RootState } from '@/GlobalRedux/store';
import { useSelector } from 'react-redux';

const AddNewParent = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data: nationalityData, isLoading: nationalityLoading } = useGetAllNationalitysQuery(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createEmployee, { isLoading }] = useCreateParentsMutation();
    const { data: rigiond } = useGetAllReginionIDQuery(null);

    const onSubmit = async (data: any) => {
        try {
            await createEmployee(data).unwrap();
            toast.success('parent created successfully');
        } catch (err) {
            toast.error('Failed to create parent: ');
        }
    };

    if (nationalityLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );
    return (
<div className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid justify-center items-center`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] my-10 gap-5 md:w-[600px] sm:w-[500px]">
          <div className="flex items-center justify-start gap-2">
            <svg className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
            <h1 className="text-[22px] font-sans font-semibold">Parent Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="username" className="grid text-[18px] font-sans font-semibold">
            Username
              <input id="username" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("username", { required: true })} />
              {errors.username && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="email" className="grid text-[18px] font-sans font-semibold">
              Email
              <input id="email" type="email" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("email", { required: true })} />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="password" className="grid text-[18px] font-sans font-semibold">
            Password
              <input id="password" type="password" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("password", { required: true })} />
              {errors.password && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="nid" className="grid text-[18px] font-sans font-semibold">
              NID
              <input id="nid" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("nid", { required: true })} />
              {errors.nid && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="gender" className="grid text-[18px] font-sans font-semibold">
              Gender
              <select id="gender" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("gender", { required: true })}>
                <option selected value="">Select gender </option>
                <option  value="MALE">Male </option>
                <option  value="FEMALE">Female </option>
              </select>
              {errors.gender && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="religion" className="grid text-[18px] font-sans font-semibold">
            Religion
              <select id="religion" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("religion", { required: true })}>
                <option selected value="">Select religion </option>
                <option  value="MUSLIM">Muslim </option>
                <option  value="CHRISTIAN">Christian </option>
                <option  value="OTHERS">Others </option>
              </select>
              {errors.religion && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="nationality" className="grid text-[18px] font-sans font-semibold">
              Your Nationality
              <select id="nationality" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("nationality", { required: true })}>
                <option value="">Select Nationality</option>
                {nationalityData && Object.entries(nationalityData.data).map(([key, value]) => (
                  <option key={key} value={key}>
                    {String(value)}
                  </option>
                ))}
              </select>
              {errors.nationality && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="regionId" className="grid text-[18px] font-sans font-semibold">
            RegionId
            <select defaultValue="" id="regionId" {...register("regionId", { required: true })} className={`border ${errors.regionId ? "border-[#d74f41]" : "border-zinc-300"} text-[#000000] text-[18px] outline-none rounded-xl w-[400px] max-[458px]:w-[350px] h-full py-3 px-4 `}>
                                            <option selected value="">Select Region Id </option>
                                            {rigiond &&
                                                rigiond.data.map((rigion: { id: string | number | readonly string[] | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                                                    <option key={index} value={rigion.id}>
                                                        {rigion.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
              {errors.regionId && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_en" className="grid text-[18px] font-sans font-semibold">
            Name EN
              <input id="name_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_en", { required: true })} />
              {errors.name_en && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_en" className="grid text-[18px] font-sans font-semibold">
            Name AR
              <input id="name_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_ar", { required: true })} />
              {errors.name_ar && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_fr" className="grid text-[18px] font-sans font-semibold">
            Name FR
              <input id="name_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_fr", { required: true })} />
              {errors.name_fr && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="about_en" className="grid text-[18px] font-sans font-semibold">
            About EN
              <input id="about_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("about_en", { required: true })} />
              {errors.about_en && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="about_ar" className="grid text-[18px] font-sans font-semibold">
            About AR
              <input id="about_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("about_ar", { required: true })} />
              {errors.about_ar && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="about_fr" className="grid text-[18px] font-sans font-semibold">
            About FR
              <input id="about_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("about_fr", { required: true })} />
              {errors.about_fr && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="occupation_en" className="grid text-[18px] font-sans font-semibold">
            Occupation EN
              <input id="occupation_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("occupation_en", { required: true })} />
              {errors.occupation_en && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="occupation_ar" className="grid text-[18px] font-sans font-semibold">
            Occupation AR
              <input id="occupation_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("occupation_ar", { required: true })} />
              {errors.occupation_ar && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="occupation_fr" className="grid text-[18px] font-sans font-semibold">
            Occupation FR
              <input id="occupation_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("occupation_fr", { required: true })} />
              {errors.occupation_fr && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="birthDate" className="grid text-[18px] font-sans font-semibold">
              Date Of Birth
              <input id="birthDate" type="date" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("birthDate", { required: true })} />
              {errors.birthDate && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="qualification" className="grid items-center text-[18px] font-sans font-semibold">
            Qualification
                <select defaultValue="" id="qualification" {...register("qualification", { required: true })} className="w-[400px] h-[55px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]">
                    <option selected value="">Select qualification </option>
                    <option  value="HIGH_SCHOOL_DIPLOMA">High School Diploma </option>
                    <option  value="MASTER_DEGREE">Master Degree </option>
                    <option  value="BACHELOR_DEGREE">Bachelor Degree </option>
                    <option  value="DOCTORATE_DEGREE">Doctorate Degree </option>
                </select>
                {errors.qualification && <span className="text-[#e81123] text-[18px]">Qualification is Required</span>}
            </label>
            <label htmlFor="number" className="grid text-[18px] font-sans font-semibold">
              Mobile
              <input id="number" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("number", { required: true })} />
              {errors.number && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          <div className="flex justify-center text-center">
            <button disabled={isLoading} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[180px] ease-in duration-300">
              {isLoading ? " Adding..." : "Add Parent"}
            </button>
          </div>
        </div>
      </form>
    </div>
    );
}

export default AddNewParent;