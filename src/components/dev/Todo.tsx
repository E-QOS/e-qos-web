import React from 'react';

/** Emplacement à compléter, visible uniquement en développement (`npm start`). Rien n'est rendu en production. */
export const Todo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!import.meta.env.DEV) return null;
  return (
    <p
      role="note"
      style={{
        margin: '1.5rem 0',
        padding: '0.75rem 1rem',
        border: '1px dashed var(--orange-deep)',
        color: 'var(--orange-deep)',
        fontSize: '0.875rem',
        maxWidth: 'none',
      }}
    >
      TODO : {children}
    </p>
  );
};

export default Todo;
