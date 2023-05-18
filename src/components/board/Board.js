import React, { useState } from 'react'
import styles from './Board.module.css'
import Card from '../card/Card'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Plus from '../plus/Puls'
import { useRecoilState } from 'recoil'
import { Boards } from '../atoms'

import { Droppable, Draggable } from 'react-beautiful-dnd';



function Board({ board, removeBoard, addCard, removeCard, handleDragEnd, handleDragEnter, handleDragEndb, handleDragEnterb }) {

  function onClick(title) {
    addCard(title, board.id)
  }


  const [boards, setBoards] = useRecoilState(Boards)
  const [showEdit, setShowEdit] = useState(false)
  const [showMark, setShowMark] = useState(true)
  const [title, setTitle] = useState(board.title)


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

      setBoards(prevBoards => {
        const boardIndex = prevBoards.findIndex(ele => ele.id === board.id);
        if (boardIndex < 0) {
          return prevBoards;
        }
        const newBoards = [...prevBoards];
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          title: title
        };
        return newBoards;
      });
    }
  }

  function handleChange(event) {
    setTitle(event.target.value)
  }

  return (
    <div className={styles.board} >
      <div className={styles.board_top}
        draggable droppable
        onDragEnd={() => handleDragEndb(board.id)}
        onDragEnter={() => handleDragEnterb(board.id)}

      >


        <div className={styles.title}>

          {
            showEdit ? <input autoFocus className={styles.input} onChange={handleChange} value={title} ></input> : <h3>{title}</h3>
          }


          <span >{board.cards.length}</span>
        </div>


        <div className={styles.dots}>

          {showMark ? <EditIcon className={styles.editIcon} onClick={handleIcon}></EditIcon> : <CheckIcon className={styles.checkIcon} onClick={() => handleCheck(title)}></CheckIcon>}
          <DeleteIcon className={styles.delIcon} onClick={() => removeBoard(board.id)} ></DeleteIcon>
        </div>
      </div>
      <div className={styles.cards}>
        {
          board.cards.map((card) => <Card key={card.id}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            card={card}
            removeCard={removeCard}
            board={board}

          />)
        }

      </div>
      <div>
        <Plus card_outer='Add Card' card_inner='Add' placeholder='Enter the Card Title' onClick={onClick} />
      </div>

    </div>
  )
}

export default Board