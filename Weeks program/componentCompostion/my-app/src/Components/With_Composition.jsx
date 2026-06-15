import { useState } from "react";
import Form from "./Form";
import InputField from "./InputField";
import Button from "./Button";
const App = () => {

  const [username, setUsername] =    useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    alert(
      "Submitted Username: " + username
    );
  };

  return (

    <Form onSubmit={handleSubmit}>

      <InputField   value={username}  onChange={setUsername}     >
        Your name:
      </InputField>
  
      <br />
      <br />

      <Button type="submit">
        Send
      </Button>

       
    </Form>

  );
};


export default App;