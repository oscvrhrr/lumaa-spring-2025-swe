import { createContext, useEffect } from "react";
import { ITask } from "../../types/Tasks";
import { useState } from "react";

interface ITaskContext {
  tasks: ITask[];
  fetchTasks: () => void;
}



// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext<ITaskContext | undefined>(undefined);



export const TasksContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([])

  const fetchTasks = async () => {
    if(localStorage.getItem("token")) {
      try {
        const response = await fetch("http://localhost:4001/tasks", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data.allTasks);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  useEffect(() => {
    fetchTasks();
  },[]);

  

  return (
    <TasksContext.Provider value={ { tasks, fetchTasks } }>
      { children }
    </TasksContext.Provider>
  )
}
