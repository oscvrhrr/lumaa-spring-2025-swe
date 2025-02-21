import { useState } from "react"
import { useContext } from "react";
import { TasksContext } from "./context/TaskContext";
import { ITask } from "../types/Tasks";

export const EditTask = ({ task, toggle }: {task: ITask, toggle: () => void }) => {
  const [inputValues, setInputValues] = useState({ title: task.title || "" , description: task.description || "", isComplete: task.isComplete || false });
  const context = useContext(TasksContext);

  if(!context) {
    return <p>Loading...</p>
  }

  const { fetchTasks } = context;

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setInputValues((prevState) => ({...prevState, [name]: type === 'checkbox' ? checked : value,}))
  }

  const updateTask = async(event: React.FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:4001/tasks/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: inputValues.title,
          description: inputValues.description,
          isComplete: inputValues.isComplete,
        })
      });
      fetchTasks();
      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={(event) => updateTask(event, task.id)} action="">
      <label htmlFor="title">new title</label>
      <input value={inputValues.title} onChange={(event) => handleInputValues(event)} type="text" name="title" id="title" placeholder="enter new title"/>
      <label htmlFor="description">new desc</label>
      <input value={inputValues.description} onChange={(event) => handleInputValues(event)} type="text" name="description" id="description" placeholder="enter new description" />
      <label htmlFor="isComplete">
        complete
        <input onChange={(event) => handleInputValues(event)} type="checkbox" id="isComplete" name="isComplete" checked={inputValues.isComplete} />
      </label>
      <button>edit</button>
    </form>

  )
}
