import logo from './logo.svg';
import './App.css';
import  { useState } from 'react'
import api from './api/api'

function App() {
  const [ user , setUser ] = useState('');
  const  getRequest = async () => {
    const { data } = await api.get('/users')
    console.log(data)
  }
  return (
    <div className="App">
      Hello world!
      <button onClick={getRequest}>get</button>
    </div>
  );
}

export default App;
