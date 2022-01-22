import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    name: 'title',
    imageUrl: '/static/images',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'title',
    imageUrl: '/static/images',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'title',
    imageUrl: '/static/images',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'title',
    imageUrl: '/static/images/',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: '..',
    imageUrl: '/static/images/',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestEvents = ({ className, ...rest }) => {
  const classes = useStyles();
  const [events] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${events.length} in total`}
        title="Latest Events"
      />
      <Divider />
      <List>
        {events.map((events, i) => (
          <ListItem
            divider={i < events.length - 1}
            key={events.id}
          >
            <ListItemAvatar>
              <img
                alt="events"
                className={classes.image}
                src={events.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={events.name}
              secondary={`Updated ${events.updatedAt.fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestEvents.propTypes = {
  className: PropTypes.string
};

export default LatestEvents;
