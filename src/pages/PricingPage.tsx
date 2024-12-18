import { PricingPlans } from "@/components/dashboard/PricingPlans";
import { AuthGuard } from "@/components/auth/AuthGuard";

const PricingPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <PricingPlans />
        </div>
      </div>
    </AuthGuard>
  );
};

export default PricingPage;