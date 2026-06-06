import { useState } from "react";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Team Task Management Portal</h1>

      <TaskForm
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        triggerRefresh={triggerRefresh}
      />

      <hr />

      <TaskList
        setSelectedTask={setSelectedTask}
        refresh={refresh}
      />
    </div>
  );
}

export default App;