import './TodoApp.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import TodoListComponent from './TodoListComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';

import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';


function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    console.log('todoapp.jsx ' + authContext);
    if (authContext.isAuthenticated)
        return children
    return <Navigate to={'/login'} />
}


// function AuthenticatedRootUrl() {
//     const authContext = useAuth()
//     if (authContext.isAuthenticated) {
//         return <Navigate to={`/welcome/${authContext.username}`} />
//     }
//     return <Navigate to={'/login'} />
// }

function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={
                            // <LoginComponent />
                            <Navigate to={'/login'} />
                        } />

                        {/* <Route path='/' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } /> */}

                        <Route path='/login' element={<LoginComponent />} />

                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <TodoListComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id'
                            element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            }
                        />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default TodoApp;