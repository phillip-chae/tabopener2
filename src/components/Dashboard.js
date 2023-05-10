// Importing necessary libraries and components
import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./Dashboard.css";

// Defining Dashboard component
const Dashboard = () => {

  // Declaring state variables for button list, adding new button form, new button name, new button URLs
  const [buttons, setButtons] = useState([]);
  const [showAddButtonForm, setShowAddButtonForm] = useState(false);
  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonUrls, setNewButtonUrls] = useState("");

  // Handler for changes to new button name input
  const handleNewButtonNameChange = (event) => {
    setNewButtonName(event.target.value);
  };

  // Handler for changes to new button URLs input
  const handleNewButtonUrlsChange = (event) => {
    setNewButtonUrls(event.target.value);
  };

  // Handler for new button form submission
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

  // Handler for editing existing buttons
  const handleEditButtonClick = (editedButton) => {
    const newButtons = buttons.map((button) =>
      button.id === editedButton.id ? editedButton : button
    );
    setButtons(newButtons);
  };

  // Handler for deleting existing buttons
  const handleDeleteButtonClick = (buttonId) => {
    setButtons(buttons.filter((button) => button.id !== buttonId));
  };

  // Function to save button data to the API
  const saveButtons = () => {
    localStorage.setItem("buttons", JSON.stringify(buttons));
  };

  const loadButtons = () => {
    const storedButtons = localStorage.getItem("buttons");
    if (storedButtons) {
      setButtons(JSON.parse(storedButtons));
    }
  }
  // useEffect hook to fetch button data from API on component mount
  useEffect(() => {
    loadButtons();
  }, []);
  
  //bugFixer is made so that the saveButtons() is not run before the json file is read
  const [bugFixer, setBugFixer] = useState(0)
  useEffect(() => {
    if(bugFixer != 0){
      saveButtons();
    }
    else{
      setTimeout(setBugFixer(1),3000)
    }
  }, [buttons]);
  
  // Form to add a new button
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

  // Button to show the new button form
  const addNewButtonButton = (
    <button onClick={() => setShowAddButtonForm(true)}>Add Button</button>
  );

  // Rendered content for the Dashboard component
  return (
    <div className="dashboard">
      <h1>Tabs</h1>
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