import { useEffect, useState } from "react"
import { deleteTodoApi, retriveAllTodosByUsernameApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"


export default function TodoListComponent() {

    const today = new Date()

    const authContext = useAuth()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    // const todos = [
    //{
    //     id: 1,
    //     description: 'Learn AWS',
    //     done: false,
    //     targetDate: targetDate
    // }, {
    //     id: 2,
    //     description: 'Learn Spring',
    //     done: false,
    //     targetDate: targetDate
    // }, {
    //     id: 3,
    //     description: 'Learn Docker',
    //     done: false,
    //     targetDate: targetDate
    // },
    // {
    //     id: 4,
    //     description: 'Learn DSA',
    //     done: false,
    //     targetDate: targetDate
    // }
    // ]

    useEffect(
        () => refreshTodos(), []
    )


    function refreshTodos() {
        retriveAllTodosByUsernameApi(authContext.username)
            .then((response) => {
                console.log(response)
                setTodos(response.data)
            }
            )
            .catch((error) => console.log(error))
    }

    function deleteTodo(id) {
        deleteTodoApi(authContext.username, id)
            .then((response) => {
                console.log(response)
                setMessage(`Deletion of todo id=${id} is successful!`)
                refreshTodos()
            }
            )
            .catch((error) => console.log(error))
    }

    function updateTodo(id) {
        console.log(`update clicked:${id}`);
        navigate(`/todo/${id}`)
    }

    function addTodo() {
        navigate('/todo/-1')
    }

    return (
        <div className='container'>
            <h1>Things to do!</h1>
            {message && <div className="text-dark alert alert-warning">{message}</div>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Is Completed?</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button className="btn btn-warning"
                                        onClick={() => deleteTodo(todo.id)}>Delete</button></td>

                                    <td><button className="btn btn-success"
                                        onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }


                </tbody>
            </table>

            <button className="btn btn-success m-5" onClick={addTodo}>Create Todo</button>
        </div>
    )
}