import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./Dashboard.css";

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

  useEffect(() => {
    const storedButtons = localStorage.getItem("buttons");
      setButtons([
        {
          id: 1,
          name: "My Sites",
          urls: [
            "https://www.google.com",
            "https://www.facebook.com",
            "https://www.twitter.com",
          ],
        },
        {
          id: 2,
          name: "My Work",
          urls: [
            "https://www.github.com",
            "https://www.stackoverflow.com",
            "https://www.linkedin.com",
          ],
        },
      ]);
    }, []);

  useEffect(() => {
    localStorage.setItem("buttons", JSON.stringify(buttons));
  }, [buttons]);

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
    </div>
  );
};

export default Dashboard;
