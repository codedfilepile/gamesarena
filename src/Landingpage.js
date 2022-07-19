import './App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
//import axios from 'axios';


export const Landingpage = () => {

   // const [searchTerm, setSearchTerm] = useState("");
    const [gamesList, setGamesList] = useState([]);
    const [sorted, setIsSorted] = useState(true)
    const [searchList, setSearchList] = useState([])

    const sortData = () => {
        console.log(sorted)
        setIsSorted(!sorted)
        let filterdata;
        let data = gamesList
        if (sorted === true) {
            filterdata = data.sort((a, b) => a.score - b.score)
        }
        else {
            filterdata = data.sort((a, b) => b.score - a.score)
        }
        console.log(filterdata)
        setGamesList([...filterdata])
    }

    // Getting data with API
    useEffect(() => {
        fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
            .then(response => response.json())
            .then(list => {
                setGamesList(list);
                setSearchList(list);
            });

        //WE CAN ALSO USE AXIOS HERE
        // axios
        // .get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
        // .then((response) => {
        //     setGamesList(response.data);
        // });

    }, []);

    const search = (text) => {
       // console.log(text)
        let data = searchList.filter((game) => {
            if (text === "") {
                return game;
            } else if (game.title !== null && game.title !== undefined && game.title.toLowerCase().includes(text.toLowerCase())) {
                return game;
            }
        })
       // console.log(data)
        setGamesList([...JSON.parse(JSON.stringify(data))])
    }



    return (
        <div>
            <br />

            <div className='wrapper' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <input className='search' type="text" placeholder="Search by Name" onChange={(event) => {
                    search(event.target.value);
                }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '20px solid white', width: '150vh', paddingLeft: '25vh' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th style={{ width: '15vh' }} onClick={() => sortData()}><div style={{display:'flex', flexDirection:'row',justifyContent: 'center' }}>Score   <div style={{color:'red'}}><FaSort/></div></div></th>
                            <th>Genre</th>
                            <th>Platform</th>
                            <th>Editors Choice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamesList.map(game => (
                            <tr>
                                <td>{game.title}</td>
                                <td style={{ width: '25vh' }}>{game.score}</td>
                                <td>{game.genre}</td>
                                <td>{game.platform}</td>
                                <td>{game.editors_choice}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
