import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DeleteDialog(props) {
  const { toggle = true, title = "", message = "", data : {
    first_name,
    last_name,
    id
  }, setShowModal, handleConfirmDelete} = props

  const [open, setOpen] = React.useState(toggle);
  const [loading, setLoading] = React.useState(false)
  
  const handleClose = () => {
    setShowModal((prev)=>{
      return {
        ...prev,
        showDelete: false
      }
    })
    setOpen(false)
  };

  return (
    <div>
   
      <Dialog
        open={open}
        onBackdropClick={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' ,  fontWeight:"bold"}} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText  >
           {message}
          </DialogContentText>
          <DialogContentText style={{fontSize: "40px"}} color="green">
           {last_name}, {first_name}
          </DialogContentText>
        </DialogContent>
        {props.children}
        <DialogActions>
          <Button autoFocus disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" disabled={loading} color="error" onClick={()=> {
            handleConfirmDelete(id, handleClose, setLoading)
            }}> DELETE </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
