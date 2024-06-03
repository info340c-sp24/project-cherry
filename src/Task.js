import React, { useState } from 'react';

function Task({ task, onRemove, onEdit, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove "${task}"?`)) {
      onRemove();
    }
  };

  return (
    <li className={isEditing ? 'editing' : ''}>
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEdit();
            }
          }}
        />
      ) : (
        <>
          <span>{task}</span>
          <div className="icon-container">
            <img
              src="/images/edit_btn.png"
              alt="Edit"
              className="icon edit"
              onClick={() => setIsEditing(true)}
            />
            <img
              src="/images/remove_btn.png"
              alt="Remove"
              className="icon remove"
              onClick={handleRemove}
            />
            <img
              src="/images/complete_btn.png"
              alt="Complete"
              className="icon complete"
              onClick={onComplete}
            />
          </div>
        </>
      )}
    </li>
  );
}

export default Task;
