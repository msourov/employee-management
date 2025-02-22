import {
  Table,
  Button,
  ActionIcon,
  Box,
  Tooltip,
  useMantineColorScheme,
  TextInput,
  Select,
} from "@mantine/core";
import { useEmployeeContext } from "../EmployeeContext";
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconSearch,
  IconFilter,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import EmployeeForm from "./EmployeeForm";
import { useState } from "react";

const EmployeeTable = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  const { employees, deleteEmployee } = useEmployeeContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null); // Declare the filterDepartment state

  const handleEdit = (id: number) => {
    setEditId(id);
    open();
  };

  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery);

    const matchesDepartment = filterDepartment
      ? emp.department === filterDepartment
      : true;

    return matchesSearch && matchesDepartment;
  });

  return (
    <Box className="w-[95%] mx-auto p-4">
      <Box className="flex justify-between items-center mb-4 space-x-4">
        <TextInput
          placeholder="Search by name, email, or phone"
          leftSection={<IconSearch size={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[50%]"
        />
        <Select
          placeholder="Filter by Department"
          leftSection={<IconFilter size={18} />}
          data={departments}
          value={filterDepartment} // Bind to filterDepartment state
          onChange={setFilterDepartment}
          clearable
          className="w-[30%]"
        />
        <Button
          leftSection={<IconPlus size={18} />}
          variant="gradient"
          gradient={{ from: "teal", to: "cyan" }}
          onClick={() => {
            setEditId(null);
            open();
          }}
          radius="md"
        >
          Add Employee
        </Button>
      </Box>

      {/* Employee Table */}
      <Table
        striped
        highlightOnHover
        withColumnBorders
        className={`${
          isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg rounded-lg overflow-hidden"
        }`}
      >
        {/* Table Head */}
        <Table.Thead
          className={`${isDarkMode ? "bg-gray-800" : "bg-blue-100"}`}
        >
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Contact</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th className="text-center">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        {/* Table Body */}
        <Table.Tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <Table.Tr
                key={emp.id}
                className={`group ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Table.Td
                  className={isDarkMode ? "text-gray-200" : "text-gray-800"}
                >
                  {emp.name}
                </Table.Td>
                <Table.Td>
                  <div className="space-y-1">
                    <div
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } text-sm`}
                    >
                      {emp.phone}
                    </div>
                    <div
                      className={`${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      } text-xs`}
                    >
                      {emp.email}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td
                  className={`text-sm max-w-[200px] truncate ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {emp.address}
                </Table.Td>
                <Table.Td>
                  <Box className="flex justify-center space-x-3">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => emp.id !== undefined && handleEdit(emp.id)}
                      radius="sm"
                    >
                      <Tooltip label="Edit">
                        <IconEdit size={18} />
                      </Tooltip>
                    </ActionIcon>

                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() =>
                        emp.id !== undefined && deleteEmployee(emp.id)
                      }
                      radius="sm"
                    >
                      <Tooltip label="Delete">
                        <IconTrash size={18} />
                      </Tooltip>
                    </ActionIcon>
                  </Box>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4} className="text-center py-4 text-gray-500">
                No employees found
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <EmployeeForm opened={opened} onClose={close} editId={editId} />
    </Box>
  );
};

export default EmployeeTable;
