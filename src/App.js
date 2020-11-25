import { useState } from 'react';
import api from './api';
import './App.css';

function App() {

  const getCurrentDate = () => {
    const todayDateTime = new Date();
    const todayDate = todayDateTime.getFullYear()+'-'+(todayDateTime.getMonth()+1)+'-'+todayDateTime.getDate();
    return todayDate;
  }


  const [data, setData] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState("");

  const api_call = async () => {
    try {
      const request = api.get(`planetary/apod?date=${dateInput}&api_key=xXFH8NKuaGQG6rXg257YHkgjHg7UykQpX0CqjPgE`);
      const response = await request;
      setData(response.data);
      setError("");
    } catch(err) {
      console.log(err.message);
      setError(err.message);
      setData([]);
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    api_call(); 
  }


  return (
    <div className="App">
      <h1>Astronomy Picture of the Day</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" min="1995-06-16" max={getCurrentDate()} value={dateInput} onChange={e => {setDateInput(e.target.value)}}/>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
      {data.url && <img className="apod-image" src={data.hdurl} alt={data.title}/>}
      {!data.url && <p>{error}</p>}
    </div>
  );
}

export default App;
