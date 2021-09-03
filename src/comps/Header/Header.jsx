import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { BiSearchAlt } from "react-icons/bi";

import useStyles from "./styles.js";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autocomplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry?.location.lat();
    const lng = autocomplete.getPlace().geometry?.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          className={classes.title}
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <BiSearchAlt />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
