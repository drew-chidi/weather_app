import './App.css';
import Weather from './components/Weather';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';


function App() {
  const [search, setSearch] = useState(''); 
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  // api call from 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
  const searchWeatherHandler = async(event) =>{
    if(event.key === "Enter"){
        setLoading(true);
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bf49549218763d6c5b52bb25dfb3d257`)
        .then((response) => response.json())
        .then((response) => {
        setWeather(response);
        // console.log(response);
        setSearch('');
        setLoading(false);
        });
    }
  }

  const searchHandler =(event)=>{
    setSearch(event.target.value);  
  }

  // Background change
  const backgroundChange =()=>{
    if (typeof weather.main == 'undefined'){
      return 'app';
    }else if((Math.round(weather.main.temp-273.15) > 16)){
      return 'app warm'
    }else{
      return'app'
  }
}

  return (
    <div className={backgroundChange()}>
      <main className="background-image">
      <div>
            <div className='search-box'>
                <input 
                className='search-bar'
                type='text' 
                placeholder='search city...'
                onChange={searchHandler} 
                value = {search}
                onKeyPress={searchWeatherHandler} />
            </div>
        </div>
          {/* Applying the Loading State  */}
        {!loading &&         
        <section> 
        {(typeof weather!=="undefined" && weather.cod!=='404') ? (
        <Weather weatherData={weather}/>
        ) : (<p>{weather.message}</p>)} 
        </section> }
        {loading && <p>Loading...</p>}
        
 
      </main>             
    </div>
  );
  }

export default App;
