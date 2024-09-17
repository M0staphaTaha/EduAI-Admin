"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Pie, PieChart, Tooltip, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

const School = () => {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#e23670",
    },
    safari: {
      label: "Safari",
      color: "#2662d9",
    },
    firefox: {
      label: "Firefox",
      color: "#e88c30",
    },
    edge: {
      label: "Edge",
      color: "#af57db",
    },
    other: {
      label: "Other",
      color: "#2eb88a",
    },
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const breadcrumbs = [
    {
      nameEn: "Ai Insights",
      nameAr: "رؤى الذكاء الاصطناعي",
      nameFr: "Perspectives de l'IA",
      href: "/",
    },
    {
      nameEn: "School Comparisons",
      nameAr: "مقارنات المدارس",
      nameFr: "Comparaisons des écoles",
      href: "/insight",
    },
  ];

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="lg:ml-[270px]">
        <div className="justify-left mb-5 ml-4 mt-10 flex gap-5 text-[20px] font-semibold">
          <Link href="/insight">
            {currentLanguage === "en"
              ? "Student Performance"
              : currentLanguage === "ar"
              ? "أداء الطالب"
              : currentLanguage === "fr"
              ? "Performance de l'étudiant"
              : "Student Performance"}
          </Link>
          <Link href="/insight/school" className="text-blue-500 underline">
            {currentLanguage === "en"
              ? "School Performance"
              : currentLanguage === "ar"
              ? "أداء المدرسة"
              : currentLanguage === "fr"
              ? "Performance de l'école"
              : "School Performance"}
          </Link>
          <Link href="/insight/class">
            {currentLanguage === "en"
              ? "Class Performance"
              : currentLanguage === "ar"
              ? "أداء الفصل"
              : currentLanguage === "fr"
              ? "Performance de la classe"
              : "Class Performance"}
          </Link>
          <Link href="/insight/ml-exam">
            {currentLanguage === "en"
              ? "ML Exam Performance"
              : currentLanguage === "ar"
              ? "أداء اختبار تعلم الآلة"
              : currentLanguage === "fr"
              ? "Performance de l'examen ML"
              : "ML Exam Performance"}
          </Link>
        </div>

        <div>
          <Card className="flex flex-col bg-bgPrimary">
            <CardHeader className="items-center pb-0">
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <Pie data={chartData} dataKey="visitors" nameKey="browser" outerRadius={100}>
                    <LabelList dataKey="visitors" position="inside" />
                  </Pie>
                  <Tooltip content={<ChartTooltipContent nameKey="browser" />} />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="browser" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default School;
