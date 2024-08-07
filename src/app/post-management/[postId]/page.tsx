"use client"
import { useGetPostByIdQuery, useUpdatePostsMutation, useUpdatePostsFilesMutation } from "@/features/communication/postApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import Spinner from "@/components/spinner";

interface EditPostProps {
    params: {
        postId: string;
    };
}

interface TextFormData {
    title_en: string;
    title_fr: string;
    title_ar: string;
    content_en: string;
    content_fr: string;
    content_ar: string;
}

interface FileFormData {
    file: FileList;
}

const EditPost = ({ params }: EditPostProps) => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data: post, isLoading } = useGetPostByIdQuery(params.postId);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TextFormData>();
    const { register: registerFile, handleSubmit: handleSubmitFile, formState: { errors: fileErrors } } = useForm<FileFormData>();
    const [updatePost] = useUpdatePostsMutation();
    const [updatePostFiles] = useUpdatePostsFilesMutation();

    useEffect(() => {
        if (post) {
            setValue("title_en", post.data.title_en);
            setValue("title_fr", post.data.title_fr);
            setValue("title_ar", post.data.title_ar);
            setValue("content_en", post.data.content_en);
            setValue("content_fr", post.data.content_fr);
            setValue("content_ar", post.data.content_ar);
        }
    }, [post, setValue]);

    const onSubmitText: SubmitHandler<TextFormData> = async (data) => {
        try {
            await updatePost({ formData: data, id: params.postId }).unwrap();
            // Handle successful post update (e.g., show a success message or redirect)
        } catch (err) {
            console.error("Failed to update post", err);
        }
    };

    const onSubmitFile: SubmitHandler<FileFormData> = async (data) => {
        const fileData = { file: data.file[0] };
        try {
            await updatePostFiles({ formData: fileData, id: params.postId }).unwrap();
            // Handle successful file update (e.g., show a success message or redirect)
        } catch (err) {
            console.error("Failed to update files", err);
        }
    };

    if (isLoading) return (
    <div className="h-screen w-full justify-center items-center flex ">
        <Spinner />
    </div>

    )

    return (
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-20`}>
            <form onSubmit={handleSubmit(onSubmitText)}>
                <div className="grid p-10 rounded-xl bg-white gap-3">
                    <div className="p-10 rounded-xl border border-[#d7dbe0]">
                        <div className="w-full flex justify-between font-semibold text-[18px] mb-10 items-center">
                            <h1 className="text-[20px]">Title</h1>
                            <button className="flex gap-2" type="submit">
                                <svg className="h-6 w-6 text-[#09244b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-2 max-[614px]:grid-cols-1 gap-3 font-semibold">
                            <label className="grid">
                                Title (English)
                                <input
                                    type="text"
                                    placeholder="Write Title"
                                    {...register("title_en", { required: "Title in English is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.title_en && <span className="text-red-500">{errors.title_en.message}</span>}
                            </label>
                            <label className="grid">
                                Title (français)
                                <input
                                    type="text"
                                    placeholder="Write Title"
                                    {...register("title_fr", { required: "Title in French is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.title_fr && <span className="text-red-500">{errors.title_fr.message}</span>}
                            </label>
                            <label className="grid">
                                Title (Arabic)
                                <input
                                    type="text"
                                    placeholder="Write Title"
                                    {...register("title_ar", { required: "Title in Arabic is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.title_ar && <span className="text-red-500">{errors.title_ar.message}</span>}
                            </label>
                            <label className="grid">
                                Content (English)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_en", { required: "Content in English is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_en && <span className="text-red-500">{errors.content_en.message}</span>}
                            </label>
                            <label className="grid">
                                Content (français)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_fr", { required: "Content in French is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_fr && <span className="text-red-500">{errors.content_fr.message}</span>}
                            </label>
                            <label className="grid">
                                Content (Arabic)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_ar", { required: "Content in Arabic is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_ar && <span className="text-red-500">{errors.content_ar.message}</span>}
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleSubmitFile(onSubmitFile)}>
                <div className="p-10 rounded-xl border border-[#d7dbe0]">
                    <div className="w-full flex justify-between font-semibold text-[18px] mb-10 items-center">
                        <h1 className="text-[20px]">Images or Videos</h1>
                        <button className="flex gap-2" type="submit">
                            <svg className="h-6 w-6 text-[#09244b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Edit
                        </button>
                    </div>
                    <div className="flex justify-center gap-3 font-semibold">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" {...registerFile("file", { required: "File is required" })} className="hidden" />
                            </label>
                            {fileErrors.file && <span className="text-red-500">{fileErrors.file.message}</span>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
