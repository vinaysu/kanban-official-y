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


function Board({ board, removeBoard, addCard, removeCard }) {
    // ...


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
        <div className={styles.board}>
            <Droppable droppableId={board.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.board_top}
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
                        <div className={styles.cards}>
                            {board.cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card
                                                card={card}
                                                removeCard={removeCard}
                                                board={board}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
            <div>
                <Plus card_outer='Add Card' card_inner='Add' placeholder='Enter the Card Title' onClick={onClick} />
            </div>
        </div>
    );
}





import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Board from '../board/Board';
import Plus from '../plus/Puls';
import { v4 as uuid } from 'uuid';
import { useRecoilState } from 'recoil';
import { Boards } from '../atoms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Home() {
  const [boards, setBoards] = useRecoilState(Boards);
  const [target, setTarget] = useState({ cardId: '', boardId: '' });

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

  function addBoard(title) {
    setBoards([
      ...boards,
      {
        id: uuid(),
        title: title,
        date: new Date().toLocaleString(),
        cards: [],
      },
    ]);
  }

  function addCard(title, boardId) {
    const card = {
      id: uuid(),
      title: title,
      date: new Date().toLocaleString(),
      description: 'this is constant description',
    };
    const index = boards.findIndex((board) => board.id === boardId);

    if (index < 0) {
      return;
    }

    const newBoards = [...boards];
    newBoards[index] = { ...newBoards[index], cards: [...newBoards[index].cards, card] };

    setBoards(newBoards);
  }

  function removeBoard(boardId) {
    const newBoards = boards.filter((board) => board.id !== boardId);
    setBoards(newBoards);
  }

  function removeCard(cardId, boardId) {
    const bIndex = boards.findIndex((board) => board.id === boardId);
    if (bIndex < 0) {
      return;
    }

    const cIndex = boards[bIndex].cards.findIndex((board) => board.id === cardId);
    if (cIndex < 0) {
      return;
    }

    const newBoards = [...boards];

    const cards = newBoards[bIndex].cards.slice();
    cards.splice(cIndex, 1);
    newBoards[bIndex] = { ...newBoards[bIndex], cards };
    setBoards(newBoards);
  }

  function handleDragEnter(cardId, boardId) {
    setTarget({
      cardId: cardId,
      boardId: boardId,
    });
  }

  function handleDragEnd(cardId, boardId) {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((board) => board.id === boardId);
    if (s_boardIndex < 0) {
      return;
    }

    s_cardIndex = boards[s_boardIndex].cards.findIndex((card) => card.id === cardId);
    if (s_cardIndex < 0) {
      return;
    }

    t_boardIndex = boards.findIndex((board) => board.id === target.boardId);
    if (t_boardIndex < 0) {
      return;
    }

    t_cardIndex = boards[t_boardIndex].cards.findIndex((card) => card.id === target.cardId);
    if (t_cardIndex < 0) {
      return;
    }

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

  function reOrder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEndb(result) {
    if (!result.destination) {
      return;
    }

    const reOrderedItems = reOrder(boards, result.source.index, result.destination.index);
    setBoards(reOrderedItems);
  }

  return (
    <div className={styles.home}>
      <div className={styles.kanban}>
        <div className={styles.boards}>
          <DragDropContext onDragEnd={onDragEndb}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boards.map((board, index) => (
                    <Draggable key={board.id} draggableId={board.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Board
                            key={board.id}
                            board={board}
                            removeBoard={removeBoard}
                            addCard={addCard}
                            removeCard={removeCard}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Plus card_outer="Add Board" card_inner="Add" placeholder="Enter the Board Title" onClick={addBoard} />
        </div>
      </div>
    </div>
  );
}

export default Home;

