import CssBaseline from "@mui/material/CssBaseline";
import EmployeeTable from "./components/layouts/EmployeeTable";
import TaskTable from "./components/layouts/TaskTable";
import { useState } from "react";
import Box from "@mui/material/Box";
import { employees, employeeType, factories } from "./dummyData";

function App() {
  /**
   * Answer
   * 1. Order employees list (in factories) by alphabetical order
   */
  factories.forEach((factory) => {
    factory.employees.sort();
  });
  /**
   * Answer
   * 2.Make a function that take as parameters dayTime and return number of employee working
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getNumberOfEmployeesWorking(dayTime: string): number {
    const currentTime = new Date(`2000-01-01 ${dayTime}`);
    const workingEmployees = employees.filter((employee) => {
      const typeInfo = employeeType.find((type) => type.id === employee.type);
      if (typeInfo) {
        const workBegin = new Date(`2000-01-01 ${typeInfo.work_begin}`);
        const workEnd = new Date(`2000-01-01 ${typeInfo.work_end}`);
        if (workBegin <= currentTime && currentTime <= workEnd) {
          return true;
        }
        if (
          workBegin > workEnd &&
          (currentTime >= workBegin || currentTime <= workEnd)
        ) {
          return true;
        }
      }
      return false;
    });

    return workingEmployees.length;
  }
  const dayTime = "13:00:00";
  console.log(getNumberOfEmployeesWorking(dayTime));
  /** ----------------------------------------------------------------------- */

  /**
   * Answer
   * 3 & 4
   */
  const [name, setName] = useState<string | undefined>();

  return (
    <Box sx={{ backgroundColor: "#e8e9f1", px: 4, py: 5 }}>
      <CssBaseline />
      <EmployeeTable
        onTableSelected={(name) => {
          setName(name);
        }}
      />
      <Box mb={2} />
      <TaskTable name={name} />
    </Box>
  );
}

export default App;
