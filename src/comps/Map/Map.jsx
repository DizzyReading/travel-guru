import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import {
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { TiLocationOutline } from "react-icons/ti";
import { css, cx } from "@emotion/css";

import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from "./mapStyles";

// import dotenv from "dotenv";
// dotenv.config();

const Map = ({
  weather,
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          // e ? console.log(e) : console.log("not found");
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, idx) => (
          <div
            key={idx}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <IconButton style={{ color: "red", fontSize: "40px" }}>
                📍
              </IconButton>
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                ></img>

                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weather?.list?.map((data, idx) => (
          <div key={idx} lat={data.coord.lat} lon={data.coord.lon}>
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="weather-icon"
              className={css`
                height: 70px;
                object-fit: contain;
              `}
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
