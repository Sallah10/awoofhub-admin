"use client";

import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { useResetPassword } from "@/features/auth/useResetPassword";
import { Spinner } from "@chakra-ui/react";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";


export interface ResetPasswordTempData {
    token: string;
    password: string;
    confirmPassword: string;
};


function ResetPassword() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token")?.toString()

    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.replace("/forgot-password");
        }
    }, [token, router]);


    const onSuccess = () => {
        const redirect = "/reset-password/success";
        router.push(redirect);
    }

    const { submit, isPending } = useResetPassword({
        onSuccess
    })

    const { register, handleSubmit, formState, getValues } = useForm<ResetPasswordTempData>();

    const onSubmit = (data: ResetPasswordTempData) => {
        if (!token) return;
        const { confirmPassword, ...resetData } = data;

        submit({
            ...resetData,
            token
        });
    };

    if (!token) return null;

    return (
        <div className="w-full max-w-sm bg-[#FF5700] rounded-2xl p-8 text-white text-center shadow-xl">

            {/* Lock icon */}
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Lock size={32} className="text-white" />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-sm text-white/80 mb-6">
                Create your new password to proceed.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left [&_input]:bg-transparent [&_input]:!border-white [&_input]:!rounded-lg [&_input]:!text-white [&_input::placeholder]:text-white [&_input]:placeholder-white [&_svg]:text-white [&_svg]:stroke-white [&_.chakra-input__right-element_button]:bg-transparent [&_.chakra-input__right-element_button]:shadow-none [&_.chakra-input__right-element_button:hover]:bg-transparent">

                <InputField
                    label="Enter New Password"
                    type="password"
                    compulsory={true}
                    placeholder="***************"
                    icon={<Lock size={18} color={"gray"} />}
                    {...register('password', {
                        required: 'Password field cannot be empty',
                    })}
                    error={formState.errors['password']}
                />

                <InputField
                    label="Confirm Password"
                    type="password"
                    compulsory={true}
                    placeholder="***************"
                    icon={<Lock size={18} color={"gray"} />}
                    {...register('confirmPassword', {
                        required: 'Confirm Password field cannot be empty',
                        validate: (value) =>
                            value === getValues('password') || 'Passwords do not match',
                    })}
                    error={formState.errors['confirmPassword']}
                />

                <Button
                    isLoading={isPending}
                    isDisabled={isPending}
                    type="submit"
                    variant="outline"
                >
                    Reset Password
                </Button>

                <Button
                    type="button"
                    onClick={() => router.push("/")}
                    className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
                >
                    Do this later
                </Button>
            </form>
        </div>
    );
}



export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="pt-14 flex justify-center"><Spinner size="xl" /></div>
            }
        >
            <ResetPassword />
        </Suspense>
    )
}
