import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { IData, IModalProps , IShowModal} from './types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    margin: "auto",
  };

 
export const EditModal = (props: IModalProps)=>{
  const { data = {
  id: "",
  first_name: "",
  last_name: "",
  billing_address: "",
  physical_address: "",
  created_date: ""
  } ?? {}, setShowModal, title = "Title", toggle = true, handleConfirmEdit} = props ?? {}
    const [open, setOpen] = useState(toggle);

    const [details, setDetails ] = useState<IData>(data)
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleLoading = (val: boolean) =>{
      setLoading(val)
    }
    const handleClose = () =>{
      setOpen(false)
      setShowModal((prev: IShowModal)=>{
        return {
          ...prev,
          showEdit: false
        }
      })
    }
    const handleModal = () =>{
      setShowModal((prev: IShowModal)=>{
        return {
          ...prev,
          showEdit: !toggle
        }
      })
    };

    const handleType = (e: ChangeEvent<HTMLInputElement>) =>{
      const { id, value} = e.target
      setDetails((prev)=>{
        return {
          ...prev,
          [id]: value
        }
      })
    }

    const handleSubmit = ()=>{
      handleConfirmEdit(details, handleClose, handleLoading)
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onBackdropClick={handleModal}
        >
          <Box sx={style}>
            <Typography style={{minHeight: "50px", fontWeight:"bold"}}id="modal-modal-title" variant="h4" component="h4">
              {title}
            </Typography>
            <TextField onChange={(e: ChangeEvent<HTMLInputElement>)=> handleType(e)} style={{padding: "10px"}} id="first_name" label="First Name" size='small' value={details.first_name ?? ""}/>
            <TextField onChange={handleType} style={{padding: "10px"}} id="last_name" label="Last Name" size='small' value={details.last_name ?? ""}/>
            <TextField onChange={handleType} style={{padding: "10px"}} id="billing_address" size='small' label="Billing Address"  value={details.billing_address ?? ""}/>
            <TextField onChange={handleType} style={{padding: "10px"}} id="physical_address" size='small' label="Physical Address"  value={details.physical_address ?? ""}/>
            {props?.children}
              <Button style={{ left: "430px"}} disabled={loading} variant="contained" color="success" 
              onClick={handleSubmit}> Edit </Button>
              <Button style={{ left: "280px"}} disabled={loading} onClick={handleModal}> Cancel </Button>
            </Box>
        </Modal>
      </div>
    );
}