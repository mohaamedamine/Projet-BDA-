import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
    >
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
