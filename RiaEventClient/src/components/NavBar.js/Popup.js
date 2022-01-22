import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
//import EventForm from './EventForm';
//import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="xs" onClose={() => setOpenPopup(false)}>
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
