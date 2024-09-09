/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useTheme } from "next-themes";
import BreadCrumbs from "@/components/BreadCrumbs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Expense",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]);

  const [options, setOptions] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        tooltip: {
          theme: "dark",
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width={800}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const Budget = () => {
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
      nameEn: "Budget",
      nameAr: "الميزانية",
      nameFr: "Budget",
      href: "/financial-management/budget",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        className={`${booleanValue ? "lg:ml-[120px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="mb-5 flex justify-center gap-2 max-[840px]:grid">
          <div className="grid gap-16 max-[840px]:flex max-[840px]:gap-2">
            <div className="flex h-[80px] w-[201px] items-center justify-between gap-2 rounded-xl bg-bgPrimary p-2 shadow-xl max-[840px]:w-[170px] max-[576px]:h-[100px]">
              <div>
                <img src="/images/earnning.png" alt="#" />
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Total Earning</p>
                <h1 className="text-[17px] font-semibold">12.130K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-green-500">
                    4.63%
                  </span>{" "}
                  vs. last Year
                </h1>
              </div>
            </div>
            <div className="flex h-[80px] w-[201px] items-center justify-between gap-2 rounded-xl bg-bgPrimary p-2 shadow-xl max-[840px]:w-[170px] max-[576px]:h-[100px]">
              <div>
                <img src="/images/spending.png" alt="#" />
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Total Spending</p>
                <h1 className="text-[17px] font-semibold">12.130K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-red-500">4.63%</span> vs.
                  last Year
                </h1>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="relative m-auto h-56 w-96 transform rounded-xl bg-red-100 text-white shadow-2xl transition-transform max-[840px]:w-[340px]">
              <img
                className="relative h-full w-full rounded-xl object-cover"
                src="https://i.imgur.com/kGkSg1v.png"
                alt="#"
              />

              <div className="absolute top-8 w-full px-8">
                <div className="flex justify-between">
                  <div className="">
                    <h1 className="font-light">Name</h1>
                    <p className="font-medium tracking-widest">Mostapha Taha</p>
                  </div>
                  <img
                    className="h-14 w-14"
                    src="https://i.imgur.com/bbPHJVe.png"
                    alt="#"
                  />
                </div>
                <div className="pt-1">
                  <h1 className="font-light">Card Number</h1>
                  <p className="tracking-more-wider font-medium">
                    4642 3489 9867 7632
                  </p>
                </div>
                <div className="pr-6 pt-6">
                  <div className="flex justify-between">
                    <div className="">
                      <h1 className="text-xs font-light">Valid</h1>
                      <p className="text-sm font-medium tracking-wider">
                        11/15
                      </p>
                    </div>
                    <div className="">
                      <h1 className="text-xs font-light">Expiry</h1>
                      <p className="text-sm font-medium tracking-wider">
                        03/25
                      </p>
                    </div>

                    <div className="">
                      <h1 className="text-xs font-light">CVV</h1>
                      <p className="tracking-more-wider text-sm font-bold">
                        ···
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-16 max-[840px]:flex max-[840px]:gap-2">
            <div className="flex h-[80px] w-[201px] items-center justify-between gap-2 rounded-xl bg-bgPrimary p-2 shadow-xl max-[840px]:w-[170px] max-[576px]:h-[100px]">
              <div>
                <img src="/images/earnning.png" alt="#" />
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Total Earning</p>
                <h1 className="text-[17px] font-semibold">12.130K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-green-500">
                    4.63%
                  </span>{" "}
                  vs. last Year
                </h1>
              </div>
            </div>
            <div className="flex h-[80px] w-[201px] items-center justify-between gap-2 rounded-xl bg-bgPrimary p-2 shadow-xl max-[840px]:w-[170px] max-[576px]:h-[100px]">
              <div>
                <img src="/images/spending.png" alt="#" />
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Total Spending</p>
                <h1 className="text-[17px] font-semibold">12.130K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-red-500">4.63%</span> vs.
                  last Year
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 grid w-full grid-cols-1 justify-center gap-10 overflow-x-auto 2xl:flex">
          <div className="flex overflow-x-auto">
            <div
              id="chart"
              className="w-[850px] overflow-x-auto rounded-xl bg-bgPrimary p-2 shadow-xl"
            >
              <p className="text-[18px] font-semibold">School Finace</p>
              <ApexChart />
            </div>
          </div>
        </div>
        <div className="grid w-full rounded-xl bg-bgPrimary p-5">
          <div className="relative overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-thead text-xs uppercase text-textPrimary">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                  >
                    Nahda
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">C45121</td>
                  <td className="whitespace-nowrap px-6 py-4">This is text</td>
                  <td className="whitespace-nowrap px-6 py-4">kdsk</td>
                </tr>
                <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                  >
                    Nahda
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">C45121</td>
                  <td className="whitespace-nowrap px-6 py-4">This is text</td>
                  <td className="whitespace-nowrap px-6 py-4">sdsdd</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Budget;
