import { useState } from 'react';


export default function BountyForm({ addBounty }) {
  const [newBounty, setNewBounty] = useState({
    fName: '',
    lName: '',
    living: true,
    bountyAmt: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBounty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBounty(newBounty);
    setNewBounty({
      fName: '',
      lName: '',
      living: true,
      bountyAmt: '',
      type: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bounty-form">
      <input
        type="text"
        name="fName"
        value={newBounty.fName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lName"
        value={newBounty.lName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="number"
        name="bountyAmt"
        value={newBounty.bountyAmt}
        onChange={handleChange}
        placeholder="Bounty Amount"
        required
      />
      <input
        type="text"
        name="type"
        value={newBounty.type}
        onChange={handleChange}
        placeholder="Type (jedi/sith)"
        required
      />
      <button type="submit">Add Bounty</button>
    </form>
  );
}
