"use client";

import { Button } from "@/components/button/Button";
import { Info, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function ForgotPasswordSentContent() {
    const router = useRouter();

    return (
        <div className="w-full max-w-sm bg-orange-400 rounded-2xl p-8 text-white text-center shadow-xl">
            {/* Mail icon */}
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail size={32} className="text-white" />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-1">Check your inbox!</h1>
            <p className="text-sm text-white/80 mb-5">
                We&apos;ve sent a reset link to your email:
            </p>

            {/* Spam tip */}
            <div className="flex items-center gap-3 bg-orange-100 rounded-xl p-3 text-left mb-6">
                <Info size={18} className="text-[#FF5700] shrink-0" />
                <p className="text-sm text-black leading-snug">
                    Do check your spam folder. Sometimes it likes to hide there.
                </p>
            </div>

            <div className="space-y-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {/* TODO: call resend API */}}
                >
                    Resend Email
                </Button>

                <Button
                    type="button"
                    onClick={() => router.back()}
                    className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
                >
                    Go back
                </Button>
            </div>

            <p className="mt-5 text-sm text-white/80">
                Wrong Email?{" "}
                <a href="/forgot-password" className="font-semibold text-white hover:underline">
                    Change →
                </a>
            </p>
        </div>
    );
}

export default function ForgotPasswordSentPage() {
    return (
        <Suspense>
            <ForgotPasswordSentContent />
        </Suspense>
    );
}
