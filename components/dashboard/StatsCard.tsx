import { LucideIcon } from 'lucide-react';

interface Props {
    label: string;
    value: number;
    icon: LucideIcon;
    iconBg: string;
}

export default function StatsCard({ label, value, icon: Icon, iconBg }: Props) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${iconBg} text-white`}>
                    <Icon className="w-7 h-7 text-gray-700" />
                </div>
                <p className="text-gray-600 font-medium">{label}</p>
            </div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
        </div>
    );
}