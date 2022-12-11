import React, { useState } from 'react';


function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [fields, setFields] = useState(false);
  const url = 'http://localhost:3000/api/employees';



  const handleSubmit = (event) => {
      event.preventDefault();
      if (!firstName || !lastName || !email || !gender) {
        setFields(true);
        return;
      }
    
      const body = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender
      };
      const fetchConfig = {
          method: 'POST',
          headers: new Headers({
              "Content-Type": "application/json",
          }),
          body: JSON.stringify(body),
      };
      console.log(body)
      fetch(url,fetchConfig)
      .then((response) => {
          console.log(response)
          setStatus(response.status)
      return response.json();
      })
      if (status === 200){
        console.log('success')
        setFirstName('');
        setLastName('');
        setEmail('');
        setGender('');
        setFields(false);
      }
      else if(status === 405) {
        console.log("bad request 405")
      }
  }
  



return (
  <main className='h-screen bg-orange-400 flex flex-col justify-center'>
    <div className='flex flex-col items-center '>
      <h1 className='text-4xl'>Employee Details</h1>
        <input
          className='mt-10'
          type="email"
          placeholder='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          className='mt-4'
          type="text"
          placeholder='first name'
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
        <input
          className='mt-4'
          type="text"
          placeholder='last name'
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
        <select className='mt-4' value={gender} onChange={event => setGender(event.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      <button className='mt-10 bg-black w-1/12 rounded-xl text-white' type="submit" onClick={handleSubmit} >Submit</button>
      {fields ? <div className='text-xl font-bold mt-4'>Please fill out all fields!</div> : null}
    </div>
  </main>
);
}

export default App;




