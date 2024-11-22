import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {

    const [username, setUsername] = useState('chandra');
    const [password, setPassword] = useState('');

    const [showSuccessComponent, setShowSuccessComponent] = useState(false)
    const [showErrorComponent, setShowErrorComponent] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

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


    async function handleSubmit() {
        if (await authContext.submitLogin(username, password)) {
            setShowSuccessComponent(true);
            setShowErrorComponent(false);
            // navigate('/welcome/' + username)
            navigate(`/welcome/${username}`)
        }
        else {
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


export default LoginComponent;