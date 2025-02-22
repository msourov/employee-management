import { Text, Center, Box, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const AppFooter = () => {
  return (
    <Box
      py="md"
      px="xl"
      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    >
      {/* Social Links */}
      <Center>
        <Group gap="md">
          <ActionIcon
            size="lg"
            variant="subtle"
            component="a"
            href="https://github.com/msourov"
            target="_blank"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-all"
          >
            <IconBrandGithub size={24} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="subtle"
            component="a"
            href="https://www.linkedin.com/in/mahmud-hasan-sourov-06bbb0168/"
            target="_blank"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            <IconBrandLinkedin size={24} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="subtle"
            component="a"
            href="https://leetcode.com/u/steelRabbit/"
            target="_blank"
            className="hover:text-blue-500 dark:hover:text-blue-300 transition-all"
          >
            <IconBrandLeetcode size={24} />
          </ActionIcon>
        </Group>
      </Center>

      {/* Copyright Text */}
      <Center>
        <Text size="sm" className="text-center">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Mahmud Hasan</span>. All rights
          reserved.
        </Text>
      </Center>
    </Box>
  );
};

export default AppFooter;
