import {
  useState,
  createContext,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarToggle(!sidebarToggle);
  }, [sidebarToggle]);
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  const value = useMemo(
    () => ({ sidebarToggle, toggleSidebar, closeSidebar }),
    [sidebarToggle, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
