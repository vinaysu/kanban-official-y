import React, { useState } from 'react'
import styles from './Card.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import { Local } from '../atoms'
import { useRecoilState } from 'recoil'
import { Boards } from '../atoms'

function Card({ card, removeCard, board, handleDragEnd, handleDragEnter }) {

  const [local, setLocal] = useRecoilState(Local)
  const [boards, setBoards] = useRecoilState(Boards)

  // console.log(boards)


  const [showEdit, setShowEdit] = useState(false)
  const [showMark, setShowMark] = useState(true)
  const [title, setTitle] = useState(card.title)
  const [card1, setCard1] = useState({ ...card })

  function handleLocal(boardId, cardId) {
    const newLocal = { ...local, boardId: boardId, cardId: cardId }
    setLocal(newLocal)
  }

  function handleIcon() {
    setShowMark(false)
    setShowEdit(true)
  }


  function handleCheck(title) {
    if (title === '') {
      alert('Enter the Title');
    } else {
      setShowMark(true);
      setShowEdit(false);
      setTitle(title);
      setCard1((prevCard) => {
        const newCard = { ...prevCard };
        newCard[title] = title;
        return newCard;
      });

      const bIndex = boards.findIndex((ele) => ele.id === board.id);
      if (bIndex < 0) {
        return;
      }
      const cIndex = boards[bIndex].cards.findIndex((ele) => ele.id === card.id);
      if (cIndex < 0) {
        return;
      }

      const newBoards = boards.map((board, index) => {
        if (index === bIndex) {
          const newCards = board.cards.map((card, cardIndex) => {
            if (cardIndex === cIndex) {
              return { ...card, title: title };
            }
            return card;
          });
          return { ...board, cards: newCards };
        }
        return board;
      });

      // const newBoards = [...boards];
      // newBoards[bIndex].cards[cIndex] = { ...newBoards[bIndex].cards[cIndex], title: title };



      setBoards(newBoards);
    }
  }




  function handleChange(event) {
    setTitle(event.target.value)
  }


  return (
    <div className={styles.card}

    draggable droppable
    onDragEnd={() => handleDragEnd(card.id, board.id)}
    onDragEnter={() => handleDragEnter(card.id, board.id)}
     
    >
      {/* <Link className={styles.link} to={"/"+card.title} onClick={()=>{handleLocal(board.id,card.id)}} ><p>{card.title}</p></Link> */}

      {
        showEdit ? <input autoFocus className={styles.input} onChange={handleChange} value={title} ></input>
          :
          <Link className={styles.link} to={"/" + card.title} onClick={() => { handleLocal(board.id, card.id) }} ><p>{title}</p></Link>
      }

      <div className={styles.icons}>

        {showMark ? <EditIcon className={styles.editIcon} onClick={handleIcon}></EditIcon>
          : <CheckIcon className={styles.checkIcon} onClick={() => handleCheck(title)}></CheckIcon>
        }

        <DeleteIcon className={styles.delIcon} onClick={() => removeCard(card.id, board.id)} ></DeleteIcon  >
        
      </div>


    </div>
  )
}

export default Card