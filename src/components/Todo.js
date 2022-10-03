import { useGetTodosQuery, useAddTodoMutation,useDeleteTodoMutation, useUpdateTodoMutation } from './api/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

const Todo = () => {
    const[newTodo,setNewTodo]=useState('')

    const {
        data:todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()


    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label>Enter un new task</label>
            <div>
                <input type='text' value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter new Task" />
            </div>
            <button className='submit'>
                <FontAwesomeIcon icon={faUpload}/>
            </button>
        </form>

        let content;
        if(isLoading){
            content = <p>Loading...</p>
        }else if(isSuccess){
            content=todos.map(todo => {
                return(
                    <article key={todo.id}>
                        <div>
                            <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({...todo, completed: !todo.completed})}
                            />
                            <label htmlFor={todo.id}>{todo.title}</label>
                        </div>
                        <button onClick={() => deleteTodo({ id: todo.id})}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </article>
                )
            })
        }else if(isError){
            content=<p>{error}</p>
        }

        return(
            <main>
                <h1>Todo List</h1>
                {newItemSection}
                {content}
            </main>
        )
}
export default Todo;