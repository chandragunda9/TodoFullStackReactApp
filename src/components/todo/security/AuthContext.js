import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeBasicAuth, executeJWTAuth } from "../api/AuthenticationApiService";


//1. create a context
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2. share context across components
function AuthProvider({ children }) {

    //3. put state in context
    // const [number, setNumber] = useState(0)

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // setInterval(() => {
    //     setNumber(number + 1)
    // }, 10000);

    const valueToShare = { isAuthenticated, username, submitLogin, doLogout, token }
    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    )


    // function submitLogin(username, password) {
    //     if (username === 'chandra' && password === 'gvn') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         console.log('Success');
    //         return true;
    //     }
    //     setAuthenticated(false)
    //     setUsername(null)
    //     console.log('Failed');
    //     return false;
    // }


    //below is basic authentication
    // async function submitLogin(username, password) {

    //     const token = 'Basic ' + window.btoa(username + ":" + password)

    //     try {

    //         const response = await executeBasicAuth(token)

    //         if (response.status == 200) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(token)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log("intercepting request and adding a token");
    //                     config.headers.Authorization = token
    //                     return config
    //                 }
    //             )

    //             return true;
    //         }
    //         else {
    //             doLogout()
    //             return false;
    //         }

    //     } catch (error) {
    //         console.log("Auth error: " + error);
    //         doLogout()
    //         return false;
    //     }
    // }



    //below is JWT authentication
    async function submitLogin(username, password) {

        try {

            const response = await executeJWTAuth(username, password)

            if (response.status == 200) {

                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("intercepting request and adding a token");
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true;
            }
            else {
                doLogout()
                return false;
            }

        } catch (error) {
            console.log("Auth error: " + error);
            doLogout()
            return false;
        }
    }


    function doLogout() {
        setAuthenticated(false);
        setUsername(null)
        setToken(null)
    }
}

export default AuthProvider;