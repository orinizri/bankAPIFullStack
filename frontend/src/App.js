import  { useEffect, useState } from 'react'
import api from './api/api'

function App() {// eslint-disable-next-line
  const [ user , setUser ] = useState('');
  useEffect(()=>{
    const  getRequest = async () => {
      const { data } = await api.get('/')
      setUser(data)
    }
    getRequest()
  }, [user])
  return (
    <div>
      <h1>Handle your bank</h1>
      {user ? user : `Hello world!` }
      {/* <button onClick={getRequest}>get</button> */}
    </div>
  );
}

export default App;
