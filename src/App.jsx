const url = 'https://course-api.com/react-tours-project';
import { useEffect, useState } from 'react';
import './App.css'
import Loading from './Loading';
import Tours from './Tours';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true)
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);   
    } catch (error){
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchTours()
  }, [])


  if(loading){
    return (
      <>
        <Loading/>
      </>
    )
  }

  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button type='button' style={{marginTop : '2rem'}} 
        className='btn' onClick={()=> fetchTours()}>Refresh page</button>
      </div>
    </main>
  }

  return (
    <>
      <Tours tours={tours} removeTour={removeTour}/> 
    </>
  )
}

export default App
