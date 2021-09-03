import React, { createRef, useEffect, useRef, useState } from "react";
import Header from "./comps/Header/Header";
import List from "./comps/List/List";
import Map from "./comps/Map/Map";
import PlaceDetails from "./comps/PlaceDetails/PlaceDetails";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api";

function App() {
  const [weather, setWeather] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // useEffect for getting the location of user on first page load

  useEffect(() => {
    // console.log("Coordinates", coordinates);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, [coordinates]);

  // useEffect for filtering places based on rating

  useEffect(() => {
    const filterPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filterPlaces);
  }, [rating, places]);

  // useEffect for changes in location on the map

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      const getDataForWeather = async () => {
        const data = await getWeatherData(coordinates.lat, coordinates.lng);
        setWeather(data);
      };

      const getDataForPlaces = async () => {
        if (bounds.sw && bounds.ne) {
          // console.log(bounds.sw, bounds.ne)
          const data = await getPlacesData(type, bounds.sw, bounds.ne);

          setPlaces(
            data?.filter((place) => place.name && place.num_reviews > 0)
          );
          setFilteredPlaces([]);
          setIsLoading(false);
        }
      };

      getDataForWeather();
      getDataForPlaces();
    }
  }, [bounds, type]);

  console.log(rating);
  console.log("Places:", places);
  console.log("Filtered Places:", filteredPlaces);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ maxWidth: `100%`, margin: 0 }}>
        <Grid item xs={12} md={4} style={{ maxWidth: `100%`, padding: 0 }}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            weather={weather}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
