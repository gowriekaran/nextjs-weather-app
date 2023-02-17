import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e: any) => {
    e.preventDefault();
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setError("");
      })
      .catch((error) => {
        setError(`Error: City name ${cityName} is invalid. Please try again.`);
        setWeather("");
      });
    setCityName("");
  };

  return (
    <div>
      <Head>
        <title>Weather Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
      <Image
        src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80"
        layout="fill"
        className="object-cover z-[0]"
        alt="Image of clear weather"
      />
      <div className="p-8">
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl shadow-lg"
          >
            <div className="w-full">
              <input
                type="text"
                className="bg-transparent w-full border-none text-white focus:outline-none text-2xl"
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Search City"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {error != "" && (
          <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto mt-8 px-4 text-white z-10">
            <span className="flex justify-between items-center w-full m-auto p-3 text-white bg-red-400">
              {error}
            </span>
          </div>
        )}
        {weather.main && <Weather data={weather} />}
      </div>
    </div>
  );
}
