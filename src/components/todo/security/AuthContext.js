import { createContext, useContext, useState } from "react";


//1. create a context
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2. share context across components
function AuthProvider({ children }) {

    //3. put state in context
    // const [number, setNumber] = useState(0)

    const [isAuthenticated, setAuthenticated] = useState(false)

    // setInterval(() => {
    //     setNumber(number + 1)
    // }, 10000);

    const valueToShare = { number, isAuthenticated, submitLogin, doLogout }
    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    )


    function submitLogin(username, password) {
        if (username === 'chandra' && password === 'gvn') {
            setAuthenticated(true)
            console.log('Success');
            return true;
        }
        setAuthenticated(false)
        console.log('Failed');
        return false;
    }

    function doLogout() {
        setAuthenticated(false);
    }
}

export default AuthProvider;