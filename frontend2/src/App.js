import React,{ useState} from 'react';
import api from './services/api'
import Routes from './routes'
import './App.css';

import logo from './assets/logo.svg'


function App() {
  const [email, setEmail] = useState('')
  async function handleSubmit(event){
    event.preventDefault();
    const response = await api.post('/sessions',{ email })

    const { _id } = response.data;
    localStorage.setItem('user', _id);


  }
  return (
    <div className="container">
      <img src={logo} alt="Aircnc"/>
      <div className="content">
        <Routes />
        
      </div>

    </div>
  );
}

export default App;
