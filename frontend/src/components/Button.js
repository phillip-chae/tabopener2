import React, { useState } from "react";
import "./Button.css";

const Button = ({ id, name, urls, onDeleteButtonClick, onEditButtonClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedUrls, setEditedUrls] = useState(urls);

  const handleSaveButton = () => {
    const editedButton = {
      id,
      name: editedName,
      urls: editedUrls,
    };
    onEditButtonClick(editedButton);
    setIsEditing(false);
  };

  const handleCancelButton = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleUrlsChange = (event) => {
    setEditedUrls(event.target.value.split("\n"));
  };

  const handleDeleteButton = () => {
    onDeleteButtonClick(id);
  };

  const openWebsites = () => {
    urls.forEach(url => window.open(url, '_blank'))
  };

  if (isEditing) {
    return (
      <div className="button">
        <div className="form-group">
          <label htmlFor={`buttonName_${id}`}>Name:</label>
          <input
            type="text"
            id={`buttonName_${id}`}
            value={editedName}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`buttonUrls_${id}`}>URLs (Newline-separated):</label>
          <textarea
            id={`buttonUrls_${id}`}
            value={editedUrls.join("\n")}
            onChange={handleUrlsChange}
          />
        </div>
        <button onClick={handleSaveButton}>Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    );
  } else {
    return (
      <div className="button">
        <button className="name" onClick={openWebsites}>{name}</button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDeleteButton}>Delete</button>
      </div>
    );
  }
};

export default Button;
