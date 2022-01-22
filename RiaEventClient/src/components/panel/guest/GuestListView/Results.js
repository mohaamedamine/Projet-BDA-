import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
//import moment from 'moment';
import PerfectScrollbar from "react-perfect-scrollbar";
//import { DELETE_GUEST } from "../../../Queries&Mutation/mutations";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
//import { useQuery } from "@apollo/client";
//import { GUEST_QUERY } from "../../../Queries&Mutation/Queries";
//import getInitials from 'src/utils/getInitials';
import DeleteIcon from "@material-ui/icons/Delete";
import getInitials from "../../../../util/getInitials";
//import { useMutation } from "@apollo/client";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const Results = ({ className, guests, ...rest }) => {
  const [guest, setGuests] = useState(guests);
  function deleteGuest(id) {
    axios({
      url: "http://localhost:5000/graphql",
      method: "post",
      data: {
        query: `mutation   deleteGuest($id:ID!) {

   deleteGuest(id:$id)
  }
    
    `,
        variables: {
          id: id,
        },
      },
    })
      .then((res) => {
        console.log("guest deleted");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const classes = useStyles();
  const [selectedGuestIds, setSelectedGuestIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [start, setStart] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedGuestIds;

    if (event.target.checked) {
      newSelectedGuestIds = guests.map((guest) => guest.id);
    } else {
      newSelectedGuestIds = [];
    }

    setSelectedGuestIds(newSelectedGuestIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGuestIds.indexOf(id);
    let newSelectedGuestIds = [];

    if (selectedIndex === -1) {
      newSelectedGuestIds = newSelectedGuestIds.concat(selectedGuestIds, id);
    } else if (selectedIndex === 0) {
      newSelectedGuestIds = newSelectedGuestIds.concat(
        selectedGuestIds.slice(1)
      );
    } else if (selectedIndex === selectedGuestIds.length - 1) {
      newSelectedGuestIds = newSelectedGuestIds.concat(
        selectedGuestIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedGuestIds = newSelectedGuestIds.concat(
        selectedGuestIds.slice(0, selectedIndex),
        selectedGuestIds.slice(selectedIndex + 1)
      );
    }

    setSelectedGuestIds(newSelectedGuestIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setStart(newPage * limit);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selectedGuestIds.length === guests.length}
                    color="primary"
                    indeterminate={
                      selectedGuestIds.length > 0 &&
                      selectedGuestIds.length < guests.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Event</TableCell>

                <TableCell>Registration date</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guest.slice(start, start + limit).map((guest) => (
                <TableRow
                  hover
                  key={guest.id}
                  selected={selectedGuestIds.indexOf(guest.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGuestIds.indexOf(guest.id) !== -1}
                      onChange={(event) => handleSelectOne(event, guest.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar className={classes.avatar} src={guest.avatarUrl}>
                        {getInitials(guest.email)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {guest.firstName} {guest.lastName}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.reference}</TableCell>
                  <TableCell>
                    {" " +
                      new Date(guest.createdAt).toLocaleTimeString(
                        "en-US",
                        dateOptions
                      )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        deleteGuest(guest.id);
                        setGuests();
                        //refreshPage();
                      }}
                    >
                      <DeleteIcon style={{ color: "#F45" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={guests.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  guests: PropTypes.array.isRequired,
};

export default Results;
