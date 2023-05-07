import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "./Button";
import "./Dashboard.css";

const apiUrl = "http://localhost:3001/api"

const Dashboard = () => {
  const [buttons, setButtons] = useState([]);
  const [showAddButtonForm, setShowAddButtonForm] = useState(false);
  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonUrls, setNewButtonUrls] = useState("");

  const handleNewButtonNameChange = (event) => {
    setNewButtonName(event.target.value);
  };

  const handleNewButtonUrlsChange = (event) => {
    setNewButtonUrls(event.target.value);
  };

  const handleAddButtonFormSubmit = (event) => {
    event.preventDefault();
    const newButton = {
      id: buttons.length + 1,
      name: newButtonName,
      urls: newButtonUrls.split("\n"),
    };
    setButtons([...buttons, newButton]);
    setNewButtonName("");
    setNewButtonUrls("");
    setShowAddButtonForm(false);
  };

  const handleEditButtonClick = (editedButton) => {
    const newButtons = buttons.map((button) =>
      button.id === editedButton.id ? editedButton : button
    );
    setButtons(newButtons);
  };

  const handleDeleteButtonClick = (buttonId) => {
    setButtons(buttons.filter((button) => button.id !== buttonId));
  };

  const handleSaveButtonClick = () => {
    axios.post(`${apiUrl}/write-json/buttons`, buttons)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.get(`${apiUrl}/read-json/buttons`)
      .then(response =>{
        const data = response.data;
        setButtons(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const addButtonForm = (
    <form onSubmit={handleAddButtonFormSubmit}>
      <div className="form-group">
        <label htmlFor="newButtonName">Name:</label>
        <input
          type="text"
          id="newButtonName"
          className="form-control"
          value={newButtonName}
          onChange={handleNewButtonNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newButtonUrls">URLs (Newline-separated):</label>
        <textarea
          id="newButtonUrls"
          className="form-control"
          value={newButtonUrls}
          onChange={handleNewButtonUrlsChange}
        />
      </div>
      <button type="submit">Add Button</button>
    </form>
  );

  const addNewButtonButton = (
    <button onClick={() => setShowAddButtonForm(true)}>Add Button</button>
  );

  return (
    <div className="dashboard">
      <h1>Tab Opener</h1>
      <div className="button-list">
        {buttons.map((button) => (
          <Button
            key={button.id}
            id={button.id}
            name={button.name}
            urls={button.urls}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
          />
        ))}
      </div>
      {showAddButtonForm ? addButtonForm : addNewButtonButton}
      <button
        onClick={handleSaveButtonClick}
        className="save-all-changes-button"
      >
        Save all changes
      </button>

    </div>
  );
};

export default Dashboard;