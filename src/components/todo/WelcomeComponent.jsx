import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';


export default function WelcomeComponent() {

    const params = useParams()
    console.log(params);

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function helloWorld() {
        // axios.get('http://localhost:8080/hello-world')
        //     .then((response) => successResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally(() => {
        //         console.log('cleanup');
        //     })


        // retrieveHelloWorldBean()
        //     .then((response) => successResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally(() => {
        //         console.log('cleanup');
        //     })


        retrieveHelloWorldPathVariable(params.username)
            .then((response) => successResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => {
                console.log('cleanup');
            })
    }


    function errorResponse(error) {
        console.log(error);
    }

    function successResponse(response) {
        console.log(response);
        // setMessage(response.data)
        setMessage(response.data.message)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {params.username}</h1>
            <div>
                {/* Manage your todos - <a href="/todos">Visit</a> */}
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>

            <div>
                <button className='btn btn-success m-3' onClick={helloWorld}>Call Hello World</button>
            </div>

            <div className='text-primary'>
                {message}
            </div>
        </div >
    )
}