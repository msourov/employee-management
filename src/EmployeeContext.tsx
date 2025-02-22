import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  avatar: z.string().optional(),
  department: z
    .string()
    .min(1, "Please select a department")
    .refine(
      (value) =>
        [
          "Engineering",
          "Marketing",
          "Sales",
          "Finance",
          "Operations",
          "IT",
          "Human Resources",
          "Legal",
          "Customer Support",
          "Administration",
        ].includes(value),
      { message: "Invalid department selected" }
    ),
});

export type Employee = z.infer<typeof employeeSchema>;

type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  editEmployee: (updatedEmployee: Employee) => void;
  deleteEmployee: (id: number) => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "New York, USA",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
      address: "Los Angeles, USA",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Michael Johnson",
      phone: "321-654-0987",
      email: "michael@example.com",
      address: "Chicago, USA",
      department: "Sales",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "555-123-4567",
      email: "emily@example.com",
      address: "Houston, USA",
      department: "Finance",
    },
    {
      id: 5,
      name: "Daniel Brown",
      phone: "444-987-1234",
      email: "daniel@example.com",
      address: "San Francisco, USA",
      department: "Engineering",
    },
    {
      id: 6,
      name: "Olivia Wilson",
      phone: "111-222-3333",
      email: "olivia@example.com",
      address: "Boston, USA",
      department: "Human Resources",
    },
    {
      id: 7,
      name: "William Martinez",
      phone: "666-777-8888",
      email: "william@example.com",
      address: "Seattle, USA",
      department: "Operations",
    },
    {
      id: 8,
      name: "Sophia Anderson",
      phone: "999-888-7777",
      email: "sophia@example.com",
      address: "Denver, USA",
      department: "IT",
    },
    {
      id: 9,
      name: "James Taylor",
      phone: "222-333-4444",
      email: "james@example.com",
      address: "Austin, USA",
      department: "Legal",
    },
    {
      id: 10,
      name: "Charlotte White",
      phone: "333-444-5555",
      email: "charlotte@example.com",
      address: "Miami, USA",
      department: "Customer Support",
    },
    {
      id: 11,
      name: "Ethan Harris",
      phone: "777-666-5555",
      email: "ethan@example.com",
      address: "Atlanta, USA",
      department: "Sales",
    },
    {
      id: 12,
      name: "Ava Thomas",
      phone: "888-999-0000",
      email: "ava@example.com",
      address: "Phoenix, USA",
      department: "Administration",
    },
  ]);

  const addEmployee = (employee: Employee) => {
    try {
      const validatedEmployee = employeeSchema.parse(employee);
      setEmployees((prev) => [...prev, validatedEmployee]);
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const editEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, editEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
