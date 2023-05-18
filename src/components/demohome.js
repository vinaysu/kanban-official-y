import React, { useState, useEffect } from 'react'
import styles from './Home.module.css';
import Board from '../board/Board'
import Plus from '../plus/Puls'
import { v4 as uuid } from 'uuid'
import { useRecoilState } from 'recoil'
import { Boards } from '../atoms'



function Home() {
    // ...


    const [boards, setBoards] = useRecoilState(Boards)
    const [target, setTarget] = useState({ cardId: '', boardId: '' })



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
            description: 'this is constant description'
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

    function onDragEnd(result) {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newBoards = [...boards];
        const sourceBoardIndex = newBoards.findIndex(
            (board) => board.id === source.droppableId
        );
        const destinationBoardIndex = newBoards.findIndex(
            (board) => board.id === destination.droppableId
        );

        const [removedCard] = newBoards[sourceBoardIndex].cards.splice(
            source.index,
            1
        );
        newBoards[destinationBoardIndex].cards.splice(
            destination.index,
            0,
            removedCard
        );

        setBoards(newBoards);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
                            // handleDragEnd={handleDragEnd}
                            // handleDragEnter={handleDragEnter}

                            />)
                        }
                        <Plus card_outer='Add Board' card_inner='Add' placeholder='Enter the Board Title' onClick={addBoard} />

                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}










useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  function handleChange(event) {
    setDescription(event.target.value);
    setShow(true);
  }

  function handleSave() {
    if (card) {
      const updatedCards = [...cards];
      updatedCards[cardIndex] = { ...card, description: description };
      const updatedBoard = { ...board, cards: updatedCards };
      const updatedBoards = [...boards];
      updatedBoards[boardIndex] = updatedBoard;
      setBoards(updatedBoards);
      setShow(false);
      
    }
  }

  function handleCancel() {
    setShow(false);
    setDescription(card ? card.description : '');
  }



  <TextField onChange={handleChange} />

              {show && (
                <div>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              )}
