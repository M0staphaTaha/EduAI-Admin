"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useFindAccountMutation, useSelectAccoutMutation } from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [forgetPassword, { isLoading }] = useFindAccountMutation();
    const [selectAccount] = useSelectAccoutMutation();

  const onSubmit = async (data: any) => {
    try {
      const username = data.username;
      const result = await forgetPassword(username).unwrap();
      Cookie.set("userId", result.data.userId);
      Cookie.set("email", result.data.emails);
      const Email = Cookie.get("email")
      const UserId = Cookie.get("userId")
      await selectAccount ({ id: UserId, email:Email }).unwrap();
      toast.success("Reset password email generated and sent successfully");
      router.replace("/otp");
    } catch (err) {
      toast.error("Failed to Find this username or Email");
    }
  };
    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen  bg-white">
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Forgot Password</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">Enter your phone to get OTP.</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="text" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                Username | Email
                                <input id="text" {...register("username", { required: true })} placeholder="Usernamre | Email" className={`w-[450px] py-3 px-4 rounded-xl border ${errors.username ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[471px]:w-[350px]`} type="text" />
                                {errors.username && <span className="text-[#e81123] text-[13px]">Email is Required</span>}
                            </label>
                            {
                                isLoading ? <Spinner /> :
                                    <div className="flex justify-center text-center">
                                        <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[170px] ease-in duration-300">Recovery code</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
                <div className="max-[1040px]:hidden flex justify-end">
                    <img className="w-[800px] h-[929px]" src="images/forgetpass.png" alt="#" />
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;