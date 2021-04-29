import { useEffect, useState } from 'react';
import './App.css';


function DogComponent(props) {
  const dog = props.Dog;
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
      <p>{dog.sex} , {dog.age} years old</p>
    </div>
  );
}

function App() {
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
    /* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
    <div>
      {cachedDogs.map(dog =>
        <DogComponent Dog = {dog}></DogComponent>
      )}
    </div>

  );
}

export default App;
