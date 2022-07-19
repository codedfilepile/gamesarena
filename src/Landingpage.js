import './App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
//import axios from 'axios';


export const Landingpage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [gamesList, setGamesList] = useState([]);

    const gamedata = gamesList.filter((game) => { 
        if(searchTerm === "") {
            return game;
        } else if(game.title !== null && game.title !== undefined && game.title.toLowerCase().includes(searchTerm.toLowerCase())){
            return game;
        }
    }).map((game) =>{
          return(
              <tr>
                  <td>{game.title}</td>
                  <td style={{width:'15vh'}}>{game.score}</td>
                  <td>{game.genre}</td>
                  <td>{game.platform}</td>
                  <td>{game.editors_choice}</td>
              </tr>
          )
      }
  )

  // Getting data with API
  useEffect(() => {
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
    .then(response => response.json())
    .then(list => setGamesList(list));

    //WE CAN ALSO USE AXIOS HERE
    // axios
    // .get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
    // .then((response) => {
    //     setGamesList(response.data);
    // });

  });


  
return (
  <div>
    <br/>
        
        <div className='wrapper' style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <input className='search' type="text" placeholder="Search by Name" onChange={(event)=>{
                setSearchTerm(event.target.value);
            }}/>
        </div>

        <div style={{display:'flex', flexDirection:'column', borderTop:'20px solid white', width:'150vh', paddingLeft:'25vh'}}>
          <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Title</th>
                      <th style={{width:'15vh'}}>Score</th>
                      <th>Genre</th>
                      <th>Platform</th>
                      <th>Editors Choice</th>
                      </tr>
                  </thead>
                  <tbody>
                      {gamedata}
                  </tbody>
            </Table>
      </div>
    </div>
      );
  }