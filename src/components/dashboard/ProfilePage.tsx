import { Pricing } from "../Pricing";
import { DashboardHeader } from "./DashboardHeader";

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <DashboardHeader />
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#1A1F2C] mb-6">Pricing Plans</h2>
            <Pricing />
          </section>
        </div>
      </div>
    </div>
  );
};