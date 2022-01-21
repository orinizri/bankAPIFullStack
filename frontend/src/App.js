import  { useEffect, useState } from 'react'
import axiosRequest from './api/api'

function App() {
  const [ user , setUser ] = useState('');
  useEffect(()=>{
    const  getRequest = async () => {
      const { data } = await axiosRequest.get('/allClients')
      // console.log(data)
      setUser(data)
    }
    getRequest()
  }, [user])
  return (
    <div>
      <h1>Handle your bank</h1>
      {user ? 
      user.map((client,index) => {
        // console.log(client)
        return (<div key={client._id}>
        <span>client index: {index}, </span>
        <span>name: {client.name}, </span>
        <span>_id: {client._id}</span>
        </div>)
      }) : 
      <p>Loading...</p> }
      {/* {user ? user : <p>no users</p>} */}
    </div>
  );
}

export default App;
