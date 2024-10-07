/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import BreadCrumbs from "@/components/BreadCrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";

const Book = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Infrastructure",
      nameAr: "الدورات والموارد",
      nameFr: "Cours et Ressources",
      href: "/infrastructure",
    },
    {
      nameEn: "Library",
      nameAr: "المكتبة",
      nameFr: "Bibliothèque",
      href: "/book",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const booleanValue = useSelector((state: RootState) => state.boolean.value); // sidebar

  const [selectAll, setSelectAll] = useState(false); // State to track whether select all checkbox is checked

  // Function to handle click on select all checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll); // Toggle select all state
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    ); // Select all checkboxes except select all checkbox
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectAll; // Set checked state of each checkbox based on select all state
    });
  };

  useEffect(() => {
    toast.warning(
      currentLanguage === "ar"
        ? "هذه الصفحة غير جاهزة للاستخدام!"
        : currentLanguage === "fr"
          ? "Cette page n'est pas prête à être utilisée!"
          : "This page is not ready to use!",
    );
    // Function to handle click on other checkboxes
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

    // Add event listeners to other checkboxes
    const otherCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    otherCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", handleOtherCheckboxes);
    });

    return () => {
      // Remove event listeners when component unmounts
      otherCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener("change", handleOtherCheckboxes);
      });
    };
  }, []);

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
        } relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-thead text-xs uppercase text-textPrimary">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {/* Add event listener for select all checkbox */}
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="-gray-800 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "الاسم"
                  : currentLanguage === "fr"
                    ? "Nom"
                    : "Name"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "الرقم التعريفي"
                  : currentLanguage === "fr"
                    ? "ID"
                    : "ID"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "الجنس"
                  : currentLanguage === "fr"
                    ? "Genre"
                    : "Gender"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "رقم التاكسي"
                  : currentLanguage === "fr"
                    ? "Numéro de taxi"
                    : "Taxi Number"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "العنوان"
                  : currentLanguage === "fr"
                    ? "Adresse"
                    : "Address"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "الموبايل"
                  : currentLanguage === "fr"
                    ? "Mobile"
                    : "Mobile"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "معلومات"
                  : currentLanguage === "fr"
                    ? "À propos"
                    : "About"}
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {currentLanguage === "ar"
                  ? "تعديل"
                  : currentLanguage === "fr"
                    ? "Modifier"
                    : "Edit"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
              >
                Nahda
              </th>
              <td className="whitespace-nowrap px-6 py-4">1321312</td>
              <td className="whitespace-nowrap px-6 py-4">Male</td>
              <td className="whitespace-nowrap px-6 py-4">5515151</td>
              <td className="whitespace-nowrap px-6 py-4">sdfsdfsdfsdf</td>
              <td className="whitespace-nowrap px-6 py-4">002050030</td>
              <td className="whitespace-nowrap px-6 py-4">This is text</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  href="/edit-book"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {currentLanguage === "ar"
                    ? "تعديل"
                    : currentLanguage === "fr"
                      ? "Modifier"
                      : "Edit"}
                </Link>
              </td>
            </tr>
            <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
              >
                Nahda
              </th>
              <td className="whitespace-nowrap px-6 py-4">1321312</td>
              <td className="whitespace-nowrap px-6 py-4">Male</td>
              <td className="whitespace-nowrap px-6 py-4">5513131s</td>
              <td className="whitespace-nowrap px-6 py-4">sdfs2df</td>
              <td className="whitespace-nowrap px-6 py-4">00515</td>
              <td className="whitespace-nowrap px-6 py-4">This is text</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  href="/edit-book"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {currentLanguage === "ar"
                    ? "تعديل"
                    : currentLanguage === "fr"
                      ? "Modifier"
                      : "Edit"}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Book;
