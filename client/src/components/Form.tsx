import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
import Styles from "../App.module.css"


interface FormProps {
  title: string;
  segment: string;

}

export const Form = ({ title, segment }: FormProps) => {
  const { inputValues, handleInputs } = useForm();
  const navigate = useNavigate();
 
  const registerUser = async(event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        const response = await fetch(`http://localhost:4001/auth/${segment}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputValues.username,
            password: inputValues.password
          })
        });
        if(response.ok) {
          const parsedData = await response.json();
          localStorage.setItem("token", parsedData.access_token)
          navigate("/dashboard");
        }
      } catch(error) {
        console.log("Error registering user", error)
      }
  }


  return (
    <form onSubmit={(event) => registerUser(event) } className={Styles.form}>
      <h2>{ title }</h2>
      <label htmlFor="username">username</label>
      <input 
        type="text" 
        id="username" 
        name="username"
        autoComplete="username"
        onChange={(event) => handleInputs(event)}
        value={ inputValues.username }
        placeholder="enter your username..."
        required
       />
      <label htmlFor="password">password</label>
      <input 
        type="text" 
        id="password" 
        name="password"
        autoComplete="new-password"
        onChange={(event) => { handleInputs(event)}}
        value={ inputValues.password }
        placeholder="enter your password..."
        required
      />
      <button type="submit">{ title }</button>
    </form>
  );
};
