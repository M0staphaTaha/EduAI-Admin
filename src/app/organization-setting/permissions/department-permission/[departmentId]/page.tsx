"use client";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";

interface departmentIdProps {
  params: {
    departmentId: string;
  };
}

const Permissions: React.FC<departmentIdProps> = ({ params }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Organization Settings",
      nameAr: "إعدادات المنظمة",
      nameFr: "Paramètres org",
      href: "/organization-setting",
    },
    {
      nameEn: "Department Permissions",
      nameAr: "صلاحيات المنظمة",
      nameFr: "Autorisations du département",
      href: "/organization-setting/permissions/department-permission",
    },
    {
      nameEn: `${params.departmentId}`,
      nameAr: `${params.departmentId}`,
      nameFr: `${params.departmentId}`,
      href: `/organization-setting/permissions/department-permission/${params.departmentId}`,
    },
  ];
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div 
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}

        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-3 mt-[40px]`}>
      <div className="bg-bgPrimary rounded-xl pb-5">
        <div className="bg-thead flex justify-between rounded-t-xl px-10 py-4 font-semibold text-[18px]">
          <p>Permission</p>
          <p>Applicable For</p>
        </div>
        <div className="py-8 px-10 flex justify-between max-[640px]:grid max-[640px]:justify-center max-[640px]:gap-10">
          <div className="grid gap-5 font-semibold text-[18px]">
            <div className="flex gap-2 items-center">
              <button>
              <svg
                className="h-6 w-6 text-secondary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </button>
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="-gray-800 h-5 w-5 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-hover"
                
              />
              <p>Administration</p>
            </div>
            <div className="flex gap-2 items-center">
              <button>
              <svg
                className="h-6 w-6 text-secondary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </button>
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="-gray-800 h-5 w-5 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-hover"
                
              />
              <p>Academic</p>
            </div>
            <div className="flex gap-2 items-center">
              <button>
              <svg
                className="h-6 w-6 text-secondary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </button>
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="-gray-800 h-5 w-5 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-hover"
                
              />
              <p>Operations</p>
            </div>
            <div className="flex gap-2 items-center">
              <button>
              <svg
                className="h-6 w-6 text-secondary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </button>
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="-gray-800 h-5 w-5 rounded border-borderPrimary bg-bgPrimary text-primary focus:ring-2 focus:ring-hover"
                
              />
              <p>Communication</p>
            </div>
          </div>
          <div className="grid w-[300px] gap-5 font-semibold h-[90px]">
            <p>Sections</p>
            <select
              id="countries"
              className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textSecondary outline-none focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected>
                {currentLanguage === "ar"
                  ? "اختر"
                  : currentLanguage === "fr"
                    ? "Choisir"
                    : "Choose"}
              </option>
              <option value="US">
                {currentLanguage === "ar"
                  ? "مدرس"
                  : currentLanguage === "fr"
                    ? "Enseignant"
                    : "Teacher"}
              </option>
            </select>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Permissions;
