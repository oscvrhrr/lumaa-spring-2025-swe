import { Form } from "../components/Form"
import { useState } from "react"
import { Navbar } from "../components/Navbar"

export const Landing = () => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggleForm = (showLogin: boolean) => {
    setIsToggled(showLogin);
  }



  return (
    <div>
      <Navbar>
        <button onClick={() => handleToggleForm(true)} >Login</button>
        <button onClick={() => handleToggleForm(false)}>Register</button>
      </Navbar>
      {
        !isToggled ?
        <Form
          title="register"
          segment="register"
        />
        :
        <Form
        title="login"
        segment="login"
      />


      }
  
    </div>
    
  )
}
