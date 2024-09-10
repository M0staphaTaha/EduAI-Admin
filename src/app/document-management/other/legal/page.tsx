/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";

const Legal = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Document Management",
      nameAr: "إدارة المستندات",
      nameFr: "Gestion des documents",
      href: "/document-management",
    },
    {
      nameEn: "Other Official Documents",
      nameAr: "وثائق رسمية أخرى",
      nameFr: "Autres documents officiels",
      href: "/document-management/other",
    },
    {
      nameEn: "Legal Documents",
      nameAr: "المستندات القانونية",
      nameFr: "Documents juridiques",
      href: "/document-management/other/legal",
    },
  ];
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectAll;
    });
  };

  useEffect(() => {
    const handleOtherCheckboxes = () => {
      const allCheckboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:not(#checkbox-all-search)',
      );
      const allChecked = Array.from(allCheckboxes).every(
        checkbox => checkbox.checked,
      );
      const selectAllCheckbox = document.getElementById(
        "checkbox-all-search",
      ) as HTMLInputElement | null;
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        setSelectAll(allChecked);
      }
    };

    const otherCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    otherCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", handleOtherCheckboxes);
    });

    return () => {
      otherCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener("change", handleOtherCheckboxes);
      });
    };
  }, []);

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg lg:ml-[270px]">
        <div className="flex justify-between text-center max-[502px]:grid max-[502px]:justify-center">
          <div className="mb-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                <svg
                  className="size-4 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/"
              className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              + Add Invoices
            </Link>
          </div>
        </div>
        <div className="justify-left mb-[80px] ml-4 mt-[50px] flex flex-wrap gap-5 text-[20px] font-semibold max-[725px]:text-[15px]">
          <Link href="/document-management/other">ID Cards</Link>
          <Link href="/document-management/other/medical">Medical Records</Link>
          <Link href="/document-management/other/disciplinary">
            Disciplinary Records
          </Link>
          <Link href="/document-management/other/financial">Financial Aid</Link>
          <Link
            href="/document-management/other/legal"
            className="text-blue-500 underline"
          >
            Legal Documents
          </Link>
        </div>
        <div className="relative overflow-auto px-10">
          <div className="flex gap-8">
            <Link
              className="grid justify-center gap-4 text-center font-semibold"
              href="/document-management/other/legal"
            >
              <img src="/images/folder.png" alt="#" />
              <p>Contract contracts</p>
            </Link>

            <Link
              className="grid justify-center gap-4 text-center font-semibold"
              href="/document-management/other/legal"
            >
              <img src="/images/folder.png" alt="#" />
              <p>Purchase contracts</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Legal;
