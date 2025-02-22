import {
  Group,
  Burger,
  Menu,
  useMantineColorScheme,
  Image,
} from "@mantine/core";
import { IconSun, IconMoon, IconUser, IconLogout } from "@tabler/icons-react";

type AppHeaderProps = {
  opened: boolean;
  toggle: () => void;
};
const AppHeader = ({ opened, toggle }: AppHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group
      h="100%"
      p="md"
      justify="space-between"
      style={{ backgroundColor: "#4F5D75" }}
    >
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Image src="./brotecs-logo.webp" className="w-10 h-7" />
      </Group>

      <Group>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconUser color="white" style={{ cursor: "pointer" }} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={
                colorScheme === "dark" ? (
                  <IconSun size={14} />
                ) : (
                  <IconMoon size={14} />
                )
              }
              onClick={() => toggleColorScheme()}
            >
              {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
            </Menu.Item>
            <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default AppHeader;
