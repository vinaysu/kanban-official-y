import React from 'react'
import {atom} from 'recoil'

export const Boards=atom({
    key:'boards',
    default:[]
})

export const Local=atom({
    key:'description',
    default:{
        boardId:'',
        cardId:''
    }
})