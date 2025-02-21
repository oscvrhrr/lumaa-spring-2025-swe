import Styles from "../App.module.css";
import { useNavigate } from "react-router";
import { CreateTask } from "../components/CreateTask";
import { Task } from "../components/Task";
import { Navbar } from "../components/Navbar";
import { useContext } from "react";
import { TasksContext } from "../components/context/TaskContext";
import { ITask } from "../types/Tasks";

export const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(TasksContext);
  
  if(!context) {
    return <p>Loading...</p>
  }
  const { tasks } = context

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className={Styles.dashboard}>
      <Navbar>
        <button onClick={handleLogout}>Logout</button>
      </Navbar>
      <main>
        <div style={{ display: 'flex'}}>
          <CreateTask />
        </div>
        <div className={Styles.flex}>
          {
            tasks.map((task: ITask) => (
              <Task
               key={task.id}
               task={task} 
              />
            ))
          }
        </div>
      </main>
    </div>
  );
};
