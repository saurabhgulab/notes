const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes . Get: /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add notes to particular user:id . Post: /api/notes/addnote. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should be minimum 5 Characters long.").isLength({
      min: 5,
    }),
    body(
      "description",
      "Description should be minimum 5 Characters long."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //Return bad request on Errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing note user:id . Put: /api/notes/updatenote. Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it.
    let note = await Note.findById(req.params.id);
    //if note does not exist
    if (!note) {
      return res.status(404).res.send("Not Found");
    }
    //invalid user check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).res.send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: Delete an existing note user:id . Delete: /api/notes/deletenote. Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted.
    let note = await Note.findById(req.params.id);
    //if note does not exist
    if (!note) {
      return res.status(404).res.send("Not Found");
    }
    //invalid user check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).res.send("Not Allowed");
    }
    //Find the note by Id and Delete it
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
