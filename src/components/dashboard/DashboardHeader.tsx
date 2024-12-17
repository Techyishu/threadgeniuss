export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-center flex-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#8B5CF6]">Thread</span>{" "}
          <span className="text-[#D6BCFA]">Genius</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Transform YouTube content into engaging threads
        </p>
      </div>
    </div>
  );
};