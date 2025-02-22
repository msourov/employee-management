// AppLayout.tsx
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppHeader from "./components/Header";
import AppNavbar from "./components/Navbar";
import AppFooter from "./components/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{
        main: { paddingBlock: "2rem" },
      }}
      footer={{ height: 100 }}
      padding="0"
    >
      <AppHeader opened={opened} toggle={toggle} />
      <AppNavbar close={close} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppFooter />
    </AppShell>
  );
};

export default AppLayout;
