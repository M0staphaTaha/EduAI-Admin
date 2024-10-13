"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateStudentsMutation } from "@/features/User-Management/studentApi";
import { useGetAllParentsQuery } from "@/features/User-Management/parentApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

const AddNewStudent = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "User Management",
      nameAr: "إدارة المستخدمين",
      nameFr: "Gestion des utilisateurs",
      href: "/user-management",
    },
    {
      nameEn: "Student",
      nameAr: "الطالب",
      nameFr: "Étudiant",
      href: "/student",
    },
    {
      nameEn: "Add New Student",
      nameAr: "إضافة طالب جديد",
      nameFr: "Ajouter un nouvel étudiant",
      href: "/add-new-student",
    },
  ];
  const [
    studentCertificatesOfAchievement,
    setStudentCertificatesOfAchievement,
  ] = useState("");
  const [studentProfilePhoto, setStudentProfilePhoto] = useState("");
  const [studentIdPhoto, setStudentIdPhoto] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (
    event: any,
    setFileName: (name: string) => void,
  ) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
  const { data: regionData } = useGetAllReginionIDQuery(null);
  const { data: parentData, isLoading: parentLoading } = useGetAllParentsQuery({
    archived: "false",
    page: 0,
    size: 1000000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createStudent, { isLoading }] = useCreateStudentsMutation();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        parentId: data.parentId, // Include parentId from the select dropdown
        username: data.username,
        email: data.email,
        password: data.password,
        nid: data.nid,
        gender: data.gender,
        religion: data.religion,
        nationality: data.nationality,
        regionId: data.regionId,
        name_en: data.name_en,
        name_ar: data.name_ar,
        name_fr: data.name_fr,
        about: data.about,
        number: data.number,
        birthDate: data.birthDate,
        relationshipToStudent: data.relationshipToStudent,
        studyLevel: data.studyLevel,
        eduSystemId: data.eduSystemId,
      }),
    );

    // Append file inputs
    if (data.studentIdPhoto && data.studentIdPhoto[0])
      formData.append("studentIdPhoto", data.studentIdPhoto[0]);
    if (data.studentProfilePhoto && data.studentProfilePhoto[0])
      formData.append("studentProfilePhoto", data.studentProfilePhoto[0]);
    if (
      data.studentCertificatesOfAchievement &&
      data.studentCertificatesOfAchievement[0]
    )
      formData.append(
        "studentCertificatesOfAchievement",
        data.studentCertificatesOfAchievement[0],
      );

    try {
      await createStudent(formData).unwrap();
      toast.success("Student created successfully");
    } catch {
      toast.error("Failed to create student");
    }
  };

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (nationalityLoading || parentLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mx-[10px] grid items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10 grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              {/* Parent ID dropdown */}
              <label
                htmlFor="parentId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Parent"
                  : currentLanguage === "ar"
                    ? "الوالد"
                    : "Parent"}
                <select
                  id="parentId"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("parentId", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Parent"
                      : currentLanguage === "ar"
                        ? "اختر الوالد"
                        : "Sélectionner un parent"}
                  </option>
                  {parentData &&
                    parentData?.data.content?.map((parent: any) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                </select>
                {errors.parentId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Username */}
              <label
                htmlFor="username"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Username" : "اسم المستخدم"}
                <input
                  id="username"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Email */}
              <label
                htmlFor="email"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Email" : "البريد الإلكتروني"}
                <input
                  id="email"
                  type="email"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Password */}
              <label
                htmlFor="password"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Password" : "كلمة المرور"}
                <input
                  id="password"
                  type="password"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* NID */}
              <label
                htmlFor="nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "National ID" : "رقم الهوية"}
                <input
                  id="nid"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Gender */}
              <label
                htmlFor="gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Gender" : "الجنس"}
                <select
                  id="gender"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select gender"
                      : currentLanguage === "ar"
                        ? "اختر الجنس"
                        : "Sélectionner le genre"}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "en" ? "Male" : "ذكر"}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "en" ? "Female" : "أنثى"}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Religion */}
              <label
                htmlFor="religion"
                className="hidden font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Religion" : "الدين"}
                <select
                  id="religion"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("religion", { required: true })}
                >
                  <option value="OTHERS">
                    {currentLanguage === "en" ? "Others" : "أخرى"}
                  </option>
                </select>
                {errors.religion && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Nationality */}
              <label
                htmlFor="nationality"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Nationality" : "الجنسية"}
                <select
                  id="nationality"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nationality", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Nationality"
                      : "اختر الجنسية"}
                  </option>
                  {nationalityData &&
                    Object.entries(nationalityData.data).map(([key, value]) => (
                      <option key={key} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.nationality && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Region */}
              <label
                htmlFor="regionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Region" : "المنطقة"}
                <select
                  defaultValue=""
                  id="regionId"
                  {...register("regionId", { required: true })}
                  className={`border ${errors.regionId ? "border-borderPrimary" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-[18px] text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Region Id"
                      : currentLanguage === "ar"
                        ? "اختر معرف المنطقة"
                        : currentLanguage === "fr"
                          ? "Sélectionner l'ID de la région"
                          : "Select Region Id"}{" "}
                    {/* default */}
                  </option>
                  {regionData &&
                    regionData.data.map(
                      (
                        rigion: {
                          regionName: string;
                          cityName: string;
                          regionId: string | number | readonly string[] | undefined;
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
                        <option key={index} value={rigion.regionId}>
                          {rigion.cityName} <strong>{rigion.regionName}</strong>
                        </option>
                      ),
                    )}
                </select>
                {errors.regionId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Name (English) */}
              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name (English)"
                  : "الاسم (إنجليزي)"}
                <input
                  id="name_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_en", { required: true })}
                />
                {errors.name_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Name (Arabic) */}
              <label
                htmlFor="name_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Name (Arabic)" : "الاسم (عربي)"}
                <input
                  id="name_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_ar", { required: true })}
                />
                {errors.name_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Name (French) */}
              <label
                htmlFor="name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Name (French)" : "الاسم (فرنسي)"}
                <input
                  id="name_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_fr", { required: true })}
                />
                {errors.name_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* About */}
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "About" : "نبذة"}
                <textarea
                  id="about"
                  className="h-[100px] w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("about")}
                />
                {errors.about && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Phone Number */}
              <label
                htmlFor="number"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Phone Number" : "رقم الهاتف"}
                <input
                  id="number"
                  type="tel"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Birth Date */}
              <label
                htmlFor="birthDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Date Of Birth"
                  : currentLanguage === "ar"
                    ? "تاريخ الميلاد"
                    : currentLanguage === "fr"
                      ? "Date de naissance"
                      : "Date Of Birth"}
                <input
                  id="birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", {
                    required: true,
                    validate: value => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      const isOlderThanSix =
                        age > 6 ||
                        (age === 6 &&
                          today >=
                            new Date(
                              birthDate.setFullYear(today.getFullYear()),
                            ));
                      return isOlderThanSix;
                    },
                  })}
                />
                {errors.birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? errors.birthDate.type === "validate"
                        ? "The Student Must be older than 6"
                        : "This field is required"
                      : currentLanguage === "ar"
                        ? errors.birthDate.type === "validate"
                          ? "يجب أن يكون عمر الطالب أكبر من 6 سنوات"
                          : "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? errors.birthDate.type === "validate"
                            ? "L'étudiant doit avoir plus de 6 ans"
                            : "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>

              {/* Relationship to Student */}
              <label
                htmlFor="relationshipToStudent"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Relationship to Student"
                  : "العلاقة بالطالب"}
                <input
                  id="relationshipToStudent"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("relationshipToStudent", { required: true })}
                />
                {errors.relationshipToStudent && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Study Level */}
              <label
                htmlFor="studyLevel"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en" ? "Study Level" : "مستوى الدراسة"}
                <input
                  id="studyLevel"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("studyLevel", { required: true })}
                />
                {errors.studyLevel && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Educational System */}
              <label
                htmlFor="eduSystemId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Educational System"
                  : "النظام التعليمي"}
                <input
                  type="text"
                  id="eduSystemId"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("eduSystemId", { required: true })}
                />
                {errors.eduSystemId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Student ID Photo */}
              <label
                htmlFor="studentIdPhoto"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "صورة بطاقة الطالب"
                  : currentLanguage === "fr"
                    ? "Photo de la carte d'étudiant"
                    : "Student ID Photo"}

                <input
                  id="studentIdPhoto"
                  type="file"
                  className="cursor-pointer opacity-0"
                  {...register("studentIdPhoto")}
                  onChange={e => handleFileChange(e, setStudentIdPhoto)}
                />
                <span className="-mt-8 w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentIdPhoto
                      ? studentIdPhoto
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>

              {/* Student Profile Photo */}

              <label
                htmlFor="studentProfilePhoto"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "صورة ملف الطالب"
                  : currentLanguage === "fr"
                    ? "Photo de profil étudiant"
                    : "Student Profile Photo"}

                <input
                  id="studentProfilePhoto"
                  type="file"
                  className="cursor-pointer opacity-0"
                  {...register("studentProfilePhoto")}
                  onChange={e => handleFileChange(e, setStudentProfilePhoto)}
                />
                <span className="-mt-8 w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentProfilePhoto
                      ? studentProfilePhoto
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>
              <label
                htmlFor="studentCertificatesOfAchievement"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Certificates Of Achievement"
                  : currentLanguage === "ar"
                    ? "شهادات إنجاز الطالب"
                    : currentLanguage === "fr"
                      ? "Certificats de réussite de l'étudiant"
                      : "Student Certificates Of Achievement"}
                <input
                  id="studentCertificatesOfAchievement"
                  type="file"
                  className="cursor-pointer opacity-0"
                  {...register("studentCertificatesOfAchievement")}
                  onChange={e =>
                    handleFileChange(e, setStudentCertificatesOfAchievement)
                  }
                />
                <span className="-mt-8 w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentCertificatesOfAchievement
                      ? studentCertificatesOfAchievement
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>
            </div>

            <div className="flex justify-center text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-fit rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {isLoading
                  ? currentLanguage === "en"
                    ? "Adding..."
                    : currentLanguage === "ar"
                      ? "جارٍ الإضافة..."
                      : "Ajout en cours..."
                  : currentLanguage === "en"
                    ? "Add Student"
                    : currentLanguage === "ar"
                      ? "إضافة طالب"
                      : "Ajouter un étudiant"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewStudent;
