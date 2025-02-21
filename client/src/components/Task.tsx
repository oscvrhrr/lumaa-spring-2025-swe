import Styles from "../App.module.css"
import { ITask } from "../types/Tasks";
import { useContext } from "react";
import { TasksContext } from "./context/TaskContext";
import { useState } from "react";
import { EditTask } from "./EditTask";

export const Task = ({ task }: { task: ITask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(TasksContext);
    
    if(!context) {
      return <p>Loading...</p>
    }
    const { fetchTasks } = context

  const deleteTask = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4001/tasks/${task.id}`, { 
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if(response.ok) {
      fetchTasks()
      console.log(response)
    }
  }


  
  return (
    <li className={Styles.task}>
      {isEditing && <EditTask task={task} toggle={() => setIsEditing(false)} />}
      <h3>Title: {task.title}</h3>
      <p>description: {task.description}</p>
      <p className={task.isComplete ? Styles.complete : Styles.incomplete}>
        completed: {task.isComplete ? "complete" : "incomplete"}
      </p>
      <div>
        <button onClick={(event) => deleteTask(event)}>delete</button>
        {!isEditing && <button onClick={() => setIsEditing(true)}>edit</button>}
      </div>
    </li>
  );
}
