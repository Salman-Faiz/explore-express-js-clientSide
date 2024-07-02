
import { useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users ,setUsers] =useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  //reset form
  const formRef = useRef(null);

  const handleForm = (event)=>{
event.preventDefault();
const form =new FormData(event.currentTarget);
const name = form.get('name')
const email = form.get('email');
 console.log(name,email)
 const user = {name, email}
 
 console.log(user)
 
 fetch('http://localhost:4000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
})
.then(response => response.json())
.then(data =>{
  console.log(data)
  const newUsers = [...users ,data]
  setUsers(newUsers);

     // Reset the form
     if (formRef.current) {
      formRef.current.reset();
    } else {
      console.error('Form element not found');
    }
})
.catch(error => console.error('Error:', error));


  }
  return (
    <>
   <h3>user management system </h3>
   <h2>number of users :{users.length}</h2>
   <form ref={formRef}  onSubmit={handleForm}>
    <h3>Add users</h3>
    <input type="text" name="name" id="" placeholder='name'/> <br />
    <input type="email" name="email" id="" placeholder='email'/> <br />
   
    <input type="submit" value="submit" />

   </form>
   {
    users.map((user)=> <div style={{background:'lightGreen'}} key={user.id}>
      <h1>User Id : {user.id}</h1>
      <h2>Name: {user.name}</h2>
      <h4>Email: {user.email}</h4>
      </div>)
   }
    </>
  )
}

export default App
