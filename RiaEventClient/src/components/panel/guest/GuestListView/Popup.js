import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
//import GuestForm from './GuestForm';

export default function Popup(props) {
  const { children, openPopup, setOpenPopup } = props;

  return (
    <Dialog maxWidth="xs" open={openPopup} onClose={() => setOpenPopup(false)}>
      <DialogTitle></DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
