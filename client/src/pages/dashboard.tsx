import { useEffect, useState } from 'react'
import TextField from '../components/atom/text-field/text-field'
import Service from '../service/auth-service';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Dashboard() {
    const [input, setInput] = useState("");
    const [weatherData, setWeatherData] = useState<any>();
    const [searchedCity, setSearchedCity] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleSearch() {
        if (input.length < 2) {
            alert("Enter a city name first!")
            return
        }
        setLoading(true);
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=f2aef3360f90e2668991f535c0b5004c&query=${input}`);
            const data = await response.json();
            console.log(data);
            setWeatherData(data);

            if (response.ok) {
                //send data to backend
                await Service.sendCity({ city: input }, localStorage.getItem("Token") as string);
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    async function handleCityClick(name: string) {
        setLoading(true);
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=f2aef3360f90e2668991f535c0b5004c&query=${name}`);
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
            setInput(name)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    function handleLogout() {
        setLoading(true);
        logout();
        navigate("/");
        setLoading(false);
    }

    useEffect(() => {
        const getSearchedCities = async () => {
            const response = await Service.getCitys(localStorage.getItem("Token") as string);
            console.log(response);
            setSearchedCity(response?.data?.data);

        }
        getSearchedCities();
    }, [])
    return (
        <div className=''>
            {loading && <Loading />}
            <div className='flex justify-between items-center'>
                <h2 className='flex justify-center font-bold text-xl'>Weather Of {input}</h2>
                <button className='items-center bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700' onClick={handleLogout}>Logout</button>
            </div>
            <div className='w-full flex items-end align-middle justify-center'>
                <TextField value={input} onInput={(value: string) => setInput(value)} type={'text'} placeholder='Search City Here' />

                <button
                    onClick={handleSearch}
                    disabled={input == "" ? true : false}
                    className='items-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700'
                >
                    Search
                </button>
            </div>
            <div className='flex justify-around'>
                <div>
                    <h1 className='font-semibold'>Searched Cities</h1>
                    {searchedCity?.map((item: any) => (
                        <p onClick={() => handleCityClick(item.city)} className='hover:bg-gray-100 flex justify-center cursor-pointer'>{item.city}</p>
                    ))}
                </div>
                <div>
                    <div>
                        <p className='font-semibold text-xl'>Feels like: <span>{weatherData?.current.feelslike}</span> </p>
                        <p className='font-semibold text-xl'>humidity: <span>{weatherData?.current.humidity}</span> </p>
                        <p className='font-semibold text-xl'>pressure: <span>{weatherData?.current.pressure}</span> </p>
                        <p className='font-semibold text-xl'>temperature: <span>{weatherData?.current.temperature}</span> </p>
                        <p className='font-semibold text-xl'>wind_degree: <span>{weatherData?.current.wind_degree}</span> </p>
                        <p className='font-semibold text-xl'>wind_dir: <span>{weatherData?.current.wind_dir}</span> </p>
                        <p className='font-semibold text-xl'>wind_speed: <span>{weatherData?.current.wind_speed}</span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
