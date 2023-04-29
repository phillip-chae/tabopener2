import React, { useState } from "react";
import Button from "./Button";
import "./Dashboard.css";

const Dashboard = () => {
  const [buttons, setButtons] = useState([
    {
      id: 1,
      name: "My Sites",
      urls: [
        "https://www.google.com",
        "https://www.facebook.com",
        "https://www.twitter.com"
      ],
    },
    {
      id: 2,
      name: "My Work",
      urls: [
        "https://www.github.com",
        "https://www.stackoverflow.com",
        "https://www.linkedin.com"
      ],
    }
  ]);

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
      urls: newButtonUrls.split(","),
    };
    setButtons([...buttons, newButton]);
    setNewButtonName("");
    setNewButtonUrls("");
    setShowAddButtonForm(false);
  };

  const addButtonForm = (
    <form onSubmit={handleAddButtonFormSubmit}>
      <div className="form-group">
        <label htmlFor="newButtonName">Name:</label>
        <input
          type="text"
          id="newButtonName"
          value={newButtonName}
          onChange={handleNewButtonNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newButtonUrls">URLs (comma-separated):</label>
        <input
          type="text"
          id="newButtonUrls"
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
            onDeleteButtonClick={(id) =>
              setButtons(buttons.filter((button) => button.id !== id))
            }
            onEditButtonClick={(editedButton) =>
              setButtons(
                buttons.map((button) =>
                  button.id === editedButton.id ? editedButton : button
                )
              )
            }
          />
        ))}
      </div>
      <div className="add-button-form">
        {showAddButtonForm ? addButtonForm : addNewButtonButton}
      </div>
    </div>
  );
};

export default Dashboard;
