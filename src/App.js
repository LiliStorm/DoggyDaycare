import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';


function capitalizeFirstLetter(value){
  return value[0].toUpperCase() + value.slice(1);
}

function DogComponent(props) {
  const dog = props.Dog;
  const owner = dog.owner;
  const divstyle = {
    border: "solid",
    borderColor: "lightgrey",
    borderWidth: "1px",
    marginBottom: "5px"
  };
  const picstyle = {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover"
  };

  return (
    <div style={divstyle}>
      <h2><img style={picstyle} src={dog.img} alt=""/> {dog.name}</h2>
      <p>{capitalizeFirstLetter(dog.sex)}, {capitalizeFirstLetter(dog.breed)}, {dog.age} years old</p>
      <p>Chip number: {dog.chipNumber}</p>
      <p><b>Owner:</b> {owner.name} {owner.lastName}, {owner.phoneNumber}</p>
    </div>
  );
}

function App() {

  return(
    <Router>
      <div>
      <Switch>
        <Route path="/clients">
          <ClientsComponent></ClientsComponent>
        </Route>
        <Route path="/raw">
          <RawDataComponent></RawDataComponent>
        </Route>
        <Route path="/">
          <WelcomeComponent></WelcomeComponent>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

function WelcomeComponent() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/clients">Go to clients</Link>
      <br></br>
      <Link to="/raw">Go to raw</Link>
    </div>
    )

}

function ClientsComponent() {
  const [cachedDogs, setData] = useState([]);
  const getData=()=>{
    fetch('https://api.jsonbin.io/b/6087d9c3f6655022c46d0b41')
      .then(response => response.json())
      .then(fetchedDogs => setData(fetchedDogs));
  }
  useEffect(()=>{
    getData()
  },[]);

  return (
    <div>
      {cachedDogs.map(dog =>
        <DogComponent Dog = {dog}></DogComponent>
      )}
    </div>

  );
}

function RawDataComponent() {
  const [cachedDogs, setData] = useState([]);
  const getData=()=>{
    fetch('https://api.jsonbin.io/b/6087d9c3f6655022c46d0b41')
      .then(response => response.json())
      .then(fetchedDogs => setData(fetchedDogs));
  }
  useEffect(()=>{
    getData()
  },[]);
  return <span>{
    JSON.stringify(cachedDogs)
    }</span>
}

export default App;
