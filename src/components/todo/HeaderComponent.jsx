import { Link } from 'react-router-dom';

import { AuthContext, useAuth } from './security/AuthContext';
import { useContext } from 'react';

function HeaderComponent() {

    // const authContext = useContext(AuthContext);

    const authContext = useAuth()

    console.log(authContext);


    function logout() {
        authContext.doLogout()
    }


    return (
        // <header className='header'>
        //     <div className='container'>
        //         <ul className='navbar-nav'>
        //             <li className='nav-item'><a className='nav-link' href="https://www.in28minutes.com/">In28minutes</a></li>
        //             {/* <li className='nav-item'><a className='nav-link' href="/welcome/chandra">Home</a></li> */}
        //             <li className='nav-item'><Link className='nav-link' to="/welcome/chandra">Home</Link></li>
        //             <li className='nav-item'><Link className='nav-link' to="/todos">Todos</Link></li>
        //             <li className='nav-item'><Link className='nav-link' to="/logout">Logout</Link></li>
        //             <li className='nav-item'><Link className='nav-link' to="/login">Login</Link></li>
        //         </ul>
        //     </div>
        // </header>


        <header className="border-bottom border-dark border-1 mb-5 p-1">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {authContext.isAuthenticated && <Link className="nav-link" to="/welcome/chandra">Home</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {authContext.isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                                </li>

                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!authContext.isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {authContext.isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}


export default HeaderComponent;