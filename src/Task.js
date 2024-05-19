import React, { useState } from 'react';

function Task({ task, onRemove, onEdit }) {
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
          {task}
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
        </>
      )}
    </li>
  );
}

export default Task;
