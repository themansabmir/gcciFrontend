import { Box, Modal, TextField } from '@mui/material'
import React from 'react'
import { CreateCustomertype } from './CreateCustomertype'
import { Typography } from '@material-tailwind/react';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 1,
};
export const CustomerType = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
      {/* Modal Handling */}
      <div>
        <button type='' onClick={handleOpen}> Create </button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography className='font-bold text-center'> Create Customer Type</Typography>
            <CreateCustomertype />
          </Box>
        </Modal>
      </div>
      {/* Data grid table of customer type */} 
      <div>

      </div>
    </div>
  );
}
