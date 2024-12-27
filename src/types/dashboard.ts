export interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
  onNavigateHome?: () => void;
}