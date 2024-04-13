import CssBaseline from "@mui/material/CssBaseline";
import EmployeeTable from "./components/EmployeeTable";
import TaskTable from "./components/TaskTable";
import { useState } from "react";
import Box from "@mui/material/Box";

function App() {
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
