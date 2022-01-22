import { useEffect, useState } from 'react'
import axiosRequest from './api/api'
import { v4 as uuidv4 } from 'uuid';
import AddClientSection from './components/DisplayAddClient/AddClient';

function App() {
  const [clientsData, setClientsData] = useState('');
  const [showClientsMode, setShowClientsMode] = useState(false);
  const [singleClientMode, setSingleClientMode] = useState(false);
  const [client, setClient] = useState({});
  const [showAddClientSection, setShowAddClientSection] = useState(true);
  const [isNewClientAdded, setIsNewClientAdded] = useState(false);

  const getClient = async (e) => {
    const clientId = e.target.previousElementSibling.value;

    try {
      const clientRequest = await axiosRequest.get('/clients/' + clientId)
      setShowClientsMode(false)
      if (clientRequest.data[0]._id === clientId) {
        setClient(clientRequest.data[0])
        setSingleClientMode(true)
        console.log(clientRequest.data[0])
      } else {
        throw Error('Client does not exist')
      }
    } catch (e) {
      throw Error('Unable to fulfill request: ' + e.message)
    }
  }
  
  useEffect(() => {
    const getClientsData = async () => {
      const { data } = await axiosRequest.get('/allClients')
      setClientsData(data)
    }
    getClientsData()
  }, [clientsData])

  const isNewClient = (boolean) => {
    console.log(boolean)
    if (boolean) {
      setIsNewClientAdded(boolean)
      setShowClientsMode(false)
      setSingleClientMode(false)
      // setShowAddClientSection(false)
    }
  }


  return (
    <div className="container">
      <h1>Handle your bank</h1>
      <div className="buttons-container">
        <button onClick={()=>setShowClientsMode(!showClientsMode)}>
          Toggle clients
        </button>
        <div className="get-client-container">
          <label id="id">Search client:</label>
          <input htmlFor="id" placeholder='id' />
          <button onClick={(e)=> getClient(e)}>Get client</button>
        </div>
        <button onClick={()=>setShowAddClientSection(!showAddClientSection)}>Add new Client</button>
      </div>
      {
        showAddClientSection && <AddClientSection newClientStatus={isNewClient}/>
      }

      {showClientsMode && clientsData &&
        clientsData.map(({deposit, _id, cash, name}) => {
          return (<ul key={_id}>
            <li>Client name: {name}, </li>
            <li>Client id: {_id}</li>
            <li>Cash: {cash}</li>
            <li>Deposit: {deposit}</li>
          </ul>)
        })}

        {singleClientMode && client && Object.keys(client).filter(key => key !== '__v').map((key) => {
            return (
            <div key={uuidv4()}>
              <>{key}: {client[key]}</>
            </div>
            )
          })}
    </div>
  );
}

export default App;
