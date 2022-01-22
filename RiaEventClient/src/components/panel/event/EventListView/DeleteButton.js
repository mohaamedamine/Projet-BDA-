import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { EVENT_QUERY } from "../../../Queries&Mutation/Queries";
import MyPopup from "./MyPopup";

function DeleteButton({ eventId, guestId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = guestId ? DELETE_GUEST_MUTATION : DELETE_EVENT_MUTATION;

  const [deleteEventOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!guestId) {
        const data = proxy.readQuery({
          query: EVENT_QUERY,
        });
        data.getEvents = data.getEvents.filter((p) => p.id !== eventId);
        proxy.writeQuery({ query: EVENT_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      eventId,
      guestId,
    },
  });
  return (
    <>
      <MyPopup content={guestId ? "Delete guest" : "Delete guest"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteEventOrMutation}
      />
    </>
  );
}

const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId)
  }
`;

const DELETE_GUEST_MUTATION = gql`
  mutation deleteGuest($eventId: ID!, $guestId: ID!) {
    deleteComment(eventId: $eventId, guestId: $guestId) {
      id
      guest {
        id
        firstName

        createdAt
        lastName
      }
      guestCount
    }
  }
`;

export default DeleteButton;
