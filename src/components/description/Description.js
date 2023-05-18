import React, { useState, useEffect } from 'react';
import styles from './Description.module.css';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Boards } from '../atoms';
import { Local } from '../atoms';
import CancelIcon from '@mui/icons-material/Cancel';
import ListIcon from '@mui/icons-material/List';
import TitleIcon from '@mui/icons-material/Title';
import { TextField, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function Description(props) {
  const [open, setOpen] = useState(true);
  const [boards, setBoards] = useRecoilState(Boards);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [showTitleEdit, setShowTitleEdit] = useState(false)
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const local = useRecoilValue(Local);

  const boardIndex = boards.findIndex((board) => board.id === local.boardId);
  const board = boards[boardIndex];
  const cardIndex = board && board.cards.findIndex((card) => card.id === local.cardId);
  const cards = board && board.cards.slice();
  const card = cards && cards[cardIndex];


  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  const handleChange = (event) => {
    setDescription(event.target.value);
    setShow(true);
  };

  const handleSave = () => {
    if (card) {
      const updatedCards = [...cards];
      updatedCards[cardIndex] = { ...card, description: description };
      const updatedBoard = { ...board, cards: updatedCards };
      const updatedBoards = [...boards];
      updatedBoards[boardIndex] = updatedBoard;
      setBoards(updatedBoards);
      setShow(false);
      setDescription('');
    }
  };

  const handleCancel = () => {
    setShow(false);
    setDescription('');
  };
  function handleClick() {
    setShowTitleEdit(true);
    setTitle(card.title);
  }
  function handleCheck() {
    if (card && title.trim() !== '') {
      const updatedCards = [...cards];
      updatedCards[cardIndex] = { ...card, title: title };
      const updatedBoard = { ...board, cards: updatedCards };
      const updatedBoards = [...boards];
      updatedBoards[boardIndex] = updatedBoard;
      setBoards(updatedBoards);
      setShowTitleEdit(false);
    }
  }
  function handleTitleChange(event) {
    setTitle(event.target.value);

  }


  return (
    <div>
      <Dialog open={open}>
        <DialogTitle className={styles.top}>
          <div className={styles.title}>
            <TitleIcon />
            <div>
              {
                showTitleEdit ?
                  <div className={styles.titleEdit} >
                    <input autoFocus className={styles.input} onChange={handleTitleChange} ></input>
                    <CheckIcon className={styles.checkIcon} onClick={handleCheck}></CheckIcon>

                  </div>
                  : <h4 onClick={handleClick}>{card.title}</h4>
              }

            </div>
            
          </div>
          <CancelIcon className={styles.cancelIcon} onClick={() => {
            navigate('/');
            setOpen(false);
          }} ></CancelIcon>

           

        </DialogTitle>

        <DialogContent sx={{ width: '500px', height: '500px' }}>

           <div className={styles.b_location}>In the List<h5> {board.title} </h5></div>
          <div className={styles.description}>
            <div className={styles.top_description}>
              <ListIcon />
              <h2>Description</h2>
            </div>
            <div className={styles.editDescription}>

              <div className={styles.content}>
                <p>{card.description}</p>
              </div>


              {show ? (
                <div className={styles.inner}>
                  <TextField autoFocus value={description} onChange={handleChange} />
                  <div className={styles.buttons}>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              ) :
                (
                  <TextField className={styles.outer} placeholder='Edit the Description' onClick={() => setShow(true)}>Edit Description</TextField>
                )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Description;
