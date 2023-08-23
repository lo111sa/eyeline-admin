import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Confirm = ({ visible, handleConfirm, handleClose, id }) => {
  return (
    <div>
      <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ნამდვილად გსურთ წაშლა?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>არა</Button>
          <Button
            onClick={() => {
              handleConfirm(id);
              handleClose();
            }}
            autoFocus
          >
            დიახ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
