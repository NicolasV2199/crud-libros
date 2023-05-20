import { useEffect, useState } from "react"
import { useBooks } from "../hooks/useBooks";

export const Formulario = () => {

  const {
    getBooks, 
    bookList, 
    showAlert, 
    fillFormEdit, 
    editMode, 
    editBook, 
    saveBook, 
    authorName, 
    setAuthorName,
    bookName,
    setBookName,
    cancel,
  } = useBooks();

  
  useEffect(() => {
    getBooks();
  }, [])

  

  return (
    <div className="container mt-5">
      <h1 className="text-center">BOOKS CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="tex-center">Books List</h4>
          <ul className="list-group">
            {
              bookList.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.authorName} - {item.bookName}</span>
                  <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => showAlert(item.id)}>Eliminar</button>
                  <button className="btn btn-warning btn-sm float-end" onClick={() => fillFormEdit(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">{editMode ? 'Edit Book' : 'Save Book'}</h4>
          <form onSubmit={editMode ? editBook : saveBook}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter author name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)} />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter book name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)} />

            {
              editMode ? 
              (
                <>
                <button className="btn btn-block" onClick={() => cancel()}>Cancelar</button>
                <button className="btn btn-primary btn-block" onClick={(e) => editBook(e)}>Editar</button>
                </>
              )
              : (<button className="btn btn-primary btn-block">Agregar</button>)
            }
          </form>
        </div>
      </div>
    </div>
  )
}