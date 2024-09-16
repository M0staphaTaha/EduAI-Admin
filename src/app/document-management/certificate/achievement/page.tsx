/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/spinner";
import {
  useGetAllAchievementsQuery,
  useDeleteAchievementsMutation,
} from "@/features/Document-Management/achievementApi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";
import BreadCrumbs from "@/components/BreadCrumbs";

const Achievement = () => {
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
      nameEn: "Achievement",
      nameAr: "الإنجاز",
      nameFr: "Réussite",
      href: "/document-management/certificate/achievement",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  type Achievement = Record<string, any>;
  const [search, setSearch] = useState("");
  const { data, error, isLoading, refetch } = useGetAllAchievementsQuery(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectAll;
    });
  };

  const [deleteCeftificates] = useDeleteAchievementsMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCeftificates(id).unwrap();
      toast.success(`Certificate with ID ${id} Deleted successfully`);
      void refetch();
    } catch (err) {
      toast.error("Failed to Delete the Certificate");
    }
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
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <div className="justify-left mb-[80px] ml-4 mt-[50px] flex flex-wrap gap-5 text-[20px] font-semibold max-[725px]:text-[15px]">
          <Link href="/document-management/certificate">
            {currentLanguage === "ar"
              ? "إكمال"
              : currentLanguage === "fr"
                ? "Achèvement"
                : "Completion"}
          </Link>
          <Link
            href="/document-management/certificate/achievement"
            className="text-blue-500 underline"
          >
            {currentLanguage === "ar"
              ? "إنجاز"
              : currentLanguage === "fr"
                ? "Réussite"
                : "Achievement"}
          </Link>
          <Link href="/document-management/certificate/participation">
            {currentLanguage === "ar"
              ? "المشاركة"
              : currentLanguage === "fr"
                ? "Participation"
                : "Participation"}
          </Link>
          <Link href="/document-management/certificate/professional-development">
            {currentLanguage === "ar"
              ? "التطوير المهني"
              : currentLanguage === "fr"
                ? "Développement Professionnel"
                : "Professional Development"}
          </Link>
        </div>
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
                onChange={e => setSearch(e.target.value)}
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder={
                  currentLanguage === "en"
                    ? "Search"
                    : currentLanguage === "ar"
                      ? "بحث"
                      : "Recherche"
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/document-management/certificate/add-new-achievement"
              className="mb-5 mr-3 whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              {currentLanguage === "ar"
                ? "+ إضافة إنجازات التخرج"
                : currentLanguage === "fr"
                  ? "+ Ajouter Réalisations de Diplôme"
                  : "+ Add Completion Achievements"}
            </Link>
          </div>
        </div>
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-textSecondary rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    {/* Add event listener for select all checkbox */}
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="-gray-800 h-4 w-4 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-blue-500"
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "المرحلة"
                    : currentLanguage === "fr"
                      ? "Stage"
                      : "Stage"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "اسم الطالب"
                    : currentLanguage === "fr"
                      ? "Nom de l'Étudiant"
                      : "Student Name"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "رقم الطالب"
                    : currentLanguage === "fr"
                      ? "ID de l'Étudiant"
                      : "Student Id"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "تاريخ الإصدار"
                    : currentLanguage === "fr"
                      ? "Date d'Émission"
                      : "Issue Date"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "عرض"
                    : currentLanguage === "fr"
                      ? "Voir"
                      : "View"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "إجراء"
                    : currentLanguage === "fr"
                      ? "Action"
                      : "Action"}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.content
                .filter((achievement: Achievement) => {
                  return search.toLocaleLowerCase() === ""
                    ? achievement
                    : achievement.title.toLocaleLowerCase().includes(search);
                })
                .map((achievement: Achievement) => (
                  <tr
                    key={achievement.id}
                    className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <th scope="row" className="whitespace-nowrap px-6 py-4">
                      <p> {achievement.stage} </p>
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">
                      {achievement.studentName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {achievement.studentId}
                    </td>
                    <td className="flex gap-2 whitespace-nowrap px-6 py-4">
                      {achievement.issueDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={`/document-management/certificate/achievement/${achievement.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        <img src="/images/print.png" alt="#" />
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        className="rounded-lg bg-error px-2 py-1 font-semibold text-white shadow-lg delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        {currentLanguage === "ar"
                          ? "حذف"
                          : currentLanguage === "fr"
                            ? "Supprimer"
                            : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(data?.data.content.length == 0 || data == null) && (
            <div className="flex w-full justify-center py-3 text-center text-[18px] font-semibold">
              {currentLanguage === "ar"
                ? "لا توجد بيانات"
                : currentLanguage === "fr"
                  ? "Aucune donnée"
                  : "There is No Data"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Achievement;
