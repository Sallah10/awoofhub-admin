import Image from "next/image";
import Link from 'next/link';
import { ReactNode } from "react";

export default function PasswordResetLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col p-6">
            <div className="mb-8">
                <Link href="/">
                    <Image src="/Logo.png" alt="AwoofHub" width={140} height={40} priority />
                </Link>
            </div>
            <div className="flex flex-1 justify-center items-start">
                {children}
            </div>
        </div>
    );
}
