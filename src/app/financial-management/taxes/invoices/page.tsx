/* eslint-disable @next/next/no-img-element */
"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Spinner from "@/components/spinner";
import { useGetAllFessTaxesQuery } from "@/features/Financial/taxesApi";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Invoices = () => {
  const { data, isLoading } = useGetAllFessTaxesQuery(null);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Financial Management",
      nameAr: "الإدارة المالية",
      nameFr: "Gestion financière",
      href: "/financial-management",
    },
    {
      nameEn: "Taxes",
      nameAr: "الضرائب",
      nameFr: "Impôts",
      href: "/financial-management/taxes",
    },
    {
      nameEn: "Invoices",
      nameAr: "الفواتير",
      nameFr: "Factures",
      href: "/financial-management/taxes/invoices",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  const taxFields = [
    { label: "Tuition Tax", type: data.data?.tuitionTaxType, value: data.data?.tuitionTaxValue, img: "/images/tuition.png" },
    { label: "Transport Tax", type: data.data?.transportTaxType, value: data.data?.transportTaxValue, img: "/images/buss.png" },
    { label: "Activity Tax", type: data.data?.activityTaxType, value: data.data?.activityTaxValue, img: "/images/calendar.png" },
    { label: "Material Tax", type: data.data?.materialTaxType, value: data.data?.materialTaxValue, img: "/images/tuition.png" },
    { label: "Uniform Tax", type: data.data?.uniformTaxType, value: data.data?.uniformTaxValue, img: "/images/uniform.png" },
    { label: "Library Tax", type: data.data?.libraryTaxType, value: data.data?.libraryTaxValue, img: "/images/folder2.png" },
    { label: "Examination Tax", type: data.data?.examinationTaxType, value: data.data?.examinationTaxValue, img: "/images/tuition.png" },
  ];

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${
          booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
        } relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <h1 className="text-[30px] font-bold mb-5 ml-8">
          {currentLanguage === "ar"
            ? "الضرائب"
            : currentLanguage === "fr"
              ? "Taxes"
              : "Taxes"}
        </h1>
        <div className="justify-left mb-5 ml-4 flex gap-5 text-[23px] font-semibold">
          <Link href="/financial-management/taxes">
            {currentLanguage === "en"
              ? "Paid Taxes"
              : currentLanguage === "ar"
              ? "الضرائب المدفوعة"
              : currentLanguage === "fr"
              ? "Taxes payées"
              : "Invoices"}{" "}
          </Link>
          <Link
            href="/financial-management/taxes/invoices"
            className="text-blue-500 underline"
          >
            {currentLanguage === "en"
              ? "Invoices Taxes"
              : currentLanguage === "ar"
              ? "ضرائب الفواتير "
              : currentLanguage === "fr"
              ? "Factures Taxes"
              : "Scholarship"}{" "}
          </Link>
        </div>

        <div className="flex flex-wrap gap-10 justify-center w-full">
          {taxFields.map((tax, index) => (
            <div
              key={index}
              className="bg-bgPrimary p-8 rounded-xl grid gap-4 w-[300px]"
            >
              <div className="flex justify-between font-semibold text-[20px]">
                <p className="flex gap-2">
              <img src={tax.img} alt="#" />
                  {tax.label}
                </p>
                <p>
                  {tax.value} {tax.type === "Percentage" ? "%" : "$"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Invoices;
