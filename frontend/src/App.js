import  { useEffect, useState } from 'react'
import axiosRequest from './api/api'

function App() {
  const [ user , setUser ] = useState('');
  useEffect(()=>{
    const  getRequest = async () => {
      const { data } = await axiosRequest.get('/clients')
      setUser(data)
      console.log(data)
    }
    getRequest()
  }, [user])
  return (
    <div>
      <h1>Handle your bank</h1>
      {user ? user : `Hello world! add` }
    </div>
  );
}

export default App;
