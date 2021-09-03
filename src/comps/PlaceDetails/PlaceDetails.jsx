import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import Rating from "@material-ui/lab/Rating";
import { css, cx } from "@emotion/css";

import useStyles from "./styles";
import { BiPhone } from "react-icons/bi";

const PlaceDetails = ({ childClicked, place, selected, refProp }) => {
  const classes = useStyles();

  if (childClicked && selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            style={{ marginBottom: "20px" }}
          >
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, idx) => (
          <Box
            my={1}
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name}></img>

            <Typography variant="subtitle2" color="textSecondary">
              {" "}
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }, idx) => (
          <Chip
            key={idx}
            size="small"
            label={name}
            className={classes.chip}
          ></Chip>
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <HiLocationMarker
              style={{ fontSize: "20px", marginRight: "10px" }}
            />{" "}
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <AiFillPhone style={{ fontSize: "20px", marginRight: "10px" }} />{" "}
            {place.phone}
          </Typography>
        )}
        <CardActions>
          {place.web_url && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, "_blank")}
            >
              Trip Advisor
            </Button>
          )}
          {place.website && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default React.memo(PlaceDetails);
