/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Popup from "./Popup";
import EventForm from "./EventForm";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className={clsx(classes.root)} {...rest}>
      <div
        style={{
          flex: "1 1 100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{ marginRight: "50px" }}
          color="primary"
          variant="contained"
          onClick={() => setOpenPopup(true)}
        >
          Add event
        </Button>
      </div>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search event"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EventForm setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
