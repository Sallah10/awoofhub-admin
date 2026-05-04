'use client'
import { useLogout } from "@/features/auth/useLogout";
import { useUser } from "@/features/user/useUser";
import { capitalizeFirstLetter, firstFiveLetters } from "@/utils/truncate";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FiHelpCircle, FiLogOut, FiUser } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";



export default function DesktopMenu() {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const { data: currentUser } = useUser();

    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        window.addEventListener('click', handleClickOutSide);
        return () => {
            window.removeEventListener('click', handleClickOutSide);
        };
    }, []);

    const handleClickOutSide = (e: Event) => {
        const target = e.target;
        if (target instanceof Node && dropdownRef.current?.contains(target)) {
            return;
        }
        setIsOpenDropdown(false);
    };

    const { submit } = useLogout({
        onSuccess: () => {
            const redirect = "/login";
            router.push(redirect);
        },
    })

    const toggleDropdown = () => {
        setIsOpenDropdown(prev => !prev);
    };

    const isLoggedIn = !!currentUser;

    return (
        <ul className="hidden lg:flex items-center list-none p-0 m-0">

            {isLoggedIn &&
                <>
                    <li className="px-[10px] flex items-center text-[1.7rem] relative group border-r border-gray-300">
                        <Link href="/notifications" className={`${pathname === '/notifications' ? 'text-primary' : ''}`}>
                            <IoNotificationsOutline size={28} />
                        </Link>
                    </li>

                    <li ref={dropdownRef} className="pl-[10px] flex items-center text-[1.7rem] relative">
                        <span className="mr-3 text-[1.4rem] font-medium">
                            {"Hi " + firstFiveLetters(currentUser.name)}
                        </span>

                        <div
                            role="button"
                            tabIndex={-1}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => toggleDropdown()}
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                {currentUser.profileImageUrl ? (
                                    <Image
                                        width={500}
                                        height={500}
                                        src={currentUser.profileImageUrl}
                                        alt={currentUser.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-green-500 text-white flex items-center justify-center w-full h-full">
                                        {capitalizeFirstLetter(currentUser.name)}
                                    </div>
                                )}
                            </div>
                            <BsChevronDown size={14} />
                        </div>

                        {/* Dropdown Menu */}
                        {isOpenDropdown && (
                            <div className="w-70 absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-xl border border-muted/10 overflow-hidden z-50">
                                <ul className="flex flex-col">
                                    {/* Standard Items */}
                                    {[
                                        { label: 'Profile', icon: <FiUser />, href: `/profile/${currentUser.id}` },
                                        { label: 'Help & Support', icon: <FiHelpCircle />, href: '/help' },
                                        { label: 'Account Type', icon: <GoArrowSwitch />, href: '/switch-account' },
                                    ].map((item, idx) => (
                                        <li key={idx} className="border-b border-muted/10 last:border-none">
                                            <Link href={item.href} onClick={() => toggleDropdown()} className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors">
                                                <span className="text-primary text-xl">{item.icon}</span>
                                                <span className="text-foreground text-[20px] font-light">{item.label}</span>
                                            </Link>
                                        </li>
                                    ))}

                                    {/* Logout - Special Styling */}
                                    <li>
                                        <button onClick={() => submit()} className="cursor-pointer w-full flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors text-primary">
                                            <FiLogOut className="text-xl" />
                                            <span className="text-[20px] font-medium">Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </>
            }
        </ul>
    );
};
