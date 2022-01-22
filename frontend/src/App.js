import { useEffect, useState } from 'react'
import axiosRequest from './api/api'

function App() {
  const [clientsData, setClientsData] = useState('');
  const [showClientsMode, setShowClientsMode] = useState(false);
  const [singleClientMode, setSingleClientMode] = useState(false);
  const [client, setClient] = useState({});

  const getClient = async (e) => {
    const clientId = e.target.previousElementSibling.value;
    try {
      const clientRequest = await axiosRequest.get('/clients/' + clientId)
      setShowClientsMode(false)
      if (clientRequest.data[0]._id === clientId) {
        setClient(clientRequest.data[0])
        setSingleClientMode(true)
        console.log(clientRequest.data[0])
      }
    } catch (e) {
      throw Error('Unable to fulfill server request: ' + e.message)
    }
  }
  
  useEffect(() => {
    const getClientsData = async () => {
      const { data } = await axiosRequest.get('/allClients')
      setClientsData(data)
    }
    getClientsData()
  }, [clientsData])

  return (
    <div className="container">
      <h1>Handle your bank</h1>
      <div className="buttons-container">
        <button onClick={()=>setShowClientsMode(true)}>
          Show all clients
        </button>
        <div className="get-client-container">
          <label id="id">Search client:</label>
          <input htmlFor="id" placeholder='id' />
          <button onClick={(e)=> getClient(e)}>Get client</button>
        </div>
        <button>Add new Client</button>
      </div>

      {showClientsMode && clientsData &&
        clientsData.map(({deposit, _id, cash, name}) => {
          return (<ul key={_id}>
            <li>Client name: {name}, </li>
            <li>Client id: {_id}</li>
            <li>Cash: {deposit}</li>
            <li>Deposit: {deposit}</li>
          </ul>)
        })}

        <ul>
        {singleClientMode && client && Object.keys(client).map((key, index) => {
            return (
            <>
              <li key={index}>{key}: {client[key]}</li>
            </>
            )
          })}
        </ul>

    </div>
  );
}

export default App;
