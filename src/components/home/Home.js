import React, { useState } from 'react'
import './Home.css';
import Board from '../board/Board'
import Plus from '../plus/Puls'


function Home() {

  const [boards, setBoards] = useState([
    // {
    //   id: Date.now() + Math.random() * 100,
    //   title: 'board1',
    //   cards: [
    //     {
    //       id: Date.now() + Math.random(),
    //       title: 'card 1'
    //     },
    //     {
    //       id: Date.now() + Math.random(),
    //       title: 'card 2'
    //     },
    //     {
    //       id: Date.now() + Math.random(),
    //       title: 'card 3'
    //     }
    //   ]
    // },
    // {
    //   id: Date.now() + Math.random() * 100,
    //   title: 'board2',
    //   cards: [
    //     {
    //       id: Date.now() + Math.random(),
    //       title: 'card 1'
    //     },
    //     {
    //       id: Date.now() + Math.random(),
    //       title: 'card 2'
    //     },

    //   ]
    // }

  ])

  function addCard(title, boardId) {
    const card = {
      id: Date.now() + Math.random(),
      title: title
    }
    const index = boards.findIndex((board) => board.id === boardId)

    if (index < 0) {
      return
    }

    const newBoards = [...boards]
    newBoards[index].cards.push(card)
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
    newBoards[bIndex].cards.splice(cIndex, 1)
    setBoards(newBoards)


  }

  function addBoard(title) {
    setBoards([...boards, {
      id: Date.now() + Math.random(),
      title: title,
      cards: []
    }])
  }

  function removeBoard(boardId) {

    const newBoards = boards.filter((board) => board.id !== boardId)
    setBoards(newBoards)
  }



  return (
    <div className="App">
      <div className='navbar'>
        <h1>kanban board</h1>
      </div>
      <div className='kanban'>
        <div className='boards'>
          {
            boards.map((board) => <Board
              key={board.id}
              board={board}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
            />)
          }
          <Plus card_outer='Add Board' card_inner='Add' placeholder='Enter the Board Title' onClick={addBoard} />

        </div>
      </div>
      

    </div>
  );
}

export default Home;
