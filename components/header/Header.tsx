'use client';
import DesktopMenu from './desktop/DesktopMenu';

export default function Header() {

    return (
        <header className="sticky top-0 left-0 z-[99] bg-white shadow-lg shadow-black/5 relative">
            <div className="flex justify-end items-center max-w-[1440px] mx-auto h-[60px] px-3 xl:px-8">
                <div className="flex justify-end gap-4">
                    <DesktopMenu />
                </div>
            </div>
        </header>
    )

}