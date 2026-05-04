"use client";

import { Button } from "@/components/button/Button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordSuccessPage() {
    const router = useRouter();

    return (
        <div className="text-center space-y-6 max-w-sm">

            {/* Illustration */}
            <div className="flex justify-center">
                <div className="relative">
                    <span className="absolute -top-3 -left-4 text-green-300 text-lg">✦</span>
                    <span className="absolute top-0 -right-5 text-green-200 text-sm">✦</span>
                    <span className="absolute bottom-2 -left-5 text-green-200 text-xs">✦</span>
                    <span className="absolute -bottom-1 right-0 text-green-300 text-sm">✦</span>

                    <div className="w-24 h-28 bg-gray-200 rounded-2xl flex items-end justify-center pb-3 shadow-sm border border-gray-300">
                        <div className="space-y-1.5 w-14">
                            <div className="h-1.5 bg-gray-300 rounded-full" />
                            <div className="h-1.5 bg-gray-300 rounded-full w-10" />
                        </div>
                    </div>

                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <Check size={24} className="text-white" strokeWidth={3} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Success!</h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                    You have successfully reset your password!<br />
                    We welcome you back onboard!
                </p>
            </div>

            <Button type="button" onClick={() => router.push("/login")}>
                Proceed to Log In
            </Button>
        </div>
    );
}
