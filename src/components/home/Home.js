import React, { useState, useEffect } from 'react'
import styles from './Home.module.css';
import Board from '../board/Board'
import Plus from '../plus/Puls'
import { v4 as uuid } from 'uuid'
import { useRecoilState } from 'recoil'
import { Boards } from '../atoms'
// Import the CSS styles for the Quill editor



function Home() {

  const [boards, setBoards] = useRecoilState(Boards)
  const [target, setTarget] = useState({ cardId: '', boardId: '' })
  const [targetb, setTargetb] = useState({ boardId: '' })


  useEffect(() => {
    const storedBoards = localStorage.getItem('boards');
    if (storedBoards) {
      setBoards(JSON.parse(storedBoards));
    }
  }, []);

  // Save board data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);


  // console.log(Object.isExtensible(boards))
  // Object.preventExtensions(boards)

  function addBoard(title) {
    setBoards([...boards, {
      id: uuid(),
      title: title,
      date: new Date().toLocaleString(),
      cards: []
    }])
  }

  function addCard(title, boardId) {
    const card = {
      id: uuid(),
      title: title,
      date: new Date().toLocaleString(),
      description: '',
      activities:['Added this card to']
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

  function removeBoard(boardId) {

    const newBoards = boards.filter((board) => board.id !== boardId)
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


  function handleDragEnter(cardId, boardId) {
    setTarget({
      cardId: cardId, boardId: boardId
    })

  }

  function handleDragEnd(cardId, boardId) {

    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex
    s_boardIndex = boards.findIndex((board) => board.id == boardId)
    if (s_boardIndex < 0) { return }

    s_cardIndex = boards[s_boardIndex].cards.findIndex((card) => card.id == cardId)
    if (s_cardIndex < 0) { return }

    // console.log('source board index',s_boardIndex)

    t_boardIndex = boards.findIndex((board) => board.id == target.boardId)
    if (t_boardIndex < 0) { return }

    t_cardIndex = boards[t_boardIndex].cards.findIndex((card) => card.id == target.cardId)
    if (t_cardIndex < 0) { return }


    const tempBoards = [...boards];
    const tempCard ={...tempBoards[s_boardIndex].cards[s_cardIndex]}
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

    const activity= 'moved from '+''+tempBoards[s_boardIndex].title

    tempBoards[t_boardIndex].cards[t_cardIndex] = { ...tempBoards[t_boardIndex].cards[t_cardIndex], activities: [activity,...tempBoards[t_boardIndex].cards[t_cardIndex].activities] }
 
    setBoards(tempBoards);
    // console.log(boards)

  }

  function handleDragEnterb(boardId) {
    setTargetb({ boardId: boardId })
  }


  function handleDragEndb(boardId) {

    let sourceBoardIndex = boards.findIndex((board) => board.id == boardId)
    let targetBoardIndex = boards.findIndex((board) => board.id == targetb.boardId)

    if (sourceBoardIndex < 0 || targetBoardIndex < 0) {
      return;
    }

    const reorderedBoards = [...boards];
    const [movedBoard] = reorderedBoards.splice(sourceBoardIndex, 1);
    reorderedBoards.splice(targetBoardIndex, 0, movedBoard);

    setBoards(reorderedBoards);


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
              handleDragEndb={handleDragEndb}
              handleDragEnterb={handleDragEnterb}

            />)
          }
          <Plus card_outer='Add Board' card_inner='Add' placeholder='Enter the Board Title' onClick={addBoard} />

        </div>
      </div>


    </div>
  );
}

export default Home;
