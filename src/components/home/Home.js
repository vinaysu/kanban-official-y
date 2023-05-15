import React, { useState } from 'react'
import styles from './Home.module.css';
import Board from '../board/Board'
import Plus from '../plus/Puls'
import { v4 as uuid } from 'uuid'
import { useRecoilState } from 'recoil'
import { Boards } from '../atoms'


function Home() {

  const [boards, setBoards] = useRecoilState(Boards)
  const [target, setTarget] = useState({ cardId: '', boardId: '' })

  console.log(Object.isExtensible(boards))
  // Object.preventExtensions(boards)

  function addCard(title, boardId) {
    const card = {
      id: uuid(),
      title: title,
      description: ''
    }
    const index = boards.findIndex((board) => board.id === boardId)

    if (index < 0) {
      return
    }

    const newBoards = [...boards]
    // newBoards[index].cards.push(card)

    newBoards[index] = { ...newBoards[index], cards: [...newBoards[index].cards, card] }

    setBoards(newBoards)

  }

  function removeCard(cardId, boardId) {
    const bIndex = boards.findIndex((board) => board.id === boardId)
    if (bIndex < 0) {
      return
    }

    const cIndex = boards[bIndex].cards.findIndex((board) => board.id === cardId)
    if (cIndex < 0) {
      return
    }

    const newBoards = [...boards]

    const cards = newBoards[bIndex].cards.slice();
    cards.splice(cIndex, 1);
    newBoards[bIndex] = { ...newBoards[bIndex], cards };
    setBoards(newBoards)


  }

  function addBoard(title) {
    setBoards([...boards, {
      id: uuid(),
      title: title,
      cards: []
    }])
  }

  function removeBoard(boardId) {

    const newBoards = boards.filter((board) => board.id !== boardId)
    setBoards(newBoards)
  }

  function handleDragEnter(cardId, boardId) {
    setTarget({
      cardId: cardId, boardId: boardId
    })

  }

  function handleDragEnd(cardId, boardId) {

    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex
    s_boardIndex = boards.findIndex((board) => board.id == boardId)
    if(s_boardIndex<0){return}

    s_cardIndex = boards[s_boardIndex].cards.findIndex((card) => card.id == cardId)
    if(s_cardIndex<0){return }

    t_boardIndex = boards.findIndex((board) => board.id == target.boardId)
    if(t_boardIndex<0){return}

    t_cardIndex = boards[t_boardIndex].cards.findIndex((card) => card.id == target.cardId)
    if(t_cardIndex<0){return }  


    const tempBoards = [...boards];
    const tempCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex] = {
      ...tempBoards[s_boardIndex],
      cards: [...tempBoards[s_boardIndex].cards],
    };
    tempBoards[t_boardIndex] = {
      ...tempBoards[t_boardIndex],
      cards: [...tempBoards[t_boardIndex].cards],
    };
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, tempCard);
  
    setBoards(tempBoards);


   

  }



  return (
    <div className={styles.home}>

      <div className={styles.kanban}>
        <div className={styles.boards}>
          {
            boards.map((board) => <Board
              key={board.id}
              board={board}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
            />)
          }
          <Plus card_outer='Add Board' card_inner='Add' placeholder='Enter the Board Title' onClick={addBoard} />

        </div>
      </div>


    </div>
  );
}

export default Home;
