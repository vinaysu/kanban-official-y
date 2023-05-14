import React,{useState} from 'react'
import {Dialog,DialogTitle} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Description(props) {     //imported in app.js

  const [open,setOpen]=useState(true)
  const navigate=useNavigate()
  return (
    <div>
     
      <Dialog open={open} onClose={()=>navigate('/')}>
          <DialogTitle>
            <h1>this is dialog</h1>
          </DialogTitle>
      </Dialog>
    </div>
  )
}

export default Description