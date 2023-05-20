import { useState } from 'react';
import { db } from '../firebase';
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";


export const useBooks = () => {

  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookList, setBookList] = useState([]);
  const [id, setId] = useState(0);
  const [editMode, setEditMode] = useState(false);


  const saveBook = async (e) => {
    e.preventDefault();

    try {
      const data = await addDoc(collection(db, 'books'), {
        bookName,
        authorName,
      })
      setBookList([...bookList, {
        bookName,
        authorName,
        id: data.id,
      }])

      setAuthorName('');
      setBookName('');

    } catch (error) {
      console.log(error);
    }
  }

  const getBooks = async () => {
    try {
      await onSnapshot(collection(db, 'books'), (query) => {
        setBookList(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    } catch (error) {
      console.log(error);
    }
  }

  const fillFormEdit = (item) => {
    setBookName(item.bookName);
    setAuthorName(item.authorName);
    setId(item.id);
    setEditMode(true);
  }

  const editBook = async(e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'books', id);
      await updateDoc(docRef, {
        bookName,
        authorName
      })

      const newArray = bookList.map(
        item => item.id === id ? {id, bookName, authorName} : item
      )

      setBookList(newArray);
      setAuthorName('');
      setBookName('');
      setId('');
      setEditMode(false);

    } catch (error) {
      console.log(error);
    }
  }

  const cancel = () => {
    setEditMode(false);
    setId('');
    setAuthorName('');
    setBookName('');
  }

  const showAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id);
      }
    })
  }

  const deleteBook = async(id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } catch (error) {
      console.log(error);
    }
  }


  return {
    authorName,
    bookList,
    bookName,
    editMode,
    id,
    setAuthorName,
    setBookList,
    setBookName,
    setEditMode,
    setId,



    cancel,
    deleteBook,
    editBook,
    fillFormEdit,
    getBooks,
    saveBook,
    showAlert,
  }
}