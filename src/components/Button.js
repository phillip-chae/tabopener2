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
          <label htmlFor={`buttonUrls_${id}`}>URLs (comma-separated):</label>
          <input
            type="text"
            id={`buttonUrls_${id}`}
            value={editedUrls}
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
        <a href={urls[0]} target="_blank" rel="noopener noreferrer">{name}</a>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDeleteButton}>Delete</button>
      </div>
    );
  }
};

export default Button;
