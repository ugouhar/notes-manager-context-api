import React, { useContext, useEffect, useState } from "react";
import "./NoteForm.css";
import {
  NotesContext,
  NotesDispatchContext,
} from "../../contexts/NotesContext";
import {
  ADD_ACTION,
  SET_NOTEID_TO_UPDATE_ACTION,
  UPDATE_ACTION,
} from "../../contexts/notesActionCreators";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const id = crypto.randomUUID();
  const [isUpdatingNote, setIsUpdatingNote] = useState(false);
  const dispatch = useContext(NotesDispatchContext);

  const { notesList, noteIdToUpdate } = useContext(NotesContext);

  useEffect(() => {
    if (noteIdToUpdate && notesList.length > 0) {
      setIsUpdatingNote(true);
    } else {
      setIsUpdatingNote(false);
    }
  }, [noteIdToUpdate, notesList.length]);

  useEffect(() => {
    const note = notesList.find((item) => item.id === noteIdToUpdate);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [noteIdToUpdate, notesList]);

  const setTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const setContentHandler = (e) => {
    setContent(e.target.value);
  };

  const cancelUpdateHandler = () => dispatch(SET_NOTEID_TO_UPDATE_ACTION(null));

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    if (noteIdToUpdate && notesList.length > 0) {
      dispatch(UPDATE_ACTION(title, content));
      dispatch(SET_NOTEID_TO_UPDATE_ACTION(null));
    } else {
      dispatch(ADD_ACTION(id, title, content));
    }
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={onSubmitHandler}>
      <label htmlFor="note-title">
        <div className="label-text">Title:</div>
        <input id="note-title" value={title} onChange={setTitleHandler} />
      </label>
      <label htmlFor="note-content">
        <div className="label-text">Content:</div>
        <textarea
          id="note-content"
          value={content}
          onChange={setContentHandler}
        />
      </label>
      {!isUpdatingNote ? (
        <button type="submit" className="btn-add-note">
          Add Note
        </button>
      ) : (
        <div className="update-ctas">
          <button type="submit" className="btn-update-note">
            Update Note
          </button>
          <button
            type="button"
            className="btn-cancel-update"
            onClick={cancelUpdateHandler}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
