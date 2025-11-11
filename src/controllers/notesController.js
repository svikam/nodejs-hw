import createHttpError from "http-errors";
import { Note } from "../models/note.js";

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, "Note not found");
    // return next(new Error("Note not found"));
    // return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
  // res.status(201).json({ message: "Note created" });
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
  // res.status(200).json({ message: "Note deleted" });
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, { new: true });
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
  // res.status(200).json({ message: "Updated" });
};
