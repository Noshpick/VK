import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ListStore } from '../stores/ListStore';
import styles from '../styles/App.module.css';

const listStore = new ListStore();

export const ListItem = observer(({ item }: { item: { id: number; name: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  const handleSave = () => {
    listStore.updateItem(item.id, { name: editedName });
    setIsEditing(false);
  };

  return (
    <div className={styles.listItem}>
      {isEditing ? (
        <input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
        <span>{item.name}</span>
      )}
      <button onClick={() => listStore.removeItem(item.id)}>Удалить</button>
      {isEditing ? (
        <button onClick={handleSave}>Сохранить</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Редактировать</button>
      )}
    </div>
  );
});
