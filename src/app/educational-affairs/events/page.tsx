"use client";

import Modal from "@/components/model";
import Spinner from "@/components/spinner";
import Timeline from "@/components/timeLine";
import {
  useGetAllEventsQuery,
  useCreateEventsMutation,
  useDeleteEventsMutation
} from "@/features/events/eventsApi";
import { RootState } from "@/GlobalRedux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import BreadCrumbs from "@/components/BreadCrumbs";

const eventSchema = z.object({
  creatorId: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  title_en: z.string().optional(),
  title_ar: z.string().optional(),
  title_fr: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  description_fr: z.string().optional(),
  file: z.any().optional(), // Include file in schema to handle it
});

const Events = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Educational Affairs",
      nameAr: "الشئون التعليمية",
      nameFr: "Affaires éducatives",
      href: "/educational-affairs",
    },
    {
      nameEn: "Events",
      nameAr: "الشئون التعليمية",
      nameFr: "Événements",
      href: "/educational-affairs/events",
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, error, isLoading, refetch } = useGetAllEventsQuery(null);
  const [createEvent] = useCreateEventsMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const ID = useSelector((state: RootState) => state.user.id);
  const [deleteEvent] = useDeleteEventsMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id).unwrap();
      toast.success("Delete post Success");
      void refetch();
    } catch (err) {
      toast.error("Can not Delete post");
    }
  };
  const onSubmit = async (formData: any) => {
    try {
      const formDataToSend = new FormData();
      // Create JSON object for request key
      const requestData = {
        creatorId: ID,
        startTime: formData.startTime,
        endTime: formData.endTime,
        title_en: formData.title_en,
        title_ar: formData.title_ar,
        title_fr: formData.title_fr,
        description_en: formData.description_en,
        description_ar: formData.description_ar,
        description_fr: formData.description_fr,
      };
      toast.success("Event created success");
      // Append the JSON data as a string to FormData
      formDataToSend.append("request", JSON.stringify(requestData));

      // Append the file if it exists
      const file = formData.file?.[0];
      if (file) {
        formDataToSend.append("file", file); // Append the file correctly
      }

      const result = await createEvent(formDataToSend).unwrap();
      console.log("Event created:", result);
      handleCloseModal();
      refetch(); // Optionally refetch events
    } catch (error) {
      toast.error("Fiald Create Event");
      console.error("Failed to create event:", error);
    }
  };

  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading || isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={` ${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mt-7`}
      >
        <div className="flex justify-end">
          <button
            onClick={handleOpenModal}
            className="mx-3 mb-5 w-fit whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
          >
            {currentLanguage === "ar"
              ? "+ إضافة حدث"
              : currentLanguage === "fr"
                ? "+ Ajouter un événement"
                : "+ Add Event"}
          </button>
        </div>
        <Timeline meetings={data?.data.content} handleDelete={handleDelete}/>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="mb-4 text-xl font-light text-textPrimary">
            {currentLanguage === "ar"
              ? "إنشاء حدث"
              : currentLanguage === "fr"
                ? "Créer un événement"
                : "Create Event"}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
            encType="multipart/form-data"
          >
            {/* Start Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("startTime")}
                placeholder="Start Time"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startTime && (
                <p className="text-error">
                  {errors.startTime.message as string}
                </p>
              )}
            </div>

            {/* End Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("endTime")}
                placeholder="End Time"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endTime && (
                <p className="text-error">{errors.endTime.message as string}</p>
              )}
            </div>

            {/* Title in English */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_en")}
                placeholder="Title (English)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_en && (
                <p className="text-error">
                  {errors.title_en.message as string}
                </p>
              )}
            </div>

            {/* Title in Arabic */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_ar")}
                placeholder="Title (Arabic)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_ar && (
                <p className="text-error">
                  {errors.title_ar.message as string}
                </p>
              )}
            </div>

            {/* Title in French */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_fr")}
                placeholder="Title (French)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_fr && (
                <p className="text-error">
                  {errors.title_fr.message as string}
                </p>
              )}
            </div>

            {/* Description in English */}
            <div className="mb-4">
              <input
                {...register("description_en")}
                placeholder="Description (English)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_en && (
                <p className="text-error">
                  {errors.description_en.message as string}
                </p>
              )}
            </div>

            {/* Description in Arabic */}
            <div className="mb-4">
              <input
                {...register("description_ar")}
                placeholder="Description (Arabic)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_ar && (
                <p className="text-error">
                  {errors.description_ar.message as string}
                </p>
              )}
            </div>

            {/* Description in French */}
            <div className="mb-4">
              <input
                {...register("description_fr")}
                placeholder="Description (French)"
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_fr && (
                <p className="text-error">
                  {errors.description_fr.message as string}
                </p>
              )}
            </div>

            {/* File Input */}
            <div className="mb-4">
              <input
                type="file"
                {...register("file")}
                className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 text-textSecondary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && (
                <p className="text-error">{errors.file.message as string}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="mx-3 mb-5 w-fit whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {currentLanguage === "ar"
                  ? "إضافة"
                  : currentLanguage === "fr"
                    ? "Ajouter"
                    : "Add"}
              </button>
              <button
                onClick={handleCloseModal}
                className="mx-3 mb-5 w-fit whitespace-nowrap rounded-xl bg-error px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#af4747] hover:shadow-xl"
              >
                {currentLanguage === "ar"
                  ? "إلغاء"
                  : currentLanguage === "fr"
                    ? "Annuler"
                    : "Cancel"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Events;
