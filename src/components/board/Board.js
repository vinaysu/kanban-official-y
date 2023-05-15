import React,{useState} from 'react'
import styles from './Board.module.css'
import Card from '../card/Card'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Plus from '../plus/Puls'



function Board({ board, removeBoard, addCard, removeCard, handleDragEnd, handleDragEnter }) {
  function onClick(title) {
    addCard(title, board.id)
  }

  const [showEdit,setShowEdit]=useState(false)
  const [showMark,setShowMark]=useState(true)
  const [board1,setBoard1]=useState(board)
  const [title,setTitle]=useState(board1.title)
  

  function handleIcon(){
    setShowMark(false)
    setShowEdit(true)
  }
  function handleCheck(title){
    if(title==''){
      alert('Enter the Title')
    }else{
    setShowMark(true)
    setShowEdit(false)
    const newBoard={...board1}
    newBoard[title]=title
    setBoard1(newBoard)
    }

  }
 function handleChange(event){
  setTitle(event.target.value)
 }

  return (
    <div className={styles.board} droppable draggable >
      <div className={styles.board_top}>

        
        <div className={styles.title}>
          
          {
            showEdit?<input autoFocus className={styles.input} onChange={handleChange} value={title} ></input>:<h3>{title}</h3>
          }

          
          <span >{board.cards.length}</span>
        </div>


        <div className={styles.dots}>

          {showMark?<EditIcon className={styles.editIcon} onClick={handleIcon}></EditIcon>:<CheckIcon className={styles.checkIcon} onClick={()=>handleCheck(title)}></CheckIcon>}
          <DeleteIcon className={styles.delIcon} onClick={() => removeBoard(board.id)} ></DeleteIcon>
        </div>
      </div>
      <div className={styles.cards}>
        {
          board.cards.map((card) => <Card key={card.id}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            card={card} removeCard={removeCard} board={board} />)
        }

      </div>
      <div>
        <Plus card_outer='Add Card' card_inner='Add' placeholder='Enter the Card Title' onClick={onClick} />
      </div>

    </div>
  )
}

export default Board