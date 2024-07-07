import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore"; 

await setDoc(doc(db, "video-links", link1), {
    index: 1,
    link:'https://www.youtube.com/watch?v=6LFjVC3cHjI'
  });