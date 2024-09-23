"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateDriversMutation } from "@/features/User-Management/driverApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useGetAllSchoolsQuery } from "@/features/attendance/attendanceApi";

const AddNewDriver = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
  const { data: schoolData, isLoading: isSchool } = useGetAllSchoolsQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createDriver, { isLoading }] = useCreateDriversMutation();
  const { data: rigiond } = useGetAllReginionIDQuery(null);

  const onSubmit = async (data: any) => {
    try {
      await createDriver(data).unwrap();
      toast.success("Driver created successfully");
    } catch (err) {
      toast.error(
        "Failed to create Driver: you may enter the password incorrectly ",
      );
    }
  };

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
      nameEn: "Driver",
      nameAr: "السائق",
      nameFr: "Chauffeur",
      href: "/driver",
    },
    {
      nameEn: "New Driver",
      nameAr: "سائق جديد",
      nameFr: "Nouveau Chauffeur",
      href: "/add-new-driver",
    },
  ];

  if (nationalityLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10 grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-hover"
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
                {currentLanguage === "en"
                  ? "Driver Information"
                  : currentLanguage === "ar"
                    ? "معلومات السائق"
                    : currentLanguage === "fr"
                      ? "Informations sur le conducteur"
                      : "Driver Information"}{" "}
                {/* default */}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="username"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Username"
                  : currentLanguage === "ar"
                    ? "اسم المستخدم"
                    : currentLanguage === "fr"
                      ? "Nom d'utilisateur"
                      : "Username"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="email"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Email"
                  : currentLanguage === "ar"
                    ? "البريد الإلكتروني"
                    : currentLanguage === "fr"
                      ? "E-mail"
                      : "Email"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Password"
                  : currentLanguage === "ar"
                    ? "كلمة المرور"
                    : currentLanguage === "fr"
                      ? "Mot de passe"
                      : "Password"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "NID"
                  : currentLanguage === "ar"
                    ? "الرقم الوطني"
                    : currentLanguage === "fr"
                      ? "NID"
                      : "NID"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Gender"
                  : currentLanguage === "ar"
                    ? "النوع"
                    : currentLanguage === "fr"
                      ? "Genre"
                      : "Gender"}{" "}
                {/* default */}
                <select
                  id="gender"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option selected value="">
                    {currentLanguage === "en"
                      ? "Select gender"
                      : currentLanguage === "ar"
                        ? "اختر النوع"
                        : currentLanguage === "fr"
                          ? "Sélectionner le genre"
                          : "Select gender"}{" "}
                    {/* default */}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "en"
                      ? "Male"
                      : currentLanguage === "ar"
                        ? "ذكر"
                        : currentLanguage === "fr"
                          ? "Homme"
                          : "Male"}{" "}
                    {/* default */}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "en"
                      ? "Female"
                      : currentLanguage === "ar"
                        ? "أنثى"
                        : currentLanguage === "fr"
                          ? "Femme"
                          : "Female"}{" "}
                    {/* default */}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>

              <label
                htmlFor="religion"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Religion"
                  : currentLanguage === "ar"
                    ? "الدين"
                    : currentLanguage === "fr"
                      ? "Religion"
                      : "Religion"}{" "}
                {/* default */}
                <select
                  id="religion"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("religion", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select religion"
                      : currentLanguage === "ar"
                        ? "اختر الدين"
                        : currentLanguage === "fr"
                          ? "Sélectionner la religion"
                          : "Select religion"}{" "}
                    {/* default */}
                  </option>
                  <option value="MUSLIM">
                    {currentLanguage === "en"
                      ? "Muslim"
                      : currentLanguage === "ar"
                        ? "مسلم"
                        : currentLanguage === "fr"
                          ? "Musulman"
                          : "Muslim"}{" "}
                    {/* default */}
                  </option>
                  <option value="CHRISTIAN">
                    {currentLanguage === "en"
                      ? "Christian"
                      : currentLanguage === "ar"
                        ? "مسيحي"
                        : currentLanguage === "fr"
                          ? "Chrétien"
                          : "Christian"}{" "}
                    {/* default */}
                  </option>
                  <option value="OTHERS">
                    {currentLanguage === "en"
                      ? "Others"
                      : currentLanguage === "ar"
                        ? "أخرى"
                        : currentLanguage === "fr"
                          ? "Autres"
                          : "Others"}{" "}
                    {/* default */}
                  </option>
                </select>
                {errors.religion && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="nationality"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Your Nationality"
                  : currentLanguage === "ar"
                    ? "جنسيتك"
                    : currentLanguage === "fr"
                      ? "Votre nationalité"
                      : "Your Nationality"}{" "}
                {/* default */}
                <select
                  id="nationality"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nationality", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Nationality"
                      : currentLanguage === "ar"
                        ? "اختر الجنسية"
                        : currentLanguage === "fr"
                          ? "Sélectionner la nationalité"
                          : "Select Nationality"}{" "}
                    {/* default */}
                  </option>
                  {nationalityData &&
                    Object.entries(nationalityData.data).map(([key, value]) => (
                      <option key={key} value={key}>
                        {currentLanguage === "en"
                          ? String(value)
                          : currentLanguage === "ar"
                            ? String(value)
                            : currentLanguage === "fr"
                              ? String(value)
                              : String(value)}{" "}
                        {/* default */}
                      </option>
                    ))}
                </select>
                {errors.nationality && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>

              <label
                htmlFor="regionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Region Id"
                  : currentLanguage === "ar"
                    ? "معرف المنطقة"
                    : currentLanguage === "fr"
                      ? "ID de la région"
                      : "Region Id"}{" "}
                {/* default */}
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
                  {rigiond &&
                    rigiond.data.map(
                      (
                        rigion: {
                          id: string | number | readonly string[] | undefined;
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
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>

              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name (EN)"
                  : currentLanguage === "ar"
                    ? "الاسم (بالإنجليزية)"
                    : currentLanguage === "fr"
                      ? "Nom (EN)"
                      : "Name (EN)"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="name_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name (AR)"
                  : currentLanguage === "ar"
                    ? "الاسم (بالعربية)"
                    : currentLanguage === "fr"
                      ? "Nom (AR)"
                      : "Name (AR)"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name (FR)"
                  : currentLanguage === "ar"
                    ? "الاسم (بالفرنسية)"
                    : currentLanguage === "fr"
                      ? "Nom (FR)"
                      : "Name (FR)"}{" "}
                {/* default */}
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
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>

              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "About"
                  : currentLanguage === "ar"
                    ? "عن"
                    : currentLanguage === "fr"
                      ? "À propos"
                      : "About"}{" "}
                {/* default */}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("about", { required: true })}
                />
                {errors.about && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
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
                      : "Date Of Birth"}{" "}
                {/* default */}
                <input
                  id="birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", { required: true })}
                />
                {errors.birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="qualification"
                className="mt-4 grid items-center font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Qualification"
                  : currentLanguage === "ar"
                    ? "المؤهل"
                    : currentLanguage === "fr"
                      ? "Qualification"
                      : "Qualification"}{" "}
                {/* default */}
                <select
                  defaultValue=""
                  id="qualification"
                  {...register("qualification", { required: true })}
                  className="h-[55px] w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Qualification"
                      : currentLanguage === "ar"
                        ? "اختر المؤهل"
                        : currentLanguage === "fr"
                          ? "Sélectionner la qualification"
                          : "Select Qualification"}{" "}
                    {/* default */}
                  </option>
                  <option value="HIGH_SCHOOL_DIPLOMA">
                    {currentLanguage === "en"
                      ? "High School Diploma"
                      : currentLanguage === "ar"
                        ? "دبلوم المدرسة الثانوية"
                        : currentLanguage === "fr"
                          ? "Diplôme de secondaire"
                          : "High School Diploma"}{" "}
                    {/* default */}
                  </option>
                  <option value="MASTER_DEGREE">
                    {currentLanguage === "en"
                      ? "Master Degree"
                      : currentLanguage === "ar"
                        ? "درجة الماجستير"
                        : currentLanguage === "fr"
                          ? "Master"
                          : "Master Degree"}{" "}
                    {/* default */}
                  </option>
                  <option value="BACHELOR_DEGREE">
                    {currentLanguage === "en"
                      ? "Bachelor Degree"
                      : currentLanguage === "ar"
                        ? "درجة البكالوريوس"
                        : currentLanguage === "fr"
                          ? "Licence"
                          : "Bachelor Degree"}{" "}
                    {/* default */}
                  </option>
                  <option value="DOCTORATE_DEGREE">
                    {currentLanguage === "en"
                      ? "Doctorate Degree"
                      : currentLanguage === "ar"
                        ? "درجة الدكتوراه"
                        : currentLanguage === "fr"
                          ? "Doctorat"
                          : "Doctorate Degree"}{" "}
                    {/* default */}
                  </option>
                </select>
                {errors.qualification && (
                  <span className="text-[18px] text-error">
                    {currentLanguage === "en"
                      ? "Qualification is required"
                      : currentLanguage === "ar"
                        ? "المؤهل مطلوب"
                        : currentLanguage === "fr"
                          ? "La qualification est requise"
                          : "Qualification is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="hireDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Hire Date"
                  : currentLanguage === "ar"
                    ? "تاريخ التوظيف"
                    : currentLanguage === "fr"
                      ? "Date d'embauche"
                      : "Hire Date"}{" "}
                {/* default */}
                <input
                  id="hireDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("hireDate", { required: true })}
                />
                {errors.hireDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="number"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Mobile"
                  : currentLanguage === "ar"
                    ? "الهاتف المحمول"
                    : currentLanguage === "fr"
                      ? "Mobile"
                      : "Mobile"}{" "}
                {/* default */}
                <input
                  id="number"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="positionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Position Id"
                  : currentLanguage === "ar"
                    ? "رقم الوظيفة"
                    : currentLanguage === "fr"
                      ? "ID de position"
                      : "Position Id"}{" "}
                {/* default */}
                <input
                  id="positionId"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("positionId", { required: true })}
                />
                {errors.positionId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="salary"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Salary"
                  : currentLanguage === "ar"
                    ? "الراتب"
                    : currentLanguage === "fr"
                      ? "Salaire"
                      : "Salary"}{" "}
                {/* default */}
                <input
                  id="salary"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("salary", { required: true })}
                />
                {errors.salary && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                    {/* default */}
                  </span>
                )}
              </label>
            </div>
            <div className="flex justify-center text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-[180px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {isLoading
                  ? currentLanguage === "en"
                    ? "Adding..."
                    : currentLanguage === "ar"
                      ? "يتم الإضافة..."
                      : currentLanguage === "fr"
                        ? "Ajout en cours..."
                        : "Adding..." // default
                  : currentLanguage === "en"
                    ? "Add Driver"
                    : currentLanguage === "ar"
                      ? "إضافة سائق"
                      : currentLanguage === "fr"
                        ? "Ajouter un conducteur"
                        : "Add Driver"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewDriver;
