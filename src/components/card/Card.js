import React from 'react'
import styles from './Card.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'

function Card({ card,removeCard,board,handleDragEnd,handleDragEnter}) {
  return (
    <div className={styles.card} draggable
    onDragEnd={()=>handleDragEnd(card.id,board.id)}
    onDragEnter={()=>handleDragEnter(card.id,board.id)}
    >
        <Link className={styles.link} to={"/"+card.title} >{card.title}</Link>
      <DeleteIcon  className={styles.delIcon} onClick={()=>removeCard(card.id,board.id)} ></DeleteIcon  >

    </div>
  )
}

export default Card