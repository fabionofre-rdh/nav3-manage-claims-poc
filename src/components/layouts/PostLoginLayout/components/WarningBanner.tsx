import { Card } from "@/components/ui";
import { HiExclamation } from "react-icons/hi";

interface WarningBannerProps {
  title: string;
  subtitle?: string;
}

const WarningBanner = ({ title, subtitle }: WarningBannerProps) => {
  return (
    <Card className="bg-[#ffc107] rounded-none" bodyClass="p-1 flex items-center gap-2">
      <HiExclamation className="text-black text-lg" />
      <div className="text-black">
        <p className="text-sm font-bold">{title}</p>
        {subtitle && <p className="text-xs">{subtitle}</p>}
      </div>
    </Card>
  );
};

export default WarningBanner;
