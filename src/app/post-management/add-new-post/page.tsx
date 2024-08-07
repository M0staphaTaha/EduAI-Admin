"use client"
import { useCreatePostsMutation } from "@/features/communication/postApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddNewPost = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createPost, {isLoading}] = useCreatePostsMutation();

    const onSubmit = async (data: any) => {
        // Create FormData object
        const formData = new FormData();

        // Append JSON stringified post data
        const postData = {
            title_en: data.title_en,
            title_fr: data.title_fr,
            title_ar: data.title_ar,
            content_en: data.content_en,
            content_fr: data.content_fr,
            content_ar: data.content_ar
        };
        formData.append('post', JSON.stringify(postData));

        // Append file data
        if (data.files && data.files[0]) {
            formData.append('files', data.files[0]);
        }

        try {
            await createPost(formData).unwrap();
            toast.success("Create post Success");
        } catch (err) {
            console.error("Failed to create post", err);
            toast.error("Failed to create post");
        }
    };

    return (
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-20`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid p-10 rounded-xl bg-white gap-3">
                    <div className="p-10 rounded-xl border border-[#d7dbe0]">
                        <div className="w-full flex justify-between font-semibold text-[18px] mb-10 items-center">
                            <h1 className="text-[20px]">Title</h1>
                            <button className="flex gap-2" type="submit">
                                <svg className="h-6 w-6 text-[#09244b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
                                {isLoading?
                                "Saving...": "Save"}
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
                                {errors.title_en && <span className="text-red-500">{errors.title_en.message?.toString()}</span>}
                            </label>
                            <label className="grid">
                                Title (français)
                                <input
                                    type="text"
                                    placeholder="Write Title"
                                    {...register("title_fr", { required: "Title in French is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.title_fr && <span className="text-red-500">{errors.title_fr.message?.toString()}</span>}
                            </label>
                            <label className="grid">
                                Title (Arabic)
                                <input
                                    type="text"
                                    placeholder="Write Title"
                                    {...register("title_ar", { required: "Title in Arabic is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.title_ar && <span className="text-red-500">{errors.title_ar.message?.toString()}</span>}
                            </label>
                            <label className="grid">
                                Content (English)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_en", { required: "Content in English is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_en && <span className="text-red-500">{errors.content_en.message?.toString()}</span>}
                            </label>
                            <label className="grid">
                                Content (français)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_fr", { required: "Content in French is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_fr && <span className="text-red-500">{errors.content_fr.message?.toString()}</span>}
                            </label>
                            <label className="grid">
                                Content (Arabic)
                                <input
                                    type="text"
                                    placeholder="Write Content"
                                    {...register("content_ar", { required: "Content in Arabic is required" })}
                                    className="px-3 py-2 h-[60px] rounded-lg border border-[#d7dbe0] outline-none"
                                />
                                {errors.content_ar && <span className="text-red-500">{errors.content_ar.message?.toString()}</span>}
                            </label>
                        </div>
                    </div>
                    <div className="p-10 rounded-xl border border-[#d7dbe0]">
                        <div className="w-full flex justify-between font-semibold text-[18px] mb-10 items-center">
                            <h1 className="text-[20px]">Images or Videos</h1>
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
                                    <input {...register("files")}  id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddNewPost;
