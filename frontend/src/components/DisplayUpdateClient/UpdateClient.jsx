import { useState } from "react";

const UpdateClientSection = (props) => {
    const [ selectedAction , setSelectedAction ] = useState('');
    const { getUpdateDetails } = props

    const updateClient = (e) => {
        const actionType = e.target.previousElementSibling.value;
        setSelectedAction(actionType)
    }
    const getUpdatesFromClient = (e) => {
        const newClientInfo = [...e.target.parentElement.children].filter(child => {
            return child.tagName === "INPUT"
        }).map(input => {
            return {
                id : input.id , 
                value : input.value
            }
        })
        console.log(newClientInfo)
        getUpdateDetails(newClientInfo)
    }
    return (
        <div>
            <select placeholder="Action">
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="transfer">Transfter</option>
            </select>
            <button onClick={(e)=> updateClient(e)}>Select Action</button>
            {selectedAction && <div>
                <label htmlFor="id">id:</label>
                <input id="id"/>
                <label htmlFor={selectedAction}>{selectedAction}:</label>
                <input id={selectedAction}/>
                <button onClick={(e)=> getUpdatesFromClient(e)}>Submit</button>
            </div>
            }
        </div>
    )
}

export default UpdateClientSection;