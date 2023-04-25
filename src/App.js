import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import './App.css';
import {db ,auth,storage} from "./config/firebase";
import { getDocs ,collection ,addDoc ,deleteDoc ,doc, updateDoc} from 'firebase/firestore';  //get documents from firestore and for getting single doc use getDoc method //collection refers the collection in databse
import {ref,uploadBytes} from "firebase/storage";

function App() {
  const [movieList,setMovieList]=useState([]);

  //new movie states
  const [newMovieTitle, setNewMovieTitle]=useState('')
  const [newReleaseDate, setNewReleaseDate]=useState('')
  const [isNewOscar, setIsNewOscar]=useState(false)

  //updated movie title
  const [updatedTitle,setUpdatedTitle]=useState('');

  //uploading files
  const [uploadFile,setUploadFile]=useState(null)

  const collectionRef=collection(db,"movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(collectionRef);
      const filteredData = data.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      ))
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{

    getMovieList();
  },[]);

  const onSubmitMovie=async()=>{
    try {
      await addDoc(collectionRef,{
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receiveOscar: isNewOscar,
        userId:auth?.currentUser?.uid
      })
      getMovieList();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDocument=async(id)=>{
  let moviedoc=doc(db,"movies",id)
    try {
      await deleteDoc(moviedoc)
    } catch (error) {
      console.log(error)
    }
  }

  const updateMovie=async(id)=>{
    let moviedoc = doc(db, "movies", id);
    try {
      await updateDoc(moviedoc, { title: updatedTitle })
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFiles=async()=>{
    if (!uploadFile){
      return;
    }
    const filesFolderRef=ref(storage,`projectFiles/${uploadFile.name}`)//here it ref to file folder in storage and storage keyword is a auth from firebase.js file
   try {
     await uploadBytes(filesFolderRef, uploadFile);  //uploadBytes is used to upload file at file folder location in storage
   } catch (error) {
    console.log(error)
   }
   
  }
  return (
    <div className="App">
     <Auth/>
     <div>
      <input type="text" placeholder="Movie title..." value={newMovieTitle} onChange={(e)=>setNewMovieTitle(e.target.value)}/>
      <input type="number" placeholder="Release Date..." value={newReleaseDate} onChange={(e)=>setNewReleaseDate(Number(e.target.value))}/>
      <input type="checkbox" checked={isNewOscar} onChange={(e)=>setIsNewOscar(e.target.checked)}/>
      <label >Receive an Oscar</label>
      <button onClick={onSubmitMovie}>Submit</button>
      
     </div>
     <div>
        {movieList.map((movie)=>(
          <div key={movie.id}>
            <h1 style={{color:movie.receiveOscar ? "green" :"red"}}>{movie.title}</h1>
            <p>Date {movie.releaseDate}</p>
            <button onClick={() => deleteDocument(movie.id)}>delete movie</button>
            <input type="text " placeholder="New title.." onChange={(e)=>setUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateMovie(movie.id)}>Update title</button>
          </div>
        ))}
     </div>
     <div>
      <input type="file" onChange={(e)=>setUploadFile(e.target.files[0])}/>
      <button onClick={uploadFiles}>Upload file</button>

     </div>
    </div>
  );
}

export default App;
