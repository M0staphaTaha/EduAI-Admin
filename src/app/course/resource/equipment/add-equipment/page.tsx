"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

const AddEquipment = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Course",
      nameAr: "الدورة",
      nameFr: "Cours",
      href: "/course",
    },
    {
      nameEn: "Equipment",
      nameAr: "المعدات",
      nameFr: "Équipement",
      href: "/course/resource/equipment",
    },
    {
      nameEn: "Add Equipment",
      nameAr: "إضافة معدات",
      nameFr: "Ajouter un équipement",
      href: "/course/resource/equipment/add-equipment",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className="mr-[5px] mt-[40px] grid h-[500px] items-center justify-center lg:ml-[270px]"
      >
        <form>
          <div className="grid h-[400px] items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-[500px] xl:w-[1000px]">
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
                {currentLanguage === "ar"
                  ? "إضافة معدات"
                  : currentLanguage === "fr"
                    ? "Ajouter un équipement"
                    : "Add Equipment"}
                {/* default */}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الاسم"
                  : currentLanguage === "fr"
                    ? "Nom"
                    : "Name"}
                {/* default */}
                <input
                  id="name"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="totalNumber"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الإجمالي"
                  : currentLanguage === "fr"
                    ? "Nombre total"
                    : "Total Number"}
                {/* default */}
                <input
                  id="totalNumber"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="latestAddition"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "عدد الإضافات الأخيرة"
                  : currentLanguage === "fr"
                    ? "Nombre de la dernière addition"
                    : "Number of latest addition"}
                {/* default */}
                <input
                  id="latestAddition"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="latestPulling"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "عدد السحوبات الأخيرة"
                  : currentLanguage === "fr"
                    ? "Nombre du dernier retrait"
                    : "Number of latest pulling"}
                {/* default */}
                <input
                  id="latestPulling"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
            </div>

            <div className="flex justify-center text-center">
              <button
                type="submit"
                className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {currentLanguage === "ar"
                  ? "حفظ"
                  : currentLanguage === "fr"
                    ? "Enregistrer"
                    : "Save"}
                {/* default */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEquipment;
