"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "@/components/spinner";
import { useCreateDepartmentsMutation } from "@/features/Organization-Setteings/departmentApi";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { useGetAllRolesQuery } from '@/features/signupApi';
const AddDepartment = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data, isLoading: isRoles } = useGetAllRolesQuery(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createDepartment, { isLoading }] = useCreateDepartmentsMutation();

    const onSubmit = async (formData: any) => {
        try {
            const processedData = {
                ...formData,
                roles: Array.isArray(formData.roles) ? formData.roles : [formData.roles]
            };
            await createDepartment(processedData).unwrap();
            toast.success('Department created successfully');
        } catch (err) {
            toast.error('Failed to create Department');
        }
    };
    
    if (isRoles)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
    );

    return (
        <>
            <div className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid justify-center items-center mt-10`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] gap-5 md:w-[600px] sm:w-[500px]">
                        <div className="flex items-center justify-start gap-2">
                            <svg className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="3" y1="21" x2="21" y2="21" />  <line x1="3" y1="10" x2="21" y2="10" />  <polyline points="5 6 12 3 19 6" />  <line x1="4" y1="10" x2="4" y2="21" />  <line x1="20" y1="10" x2="20" y2="21" />  <line x1="8" y1="14" x2="8" y2="17" />  <line x1="12" y1="14" x2="12" y2="17" />  <line x1="16" y1="14" x2="16" y2="17" /></svg>
                            <h1 className="text-[22px] font-sans font-semibold">Department Information</h1>
                        </div>
                        <div className=" grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="name_en" className="grid text-[18px] font-sans font-semibold">
                                Full Name (English)
                                <input id="name_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_en", { required: true })} />
                                {errors.name_en && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="name_fr" className="grid text-[18px] font-sans font-semibold">
                                Nom Complet  (français)
                                <input id="name_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_fr", { required: true })} />
                                {errors.name_fr && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="name_ar" className="grid text-[18px] font-sans font-semibold">
                                الأسم كامل (بالعربي)
                                <input id="name_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_ar", { required: true })} />
                                {errors.name_ar && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="description_en" className="grid text-[18px] font-sans font-semibold">
                                Description (English)
                                <input id="description_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("description_en", { required: true })} />
                                {errors.description_en && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="description_fr" className="grid text-[18px] font-sans font-semibold">
                                Description (Français)
                                <input id="description_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("description_fr", { required: true })} />
                                {errors.description_fr && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="description_ar" className="grid text-[18px] font-sans font-semibold">
                                الوصف (بالعربي)
                                <input id="description_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("description_ar", { required: true })} />
                                {errors.description_ar && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="abbreviation_en" className="grid text-[18px] font-sans font-semibold">
                                Abbreviation (English)
                                <input id="abbreviation_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("abbreviation_en", { required: true })} />
                                {errors.abbreviation_en && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="abbreviation_fr" className="grid text-[18px] font-sans font-semibold">
                                Abréviation (Français)
                                <input id="abbreviation_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("abbreviation_fr", { required: true })} />
                                {errors.abbreviation_fr && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="abbreviation_ar" className="grid text-[18px] font-sans font-semibold">
                                اختصار (بالعربي)
                                <input id="abbreviation_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("abbreviation_ar", { required: true })} />
                                {errors.abbreviation_ar && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="headId" className="grid text-[18px] font-sans font-semibold">
                                HeadId
                                <input id="headId" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("headId", { required: true })} />
                                {errors.headId && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="roles" className="grid text-[18px] font-sans font-semibold">
                                Employee
                            <select defaultValue="" id="roles" {...register("roles", { required: true })} className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]">
                                <option selected value="">Select Nationality </option>
                                {data &&
                                    Object.entries(data.data).map(([key, value]) => (
                                        <option key={String(value)} value={key}>
                                            {String(value)}
                                        </option>
                                    ))}
                            </select>
                                {errors.roles && <span className="text-red-600">This field is required</span>}
                            </label>
                        </div>
                        <div className="flex justify-center text-center">
                            {
                                isLoading ? <Spinner /> :
                                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300">Save</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddDepartment;