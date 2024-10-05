"use client";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaCar } from "react-icons/fa"; // Driver
import { FaUserTie } from "react-icons/fa"; // Employee
import { FaUserFriends } from "react-icons/fa"; // Parent
import { FaUserGraduate } from "react-icons/fa"; // Student
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher
import { FaTools } from "react-icons/fa"; // Worker
import { FaBus } from "react-icons/fa"; // Bus
import { FaBook } from "react-icons/fa"; // Library
import { FaDoorClosed } from "react-icons/fa"; // Room
import { FaClipboardList } from "react-icons/fa"; // Grades
import { FaBoxOpen } from "react-icons/fa"; // Resource
import { FaMoneyBillAlt } from "react-icons/fa"; // Fees
import BreadCrumbs from "@/components/BreadCrumbs";

const Archive = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Archive",
      nameAr: "الأرشيف",
      nameFr: "Archives",
      href: "/archive",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const items = [
    { href: "/archive/driver", icon: <FaCar size={40} />, key: "Driver" },
    {
      href: "/archive/employee",
      icon: <FaUserTie size={40} />,
      key: "Employee",
    },
    {
      href: "/archive/parent",
      icon: <FaUserFriends size={40} />,
      key: "Parent",
    },
    {
      href: "/archive/student",
      icon: <FaUserGraduate size={40} />,
      key: "Student",
    },
    {
      href: "/archive/teacher",
      icon: <FaChalkboardTeacher size={40} />,
      key: "Teacher",
    },
    { href: "/archive/worker", icon: <FaTools size={40} />, key: "Worker" },
    { href: "/bus", icon: <FaBus size={40} />, key: "Bus" },
    { href: "/book", icon: <FaBook size={40} />, key: "Library" },
    { href: "/rooms", icon: <FaDoorClosed size={40} />, key: "Room" },
    {
      href: "/educational-affairs/grads",
      icon: <FaClipboardList size={40} />,
      key: "Grades",
    },
    {
      href: "/course/resource",
      icon: <FaBoxOpen size={40} />,
      key: "Resource",
    },
    {
      href: "/financial-management",
      icon: <FaMoneyBillAlt size={40} />,
      key: "Fees",
    },
  ];

  const getTranslatedText = (key: string) => {
    switch (key) {
      case "Driver":
        return currentLanguage === "en"
          ? "Driver"
          : currentLanguage === "ar"
            ? "السائق"
            : currentLanguage === "fr"
              ? "Chauffeur"
              : "Driver";
      case "Employee":
        return currentLanguage === "en"
          ? "Employee"
          : currentLanguage === "ar"
            ? "الموظف"
            : currentLanguage === "fr"
              ? "Employé"
              : "Employee";
      case "Parent":
        return currentLanguage === "en"
          ? "Parent"
          : currentLanguage === "ar"
            ? "ولي الأمر"
            : currentLanguage === "fr"
              ? "Parent"
              : "Parent";
      case "Student":
        return currentLanguage === "en"
          ? "Student"
          : currentLanguage === "ar"
            ? "الطالب"
            : currentLanguage === "fr"
              ? "Étudiant"
              : "Student";
      case "Teacher":
        return currentLanguage === "en"
          ? "Teacher"
          : currentLanguage === "ar"
            ? "المعلم"
            : currentLanguage === "fr"
              ? "Enseignant"
              : "Teacher";
      case "Worker":
        return currentLanguage === "en"
          ? "Worker"
          : currentLanguage === "ar"
            ? "العامل"
            : currentLanguage === "fr"
              ? "Travailleur"
              : "Worker";
      case "Bus":
        return currentLanguage === "en"
          ? "Bus"
          : currentLanguage === "ar"
            ? "الحافلة"
            : currentLanguage === "fr"
              ? "Autobus"
              : "Bus";
      case "Library":
        return currentLanguage === "en"
          ? "Library"
          : currentLanguage === "ar"
            ? "المكتبة"
            : currentLanguage === "fr"
              ? "Bibliothèque"
              : "Library";
      case "Room":
        return currentLanguage === "en"
          ? "Room"
          : currentLanguage === "ar"
            ? "الغرفة"
            : currentLanguage === "fr"
              ? "Chambre"
              : "Room";
      case "Grades":
        return currentLanguage === "en"
          ? "Grades"
          : currentLanguage === "ar"
            ? "الدرجات"
            : currentLanguage === "fr"
              ? "Notes"
              : "Grades";
      case "Resource":
        return currentLanguage === "en"
          ? "Resource"
          : currentLanguage === "ar"
            ? "المصدر"
            : currentLanguage === "fr"
              ? "Ressource"
              : "Resource";
      case "Fees":
        return currentLanguage === "en"
          ? "Fees"
          : currentLanguage === "ar"
            ? "الرسوم"
            : currentLanguage === "fr"
              ? "Frais"
              : "Fees";
      default:
        return key; // Fallback to key if not found
    }
  };

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`
          ${currentLanguage === "ar" ?
            (booleanValue ? "lg:mr-[40px]" : "lg:mr-[290px]")
            : (booleanValue ? "lg:ml-[40px]" : "lg:ml-[290px]")}
          mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid h-[250px] w-[250px] items-center justify-center rounded-xl bg-bgPrimary shadow-lg"
            >
              <Link
                href={item.href}
                className="grid items-center justify-center text-center"
              >
                <div className="grid h-[87px] w-[87px] items-center justify-center rounded-full bg-bgSecondary">
                  {item.icon}
                </div>
                <p className="mt-2 text-[22px] font-semibold">
                  {getTranslatedText(item.key)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Archive;
