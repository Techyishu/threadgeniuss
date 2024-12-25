interface ProFeaturesInfoProps {
  onShowPricing?: () => void;
}

export const ProFeaturesInfo = ({ onShowPricing }: ProFeaturesInfoProps) => {
  return (
    <div className="px-4 py-3 bg-[#F4F3FF] rounded-lg border border-[#8B5CF6]/20">
      <h3 className="text-[#1A1F2C] font-semibold mb-1">Upgrade to Pro</h3>
      <button 
        onClick={onShowPricing}
        className="text-sm text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors cursor-pointer"
      >
        View pricing plans
      </button>
    </div>
  );
};