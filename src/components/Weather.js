import React from 'react';
import './Weather.css'

const Weather = (props) => {
    const data = props.weatherData;

    // Min and Max Temperature
    const minmax = (min, max) =>{
        return(
            <h3 className='low-high'>
                <span>L:{Math.round(data.main.temp_min-273)}&deg;</span>
                <span>H:{Math.round(data.main.temp_max-273)}&deg;</span>
            </h3>
            
        )
    }

    // Date Builder Function

    const dateBuilder =(d)=>{
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];

        return `${day}, ${date} ${month}.`;
    }


    // Sunrise Conversion
    const sunriseConvert = ()=>{
        let sunriseDate = new Date(data.sys.sunrise*1000);
        // Hours part from the timestamp
        let hoursSunrise = sunriseDate.getHours();
        // Minutes part from the timestamp
        let minutesSunrise = "0" + sunriseDate.getMinutes();
        // Will display time in 10:30 format
        let sunrise = hoursSunrise + ':' + minutesSunrise.substr(-2);
        return sunrise;

    }
 

    // Sunset Conversion
    const sunsetConvert = ()=>{

        let sunsetDate = new Date(data.sys.sunset*1000);
        // Hours part from the timestamp
        let hoursSunset = sunsetDate.getHours();
        // Minutes part from the timestamp
        let minutesSunset = "0" + sunsetDate.getMinutes();
        // Will display time in 10:30 format
        let sunset = hoursSunset + ':' + minutesSunset.substr(-2);
        return sunset;
    }

    




    return (

        
        <div className ='container'>
            {(data!== "400" && Object.keys(data).length !== 0) ? (
                <React.Fragment>
                <div className="location-box">
                    <div className="location">

                        {/* City and Country JSX */}
                        {`${data.name}, ${data.sys.country}`}
                    </div>
                    <h5><em>{dateBuilder(new Date())}</em></h5>
                </div>
                <div className="weather-box">

                    {/* Weather and Description */}
                    <div className="main">{data.weather[0].main}</div>
                    <div className="description"><h5><em>{data.weather[0].description}</em></h5></div>
                    <div className="temperature">{Math.round(data.main.temp-273.15)}&deg;</div>
                    <div className="low-high">{minmax()}</div>

                </div>
                <div>
                <div className='weather-details'>
                    <div className='details-card-start'>
                        <h6>SUNRISE</h6>
                        <div>{sunriseConvert()}</div>
                    </div>
                    <div className='details-card-end'>
                        <h6>SUNSET</h6>
                        <div>{sunsetConvert()}</div>
                    </div>
                </div>

                <div className='weather-details'>
                    <div className='details-card-start'>
                        <h6>FEELS LIKE</h6>
                        <div>{Math.round(data.main.feels_like-273.15)}&deg;</div>
                    </div>
                    <div className='details-card-end'>
                        <h6>HUMIDITY</h6>
                        <div>{data.main.humidity}%</div>
                    </div>
                </div>

                <div className='weather-details'>
                    <div className='details-card-start'>
                        <h6>WIND</h6>
                        <div>{`${data.wind.deg}\u00B0, ${data.wind.speed}m/s`}</div>
                    </div>
                    <div className='details-card-end'>
                        <h6>PRESSURE</h6>
                        <div>{data.main.pressure}hPa</div>
                    </div>
                </div>

                </div>
            </React.Fragment>     
            ) : ('')

            }
            
                   
        </div>
    )
 
}

export default Weather;
