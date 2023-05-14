import React, { useState, useRef } from 'react'
import styles from './Puls.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';


function Plus(props) {     //imported in board.js and Home.js


    const { card_outer, card_inner, placeholder, addBoard, onClick } = props
    const myref = useRef()
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState('')

    return (
        <div className={styles.plus} >

            {
                showInput ?
                    <div className={styles.inner}>
                        <input autoFocus
                            ref={myref}
                            className={styles.textarea}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(event) => { setInputValue(event.target.value) }}
                        ></input>
                        <div className={styles.footer} >
                            <Button variant='outlined' 
                            // sx={{backgroundColor:'blue',color:'white'}}
                            onClick={() => {
                                if (inputValue == '') {
                                    alert('Input Field is Mandatory')
                                    myref.current.focus()

                                } else {
                                    onClick(inputValue)
                                    // addBoard(inputValue)
                                    setInputValue('')
                                    setShowInput(false)
                                }
                            }}>{card_inner}</Button>

                            <CancelIcon className={styles.icon} onClick={() => setShowInput(false)} ></CancelIcon>
                        </div>
                    </div> :
                    <Button sx={{ width: 250 }} variant='outlined' onClick={() => setShowInput(true)} className={styles.outer}>

                        {card_outer}
                        <AddIcon></AddIcon>


                    </Button>
            }

        </div>
    )
}

export default Plus