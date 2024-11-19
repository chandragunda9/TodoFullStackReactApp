import { useState } from 'react'
import './TodoApp.css'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';

function TodoApp() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />}></Route>
                    <Route path='/login' element={<LoginComponent />}></Route>
                    <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
                    <Route path='*' element={<ErrorComponent />}></Route>
                    <Route path='/todos' element={<TodosComponent />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent() {

    const [username, setUsername] = useState('chandra');
    const [password, setPassword] = useState('');

    const [showSuccessComponent, setShowSuccessComponent] = useState(false)
    const [showErrorComponent, setShowErrorComponent] = useState(false)

    const navigate = useNavigate()

    // const handleUsernameChange = (event) => {
    //     setUsername(event.target.value);
    // }

    function handleUsernameChange(event) {
        // console.log(event);
        // console.log(event.target.value);
        setUsername(event.target.value);
    }


    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }


    function handleSubmit() {
        if (username === 'chandra' && password === 'gvn') {
            console.log('Success');
            setShowSuccessComponent(true);
            setShowErrorComponent(false);
            // navigate('/welcome/' + username)
            navigate(`/welcome/${username}`)
        }
        else {
            console.log('Failed');
            setShowSuccessComponent(false);
            setShowErrorComponent(true);
            navigate('/login')
        }
    }

    return (
        <div className="login">

            {/* <div className='successMsg' style={{ display: 'none' }}>Authenticated Successfully</div>
            <div className='failureMsg' style={{ display: 'none' }}>Authentication Failed. Please check your credentials.</div> */}


            {/* <SuccessMessageComponent></SuccessMessageComponent>
            <ErrorMessageComponent></ErrorMessageComponent> */}

            {showSuccessComponent && <div className='successMsg'>Authenticated Successfully</div>}
            {showErrorComponent && <div className='failureMsg'>Authentication Failed. Please check your credentials.</div>}

            <div className="loginForm">

                <h1>Time to Login!</h1>

                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div>
                    <button onClick={handleSubmit}>Login</button>
                </div>

            </div>
        </div>
    )



    function SuccessMessageComponent() {
        if (showSuccessComponent) {
            return (
                <div className='successMsg'>Authenticated Successfully</div>
            )
        }
        return null
    }

    function ErrorMessageComponent() {
        if (showErrorComponent) {
            return (
                <div className='failureMsg'>Authentication Failed. Please check your credentials.</div>
            )
        }
        return null
    }
}


function TodosComponent() {

    const today = new Date()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const todos = [{
        id: 1,
        description: 'Learn AWS',
        done: false,
        targetDate: targetDate
    }, {
        id: 2,
        description: 'Learn Spring',
        done: false,
        targetDate: targetDate
    }, {
        id: 3,
        description: 'Learn Docker',
        done: false,
        targetDate: targetDate
    },
    {
        id: 4,
        description: 'Learn DSA',
        done: false,
        targetDate: targetDate
    }]

    return (
        <div className='TodosComponent'>
            <h1>Things to do!</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Is Completed?</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                    <td>{todo.done.toString()}</td>
                                </tr>
                            )
                        )
                    }


                </tbody>
            </table>
        </div>
    )
}

function WelcomeComponent() {

    const params = useParams()
    console.log(params);

    return (
        <div className="welcome">
            <h1>Welcome {params.username}</h1>
            <div>Welcome Component

                <div>
                    {/* Manage your todos - <a href="/todos">Visit</a> */}

                    Manage your todos - <Link to="/todos">Go here</Link>
                </div>
            </div>
        </div>
    )
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h2>We are working really hard!</h2>
            <p>Please reach out to the team for any queries.</p>
        </div>
    )
}


export default TodoApp;