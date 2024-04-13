import CssBaseline from "@mui/material/CssBaseline";
import EmployeeTable from "./components/EmployeeTable";
import TaskTable from "./components/TaskTable";
import { useState } from "react";

function App() {
  const [name, setName] = useState<string | undefined>();

  return (
    <div>
      <CssBaseline />
      <EmployeeTable
        onTableSelected={(name) => {
          setName(name);
        }}
      />
      <TaskTable name={name} />
    </div>
  );
}

export default App;
