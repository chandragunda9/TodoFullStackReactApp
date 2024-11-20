import { useContext } from "react";
import { AuthContext, useAuth } from "./security/AuthContext";

function FooterComponent() {
    // const authContext = useContext(AuthContext);
    const authContext = useAuth()

    return (
        <footer className='footer'>
            <div className='container'>
                Your Footer
            </div>
        </footer>
    )
}

export default FooterComponent;