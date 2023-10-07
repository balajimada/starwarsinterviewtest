import React, { useEffect, useState, memo } from 'react'
import { Card,Badge } from 'react-bootstrap'
import { getAxios } from '../utilities/APIInterface'
import imgStartWinner from '../assets/images/startwinner.jpg'



const Starships = ({ shipItem ,mostFilmsCount}) => {



    return (
        <>

            <div class="flex-item">
                <Card style={{"border-top": "8px solid blue"}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>{shipItem.name}  
                            {
                                (parseInt(mostFilmsCount) === parseInt(shipItem.films.length)) && <img src={imgStartWinner} width="6%" style={{ float: "right" }} />
                            } </Card.Title>
                        <Card.Text>
                            <table>
                                <tr>
                                    <td><label style={{fontWeight: "normal"}} >Model:</label> </td> <td>{shipItem.model}</td>
                                </tr>
                                <tr>
                                    <td><label style={{fontWeight: "normal"}}>Number of films:  </label></td> <td><Badge bg="secondary">{shipItem.films.length}</Badge></td>
                                </tr>
                            </table>
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
export default memo(Starships);
