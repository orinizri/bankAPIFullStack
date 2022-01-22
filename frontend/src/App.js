import { useEffect, useState } from 'react'
import axiosRequest from './api/api'
import { v4 as uuidv4 } from 'uuid';
import ClientSection from './components/DisplayAddClient/AddClient';
import UpdateClientSection from './components/DisplayUpdateClient/UpdateClient'


function App() {
  const [clientsData, setClientsData] = useState('');
  const [showClientsMode, setShowClientsMode] = useState(false);
  const [singleClientMode, setSingleClientMode] = useState(false);
  const [client, setClient] = useState({});
  const [showAddClientSection, setShowAddClientSection] = useState(false);
  const [isNewClientAdded, setIsNewClientAdded] = useState(false);
  const [updateMode, setUpdateMode] = useState(true);
  const [updatedClient, setUpdatedClient] = useState({});

  const getClient = async (e) => {
    const clientId = e.target.previousElementSibling.value;
    if (isNewClientAdded === true) {
      setIsNewClientAdded(false)
      setShowAddClientSection(false)
      setShowClientsMode(false)
    }
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
      if (showClientsMode) {
        const { data } = await axiosRequest.get('/allClients')
        setClientsData(data)
      }
    }
    getClientsData()
  }, [clientsData, showClientsMode, updateMode, singleClientMode, updatedClient])

  const isNewClient = (boolean) => {
    if (boolean) {
      setIsNewClientAdded(boolean)
      setShowClientsMode(false)
      setSingleClientMode(false)
      setShowClientsMode(false)
      setUpdateMode(false)
    }
    setIsNewClientAdded(!boolean)
  }
  const updateClient = () => {
    if (!updateMode) {
      setUpdateMode(!updateMode)
      setSingleClientMode(false)
      setShowAddClientSection(false)
      setShowAddClientSection(false)

    }

  }
  const ClientUpdates = async (updates) => {
    const id = updates[0].value
    const actionAmount = updates[1].value
    const actionType = updates[1].id
    try {
      const clientRequest = await axiosRequest.put(`/clients/${actionType}/` + id + '/' + actionAmount)
      const selectedClient = (clientRequest.data)
        console.log(selectedClient)
        setUpdatedClient(selectedClient)
        setIsNewClientAdded(false)
        setSingleClientMode(false)
        setShowAddClientSection(false)
        setUpdateMode(true)
      
    } catch (e) {
      throw Error('Unable to fulfill request: ' + e.message)
    }
  }
  const setShowClients = () => {
    if (showClientsMode) {
      setIsNewClientAdded(false)
      setSingleClientMode(false)
      setUpdateMode(false)
      setShowAddClientSection(false)
    }
    setShowClientsMode(!showClientsMode)
  }
  return (
    <div className="container">
      <h1>Handle your bank</h1>
      <div className="buttons-container">
        <button onClick={() => setShowClients()}>
          Toggle clients
        </button>
        <div className="get-client-container">
          <label id="id">Search client:</label>
          <input htmlFor="id" placeholder='id' />
          <button onClick={(e) => getClient(e)}>Get client</button>
        </div>
        <button onClick={() => setShowAddClientSection(!showAddClientSection)}>Add new Client</button>
        <button onClick={() => updateClient()}>Update Client</button>
      </div>
      {
        showAddClientSection && <ClientSection newClientStatus={isNewClient} />
      }
      {
        updateMode && <UpdateClientSection getUpdateDetails={ClientUpdates} />
      }
      {showClientsMode && clientsData &&
        clientsData.map(({ deposit, _id, cash, name }) => {
          return (<ul key={_id}>
            <li>Client name: {name}</li>
            <li>Client id: {_id}</li>
            <li>Cash: {cash}</li>
            <li>Deposit: {deposit}</li>
          </ul>)
        })}

      {singleClientMode && client && Object.keys(client).filter(key => key !== '__v').map((key) => {
        return (
          <div key={uuidv4()}>
            <div className="client-view">{key}: {client[key]}</div>
          </div>
        )
      })}

      {updatedClient &&
      Object.keys(updatedClient).filter(key => key !== '__v').map((key) => {
        return (
          <div key={uuidv4()}>
            <div className="updates">{key}: {updatedClient[key]}</div>
          </div>
        )
      })
    }

    </div>
  );
}

export default App;
