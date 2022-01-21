import { useEffect, useState } from 'react'
import axiosRequest from './api/api'

function App() {
  const [user, setUser] = useState('');
  const [showClientsMode, setShowClientsMode] = useState(false);
  useEffect(() => {
    const getRequest = async () => {
      const { data } = await axiosRequest.get('/allClients')
      // console.log(data)
      setUser(data)
    }
    getRequest()
  }, [user])
  return (
    <div className="container">
      <h1>Handle your bank</h1>
      <div className="buttons-container">
        <button onClick={()=>setShowClientsMode(!showClientsMode)}>{showClientsMode ? 'Hide all clients' : 'Show all client'}</button>
        <div className="get-client-container">
          <label id="id">Search client:</label>
          <input htmlFor="id" placeholder='id' />
          <button>Get client</button>
        </div>
        <button>Add new Client</button>
      </div>
      {showClientsMode && user &&
        user.map((client) => {
          return (<ul key={client._id}>
            <li>name: {client.name}, </li>
            <li>_id: {client._id}</li>
          </ul>)
        })}
    </div>
  );
}

export default App;
