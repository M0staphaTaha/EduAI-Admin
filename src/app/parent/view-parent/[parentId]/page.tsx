"use client";
import { useGetParentByIdQuery } from "@/features/User-Management/parentApi";
import CircleProgress from "@/components/circleProgress";
import ParentInfo from "@/components/parentInfo";
import Spinner from "@/components/spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
interface ViewParentProps {
  params: {
    parentId: string;
  };
}

const ViewParent: React.FC<ViewParentProps> = ({ params }) => {
  const { data, error, isLoading } = useGetParentByIdQuery(params.parentId);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className="grid py-4 lg:ml-[290px]"
      >
        <div className="grid grid-cols-2 gap-7 pr-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <ParentInfo data={data} />
          <div className="grid h-[400px] items-center justify-center gap-10 rounded-xl bg-bgPrimary p-5">
            <div className="flex justify-start">
              <h1 className="font-sans font-semibold text-textPrimary">
                {currentLanguage === "en"
                  ? "Feed"
                  : currentLanguage === "ar"
                    ? "تغذية"
                    : "Fil d'actualités"}
              </h1>
            </div>
            <CircleProgress percentage={75} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewParent;
