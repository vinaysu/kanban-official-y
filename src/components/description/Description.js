import React, { useState } from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecoilState,useRecoilValue } from 'recoil'
import { Boards } from '../atoms'
import {Local} from '../atoms'

function Description(props) {     //imported in app.js

  const [open, setOpen] = useState(true)
  const boards= useRecoilValue(Boards)
  const navigate = useNavigate()
  const local= useRecoilValue(Local)

  
const boardIndex = boards.findIndex((board) => board.id === local.boardId);
const board = boards[boardIndex];
const cardIndex = board && board.cards.findIndex((card) => card.id === local.cardId);
const cards = board && board.cards.slice();
const card=cards &&cards [cardIndex]

 
  console.log(card)
  
  

  return (
    <div>
      <h1>{card.title}</h1>
      <h1 onClick={()=>navigate('/')}>home</h1>
    </div>
  )
}

export default Description