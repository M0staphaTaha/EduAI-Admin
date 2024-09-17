"use client";
import {
  useGetPostByIdQuery,
  useUpdatePostsMutation,
  useUpdatePostsFilesMutation,
} from "@/features/communication/postApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import Spinner from "@/components/spinner";
import BreadCrumbs from "@/components/BreadCrumbs";

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
  const breadcrumbs = [
    {
      nameEn: "Communication",
      nameAr: "التواصل",
      nameFr: "Communication",
      href: "/",
    },
    {
      nameEn: "Post Management",
      nameAr: "إدارة المشاركات",
      nameFr: "Gestion des publications",
      href: "/post-management",
    },
    {
      nameEn: `${params.postId}`,
      nameAr: `${params.postId}`,
      nameFr: `${params.postId}`,
      href: `/post-management/${params.postId}`,
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data: post, isLoading } = useGetPostByIdQuery(params.postId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TextFormData>();
  const {
    register: registerFile,
    handleSubmit: handleSubmitFile,
    formState: { errors: fileErrors },
  } = useForm<FileFormData>();
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

  const onSubmitText: SubmitHandler<TextFormData> = async data => {
    try {
      await updatePost({ formData: data, id: params.postId }).unwrap();
      // Handle successful post update (e.g., show a success message or redirect)
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  const onSubmitFile: SubmitHandler<FileFormData> = async data => {
    const fileData = { file: data.file[0] };
    try {
      await updatePostFiles({ formData: fileData, id: params.postId }).unwrap();
      // Handle successful file update (e.g., show a success message or redirect)
    } catch (err) {
      console.error("Failed to update files", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-20`}
      >
        <form onSubmit={handleSubmit(onSubmitText)}>
          <div className="grid gap-3 rounded-xl bg-bgPrimary p-10">
            <div className="rounded-xl border border-borderPrimary bg-bgPrimary p-10">
              <div className="mb-10 flex w-full items-center justify-between text-[18px] font-semibold">
                <h1 className="text-[20px]">
                  {currentLanguage === "ar"
                    ? "العنوان"
                    : currentLanguage === "fr"
                      ? "Titre"
                      : "Title"}
                </h1>
                <button className="flex gap-2" type="submit">
                  <svg
                    className="h-6 w-6 text-[#09244b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  {currentLanguage === "ar"
                    ? "تعديل"
                    : currentLanguage === "fr"
                      ? "Modifier"
                      : "Edit"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 font-semibold max-[614px]:grid-cols-1">
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "العنوان (بالإنجليزية)"
                    : currentLanguage === "fr"
                      ? "Titre (Anglais)"
                      : "Title (English)"}
                  <input
                    type="text"
                    placeholder={
                      currentLanguage === "ar"
                        ? "اكتب العنوان"
                        : currentLanguage === "fr"
                          ? "Écrire le titre"
                          : "Write Title"
                    }
                    {...register("title_en", {
                      required: currentLanguage === "ar"
                        ? "العنوان بالإنجليزية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le titre en anglais est requis"
                          : "Title in English is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />

                  {errors.title_en && (
                    <span className="text-error">
                      {errors.title_en.message}
                    </span>
                  )}
                </label>
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "العنوان (بالفرنسية)"
                    : currentLanguage === "fr"
                      ? "Titre (français)"
                      : "Title (français)"}
                  <input
                    type="text"
                    placeholder={currentLanguage === "ar"
                      ? "اكتب العنوان"
                      : currentLanguage === "fr"
                        ? "Écrire le titre"
                        : "Write Title"}
                    {...register("title_fr", {
                      required: currentLanguage === "ar"
                        ? "العنوان بالفرنسية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le titre en français est requis"
                          : "Title in French is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.title_fr && (
                    <span className="text-error">
                      {errors.title_fr.message}
                    </span>
                  )}
                </label>
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "العنوان (بالعربية)"
                    : currentLanguage === "fr"
                      ? "Titre (arabe)"
                      : "Title (Arabic)"}
                  <input
                    type="text"
                    placeholder={currentLanguage === "ar"
                      ? "اكتب العنوان"
                      : currentLanguage === "fr"
                        ? "Écrire le titre"
                        : "Write Title"}
                    {...register("title_ar", {
                      required: currentLanguage === "ar"
                        ? "العنوان بالعربية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le titre en arabe est requis"
                          : "Title in Arabic is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.title_ar && (
                    <span className="text-error">
                      {errors.title_ar.message}
                    </span>
                  )}
                </label>
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "المحتوى (بالإنجليزية)"
                    : currentLanguage === "fr"
                      ? "Contenu (Anglais)"
                      : "Content (English)"}
                  <input
                    type="text"
                    placeholder={currentLanguage === "ar"
                      ? "اكتب المحتوى"
                      : currentLanguage === "fr"
                        ? "Écrire le contenu"
                        : "Write Content"}
                    {...register("content_en", {
                      required: currentLanguage === "ar"
                        ? "المحتوى بالإنجليزية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le contenu en anglais est requis"
                          : "Content in English is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_en && (
                    <span className="text-error">
                      {errors.content_en.message}
                    </span>
                  )}
                </label>
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "المحتوى (بالفرنسية)"
                    : currentLanguage === "fr"
                      ? "Contenu (français)"
                      : "Content (français)"}
                  <input
                    type="text"
                    placeholder={currentLanguage === "ar"
                      ? "اكتب المحتوى"
                      : currentLanguage === "fr"
                        ? "Écrire le contenu"
                        : "Write Content"}
                    {...register("content_fr", {
                      required: currentLanguage === "ar"
                        ? "المحتوى بالفرنسية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le contenu en français est requis"
                          : "Content in French is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_fr && (
                    <span className="text-error">
                      {errors.content_fr.message}
                    </span>
                  )}
                </label>
                <label className="grid">
                  {currentLanguage === "ar"
                    ? "المحتوى (بالعربية)"
                    : currentLanguage === "fr"
                      ? "Contenu (arabe)"
                      : "Content (Arabic)"}
                  <input
                    type="text"
                    placeholder={currentLanguage === "ar"
                      ? "اكتب المحتوى"
                      : currentLanguage === "fr"
                        ? "Écrire le contenu"
                        : "Write Content"}
                    {...register("content_ar", {
                      required: currentLanguage === "ar"
                        ? "المحتوى بالعربية مطلوب"
                        : currentLanguage === "fr"
                          ? "Le contenu en arabe est requis"
                          : "Content in Arabic is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_ar && (
                    <span className="text-error">
                      {errors.content_ar.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handleSubmitFile(onSubmitFile)}>
          <div className="mt-[20px] rounded-xl border border-borderPrimary bg-bgPrimary p-10">
            <div className="mb-10 flex w-full items-center justify-between text-[18px] font-semibold">
              <h1 className="text-[20px]">
                {currentLanguage === "ar"
                  ? "الصور أو مقاطع الفيديو"
                  : currentLanguage === "fr"
                    ? "Images ou vidéos"
                    : "Images or Videos"}
              </h1>
              <button className="flex gap-2" type="submit">
                <svg
                  className="h-6 w-6 text-[#09244b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {currentLanguage === "ar"
                  ? "تعديل"
                  : currentLanguage === "fr"
                    ? "Modifier"
                    : "Edit"}
              </button>
            </div>
            <div className="flex justify-center gap-3 font-semibold">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-borderPrimary bg-bgPrimary hover:bg-bgSecondary"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-textSecondary"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-textSecondary">
                      {currentLanguage === "ar"
                        ? "انقر للرفع أو اسحب وأفلت"
                        : currentLanguage === "fr"
                          ? "Cliquez pour télécharger ou glissez-déposez"
                          : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-textSecondary">
                      {currentLanguage === "ar"
                        ? "SVG، PNG، JPG أو GIF (الحد الأقصى. 800x400 بكسل)"
                        : currentLanguage === "fr"
                          ? "SVG, PNG, JPG ou GIF (MAX. 800x400px)"
                          : "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    {...registerFile("file", { required: "File is required" })}
                    className="hidden"
                  />
                </label>
                {fileErrors.file && (
                  <span className="text-error">
                    {fileErrors.file.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPost;
