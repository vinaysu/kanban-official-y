import React from 'react'
import styles from './Card.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'
import {Local} from '../atoms'
import {useRecoilState} from 'recoil'

function Card({ card,removeCard,board,handleDragEnd,handleDragEnter}) {

  const [local,setLocal]=useRecoilState(Local)

   function handleLocal(boardId,cardId){
     const newLocal={...local,boardId:boardId,cardId:cardId}
     setLocal(newLocal)
   }


  return (
    <div className={styles.card} draggable
    onDragEnd={()=>handleDragEnd(card.id,board.id)}
    onDragEnter={()=>handleDragEnter(card.id,board.id)}
    >
        <Link className={styles.link} to={"/"+card.title} onClick={()=>{handleLocal(board.id,card.id)}} ><p>{card.title}</p></Link>
      <DeleteIcon  className={styles.delIcon} onClick={()=>removeCard(card.id,board.id)} ></DeleteIcon  >

    </div>
  )
}

export default Card