import './App.css';
import database from './db.json';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

export const Landingpage =() =>{
    const [searchTerm,setSearchTerm] = useState("");
    const gamedata=database.filter((game) =>{ 
        if(searchTerm == "") {
            console.log(game.title);
            return game;
        } else if(game.title.toLowerCase().includes(searchTerm.toLowerCase())){
            return game;
        }
    }).map((game) =>{
          return(
              <tr>
                  <td>{game.title}</td>
                  <td>{game.platform}</td>
                  <td>{game.genre}</td>
                  <td>{game.platform}</td>
                  <td>{game.editors_choice}</td>
              </tr>
          )
      }
  )

return (
  <div>
        <div>
            <input type="text" placeholder="Search" onChange={(event)=>{
                setSearchTerm(event.target.value);
            }}/>
        </div>

        <div style={{display:'flex', flexDirection:'column', borderTop:'20px solid white', width:'150vh', paddingLeft:'28vh'}}>
          <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Title</th>
                      <th>Platform</th>
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
  