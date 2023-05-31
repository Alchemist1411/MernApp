import './App.css';
import { useState, useEffect } from "react";//React useState hook for storing data inside a state and useEffect for fetching data
import Axios from "axios";

function App() {
  // const [listOfUsers, setListOfUsers] = useState([
  //   // {id: 1, name: "Rogers", age: 30, username: "rogers123"},//manually giving user input without using API call (pre-populate)
  // ]);

  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");


  //API call method
  useEffect(() => {
    Axios.get("https://mernappbackend-ra6g.onrender.com").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("https://mernappbackend-ra6g.onrender.com", {name, age, username}).then((response) => {
      setListOfUsers([...listOfUsers, {name, age, username}]);
    }); 
  };

  return (
    <div className="App">

      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (//return the populated javascript into html based text
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input type="text" placeholder="Name..." onChange={(event) => {
          setName(event.target.value);
        }}
        />
        <input type="number" placeholder="Age..." onChange={(event) => {
          setAge(event.target.value);
        }}
        />
        <input type="text" placeholder="Username..." onChange={(event) => {
          setUsername(event.target.value);
        }}
        />
        <button onClick={createUser}>Create User</button>
      </div>

    </div>
  );
}

export default App;
