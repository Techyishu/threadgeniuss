interface ProFeaturesInfoProps {
  onShowPricing?: () => void;
}

export const ProFeaturesInfo = ({ onShowPricing }: ProFeaturesInfoProps) => {
  return (
    <div className="px-4 py-3 text-center bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
      <h3 className="text-black font-bold mb-1">Upgrade to Pro</h3>
      <button 
        onClick={onShowPricing}
        className="text-sm text-black font-semibold hover:text-cyber-blue transition-colors cursor-pointer"
      >
        View pricing plans
      </button>
    </div>
  );
};