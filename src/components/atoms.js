import React from 'react'
import { atom } from 'recoil'
import { v4 as uuid } from 'uuid'

// export const Boards = atom({
//     key: 'boards',
//     default:
//         [
//             {
//                 id: uuid(),
//                 title: 'To Do',
//                 date: new Date().toLocaleString(),
//                 cards: []
//             },
//             {
//                 id: uuid(),
//                 title: 'Inprogress',
//                 date: new Date().toLocaleString(),
//                 cards: []
//             },
//         ]
// })

export const Local = atom({
    key: 'description',
    default: {
        boardId: '',
        cardId: ''
    }
})

export const Boards = atom({
    key: 'boards',
    default: getInitialBoards()
});


function getInitialBoards() {
    const storedBoards = localStorage.getItem('boards');
    if (storedBoards) {
        return JSON.parse(storedBoards);
    }
    return [
        {
            id: uuid(),
            title: 'To Do',
            date: new Date().toLocaleString(),
            cards: []
        },
        {
            id: uuid(),
            title: 'In Progress',
            date: new Date().toLocaleString(),
            cards: []
        }
    ];
}

