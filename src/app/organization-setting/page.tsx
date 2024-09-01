"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const OrganizationSettings = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const currentLanguage = useSelector((state: RootState) => state.language.language);

    const settings = [
        {
            href: "/organization-setting/reports",
            imgSrc: "/images/reports.png",
            title: currentLanguage === "en"
                ? "Reports"
                : currentLanguage === "ar"
                ? "التقارير"
                : currentLanguage === "fr"
                ? "Rapports"
                : "Reports", // Default to English
            description: currentLanguage === "en"
                ? "All user Reports"
                : currentLanguage === "ar"
                ? "جميع تقارير المستخدمين"
                : currentLanguage === "fr"
                ? "Tous les rapports des utilisateurs"
                : "All user Reports", // Default to English
        },
        {
            href: "/organization-setting/permissions/department-permission",
            imgSrc: "/images/permetions.png",
            title: currentLanguage === "en"
                ? "Permission"
                : currentLanguage === "ar"
                ? "الصلاحيات"
                : currentLanguage === "fr"
                ? "Permissions"
                : "Permission", // Default to English
            description: currentLanguage === "en"
                ? "All Permissions"
                : currentLanguage === "ar"
                ? "جميع الصلاحيات"
                : currentLanguage === "fr"
                ? "Toutes les permissions"
                : "All Permissions", // Default to English
        },
        {
            href: "/organization-setting/semester",
            imgSrc: "/images/Semester.png",
            title: currentLanguage === "en"
                ? "Semester"
                : currentLanguage === "ar"
                ? "الفصل الدراسي"
                : currentLanguage === "fr"
                ? "Semestre"
                : "Semester", // Default to English
            description: currentLanguage === "en"
                ? "Enter semester information"
                : currentLanguage === "ar"
                ? "أدخل معلومات الفصل الدراسي"
                : currentLanguage === "fr"
                ? "Entrer les informations du semestre"
                : "Enter semester information", // Default to English
        },
        {
            href: "/organization-setting/department",
            imgSrc: "/images/exams.png",
            title: currentLanguage === "en"
                ? "Department"
                : currentLanguage === "ar"
                ? "القسم"
                : currentLanguage === "fr"
                ? "Département"
                : "Department", // Default to English
            description: currentLanguage === "en"
                ? "Enter Departments information"
                : currentLanguage === "ar"
                ? "أدخل معلومات الأقسام"
                : currentLanguage === "fr"
                ? "Entrer les informations des départements"
                : "Enter Departments information", // Default to English
        },
        {
            href: "/organization-setting/position",
            imgSrc: "/images/user.png",
            title: currentLanguage === "en"
                ? "Position"
                : currentLanguage === "ar"
                ? "المنصب"
                : currentLanguage === "fr"
                ? "Position"
                : "Position", // Default to English
            description: currentLanguage === "en"
                ? "Enter Position information"
                : currentLanguage === "ar"
                ? "أدخل معلومات المنصب"
                : currentLanguage === "fr"
                ? "Entrer les informations de poste"
                : "Enter Position information", // Default to English
        },
        {
            href: "/organization-setting/annual",
            imgSrc: "/images/events.png",
            title: currentLanguage === "en"
                ? "Annual Leave"
                : currentLanguage === "ar"
                ? "الإجازة السنوية"
                : currentLanguage === "fr"
                ? "Congé Annuel"
                : "Annual Leave", // Default to English
            description: currentLanguage === "en"
                ? "All Annual Leave"
                : currentLanguage === "ar"
                ? "كل الإجازات السنوية"
                : currentLanguage === "fr"
                ? "Tous les congés annuels"
                : "All Annual Leave", // Default to English
        },
    ];
    return (
        <>
        <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap`}>
        <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">
      {currentLanguage === "en"
        ? "Administration"
        : currentLanguage === "ar"
        ? "الإدارة"
        : currentLanguage === "fr"
        ? "Administration"
        : "Administration"} {/* Default to English */}
    </Link>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)' }}>
      <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
    </svg>
    <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/organization-setting">
      {currentLanguage === "en"
        ? "Organization Setting"
        : currentLanguage === "ar"
        ? "إعدادات المنظمة"
        : currentLanguage === "fr"
        ? "Paramètres de l'organisation"
        : "Organization Setting"} {/* Default to English */}
    </Link>
        </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    {settings.map((item, index) => (
                        <Card
                            key={index}
                            href={item.href}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default OrganizationSettings;