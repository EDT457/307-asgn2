// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';


function MyApp() {
	const [characters, setCharacters] = useState([]);  
	
	useEffect(() => {
	  		fetchUsers()
	  		.then((res) => res.json())
	  		.then((json) => setCharacters(json["users_list"]))
	  		.catch((error) => { console.log(error); });
}, [] );

	async function removeOneCharacter (index) {
    	const characterToRemove = characters[index];
    	const response = await fetch(`http://localhost:8000/users/${characterToRemove.id}`, {
        	method: 'DELETE',
    });

    	if (response.status === 204) {
        	const updated = characters.filter((character, i) => {
            	return i !== index;
        	});
        	setCharacters(updated);
    	} else if (response.status === 404) {
        	console.log('Resource not found');
    	} else {
        	console.log('Failed to delete user');
    	}
	}

	
	function updateList(person) { 
   		postUser(person)
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            } else {
                throw new Error('Failed to insert user');
            }
        })
        .then((user) => {
            const updatedCharacters = [...characters];
            updatedCharacters.push(user);
            setCharacters(updatedCharacters);
        })
        .catch((error) => {console.log(error);})
}
	
	function fetchUsers() {
    	const promise = fetch("http://localhost:8000/users");
    	return promise;
	}
	
	function postUser(person) {
    	const promise = fetch("Http://localhost:8000/users", {
     		method: "POST",
      		headers: {"Content-Type": "application/json",},
      		body: JSON.stringify(person),});

    	return promise;}
    	
	return (
    	<div className="container">
        	<Table characterData={characters} 
	        	removeCharacter={removeOneCharacter} />
	    	<Form handleSubmit={updateList} />
    	</div>  
	)
}

export default MyApp;