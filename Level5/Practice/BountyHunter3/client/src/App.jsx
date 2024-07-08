import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BountyForm from './components/bountyForm'; 


export default function App() {
  const [bountyHunter, setBountyHunter] = useState([]);

  function getBountyHunter() {
    axios.get("/api/bounty")
      .then(res => setBountyHunter(res.data))
      .catch(err => console.log(err));
  }

  function addBounty(newBounty) {
    axios.post("/api/bounty", newBounty)
        .then(res => {
        setBountyHunter(prevBounties => [...prevBounties, res.data]);
        console.log(bountyHunter)
      })
      .catch(err => console.log(err));
  }

    function deleteBounty(bountiesId) {
    axios.delete(`/api/bounty/${bountiesId}`)
      .then(() => {
        setBountyHunter(prevBounties => prevBounties.filter(bounty => bounty._id !== bountiesId))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBountyHunter();
  }, []);

  return (
    <div className='bounty-container'>
      <h1>Bounty List:</h1>
      {bountyHunter.map(bounty => (
        <div className="bounty-item" key={bounty._id}>
          <h2>{bounty.fName} {bounty.lName}</h2>
          <p>Bounty Amount: ${bounty.bountyAmt}</p>
          <p>Type: {bounty.type}</p>
          <button className="bounty-btn" onClick={() => deleteBounty(bounty._id)}>Delete Bounty</button>
        </div>
      ))}

      <BountyForm addBounty={addBounty} />
    </div>
  );
}
