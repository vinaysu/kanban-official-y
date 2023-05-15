import React, { useState } from 'react'
import styles from './Description.module.css'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Boards } from '../atoms'
import { Local } from '../atoms'
import CancelIcon from '@mui/icons-material/Cancel';


function Description(props) {     //imported in app.js

  const [open, setOpen] = useState(true)
  const [boards, setBoards] = useRecoilState(Boards)
  const navigate = useNavigate()
  const local = useRecoilValue(Local)


  const boardIndex = boards.findIndex((board) => board.id === local.boardId);
  const board = boards[boardIndex];
  const cardIndex = board && board.cards.findIndex((card) => card.id === local.cardId);
  const cards = board && board.cards.slice();
  const card = cards && cards[cardIndex]


  console.log(card)



  return (
    <div>

      <Dialog open={open} >
        <DialogTitle className={styles.top} >
          {card.title}

          <CancelIcon onClick={() => {
            navigate('/')
            setOpen(false)
          }}></CancelIcon>
        </DialogTitle>

        <DialogContent sx={{
          width: '500px', height: '500px'
        }}>
          <div>
            {
              card.description
            }
          </div>
        </DialogContent>





      </Dialog>






    </div>
  )
}

export default Description