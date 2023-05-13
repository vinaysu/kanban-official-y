import React from 'react'
import styles from './Board.module.css'
import Card from '../card/Card'
import DeleteIcon from '@mui/icons-material/Delete';
import Plus from '../plus/Puls'



function Board({ board, removeBoard, addCard,removeCard }) {
  function onClick(title) {
    addCard(title, board.id)
  }
  return (
    <div className={styles.board}>
      <div className={styles.board_top}>
        <div className={styles.title}>
          <p>{board.title}</p>
          <span>{board.cards.length}</span>
        </div>
        <div className={styles.dots}>
          
          <DeleteIcon  onClick={() => removeBoard(board.id)}/>
        </div>
      </div>
      <div className={styles.cards}>
        {
          board.cards.map((card) =><Card key={card.id} card={card} removeCard={removeCard} board={board} />  )
        }

      </div>
      <div>
        <Plus card_outer='Add Card' card_inner='Add' placeholder='Enter the Card Title' onClick={onClick} />
      </div>

    </div>
  )
}

export default Board