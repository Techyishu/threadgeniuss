import { useState } from "react";
import Modal from "react-modal";
import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { ProFeaturesInfo } from "./dashboard/ProFeaturesInfo";

export const DashboardSidebar = ({ userName, onClose, onShowSavedThreads, onShowPricing }: DashboardSidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-full flex-col bg-white text-[#1A1F2C]">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20">
        <h2 className="text-lg font-semibold text-[#1A1F2C]">Menu</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <SidebarNavigation 
          userName={userName} 
          onClose={onClose} 
          onShowSavedThreads={onShowSavedThreads}
        />

        <div className="mt-6 space-y-4">
          <ThreadsCounter />
          <ProFeaturesInfo onShowPricing={onShowPricing} />
          <button onClick={openModal} className="btn-upgrade">
            Upgrade to Pro
          </button>
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Upgrade Plan">
        <h2>Upgrade to Pro</h2>
        <p>Here are the benefits of upgrading to Pro...</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};
