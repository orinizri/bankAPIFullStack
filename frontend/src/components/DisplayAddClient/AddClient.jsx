import React, { useEffect, useState } from 'react';
import axiosRequest from '../../api/api';
import { v4 as uuidv4 } from 'uuid';

const AddClientSection = (props) => {
    const [ createdClientMode , setCreatedClientMode ] = useState(false)
    const [ createdClient , setCreatedClient ] = useState(false)
    const { newClientStatus } = props

    const createNewClient = async (e) => {
        const newClientInfo = [...e.target.parentElement.children].filter(child => {
            return child.tagName === "INPUT"
        }).map(input => {
            return {
                id : input.id , 
                value : input.value
            }
        })
        try {
            let path = '/addClient?'
            const queries = newClientInfo.map(({id , value}) => {
                console.log(id,value)
                return `${id}=${value}&`
            }).join('').slice(0, -1)
            const requestURL = path + queries
            console.log(requestURL)
            const addClientRequest = await axiosRequest.post(requestURL)
            setCreatedClient(addClientRequest.data)
            setCreatedClientMode(true)
        } catch (e) {
            throw Error('Unable to create new client, my bad')
        }
        
    }

    useEffect(()=>{
        if (createdClientMode) {
            newClientStatus(true)
        }
    }, [createdClient])


    return (
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name"/>
            <label htmlFor="deposit">Deposit:</label>
            <input id="deposit"/>
            <label htmlFor="cash">Cash:</label>
            <input id="cash"/>
            <button onClick={(e)=>createNewClient(e)}>Submit new Client</button>
            {
                createdClient && Object.entries(createdClient).filter(input=> input.key !== '__v')
                .map((input) => {
                    return (
                    <div key={uuidv4()}>
                        {input[0][0].toUpperCase()}{input[0].slice(1)} : {input[1]}
                    </div>
                    )
                })
            }
        </div>
    )
}

export default AddClientSection;