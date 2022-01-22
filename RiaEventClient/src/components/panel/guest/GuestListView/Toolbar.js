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
import Popup from "./Popup";
import GuestForm from "./GuestForm";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", flexDirection: "column" },
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
    <div
      style={{ paddingTop: "35px" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        style={{
          alignSelf: "flex-end",
        }}
      >
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpenPopup(true)}
        >
          Add Guest
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
                placeholder="Search guest"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <GuestForm setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
