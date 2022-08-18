import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //   const s1 = {
  //     name: "Saurabh Krishan Gulab",
  //   };
  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({ name: "Saurabh K. Gulab" });
  //     }, 3000);
  //   };
  const InitialNote = [
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
    {
      _id: "62fbb5016a10cced6b1490a0",
      user: "62fb78ecf0493138c6773e18",
      title: "Title 1",
      description: "Description 1",
      tag: "General",
      date: "2022-08-16T15:17:21.795Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(InitialNote);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
