import { useState } from "react"
import Styles from "../App.module.css"
import { useContext } from "react";
import { TasksContext } from "./context/TaskContext";

export const CreateTask = () => {
  const [inputValues, setInputValues] = useState({ title: "", description: "" });
  const context = useContext(TasksContext);

  if(!context) {
    return <p>Loading...</p>
  }
  const { fetchTasks } = context

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({...prevState, [name]: value}))
  }

  const createTask = async(event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:4001/tasks", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: inputValues.title,
          description: inputValues.description,
        })
      });
      if (response.ok) {
        setInputValues({ title: "", description: ""})
        fetchTasks()
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
   <form onSubmit={(event) => createTask(event)} className={Styles.taskform}>
    <h2>create new task</h2>
    <label htmlFor="title">title</label>
    <input 
      type="text" 
      name="title" 
      id="title"
      required
      value={inputValues.title}
      onChange={(event) => handleInputValue(event)}
    />
    <label htmlFor="description">description</label>
    <input 
      type="text" 
      name="description" 
      id="description" 
      required
      value={inputValues.description}
      onChange={(event) => handleInputValue(event)}
    />
    <button type="submit">add task</button>
   </form>
  )
}
