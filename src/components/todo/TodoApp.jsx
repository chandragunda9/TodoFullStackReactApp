import './TodoApp.css'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import TodosComponent from './TodoListComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';

import AuthProvider, { useAuth } from './security/AuthContext';


function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    const navigate = useNavigate()

    console.log('todoapp.jsx ' + authContext);
    if (authContext.isAuthenticated)
        return children
    return <Navigate to={'/login'} />
}

function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={
                            <LoginComponent />
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
                                <TodosComponent />
                            </AuthenticatedRoute>
                        } />


                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default TodoApp;