const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] },
];

const employeeType = [
  { id: 1, name: "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
  { id: 2, name: "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
  { id: 3, name: "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

const employees = [
  { id: 1, name: "Alice", type: 2 },
  { id: 2, name: "Bob", type: 3 },
  { id: 3, name: "John", type: 2 },
  { id: 4, name: "Karen", type: 1 },
  { id: 5, name: "Miles", type: 3 },
  { id: 6, name: "Henry", type: 1 },
];

const tasks = [
  { id: 1, title: "task01", duration: 60, name: "Alice" }, // min
  { id: 2, title: "task02", duration: 120, name: "Karen" },
  { id: 3, title: "task03", duration: 180, name: "Miles" },
  { id: 4, title: "task04", duration: 360, name: "Alice" },
  { id: 5, title: "task05", duration: 30, name: "Bob" },
  { id: 6, title: "task06", duration: 220, name: "Bob" },
  { id: 7, title: "task07", duration: 640 },
  { id: 8, title: "task08", duration: 250, name: "Karen" },
  { id: 9, title: "task09", duration: 119, name: "Miles" },
  { id: 10, title: "task10", duration: 560, name: "John" },
];

export { factories, employeeType, employees, tasks };
