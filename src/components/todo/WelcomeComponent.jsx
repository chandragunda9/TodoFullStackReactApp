import { Link, useParams } from 'react-router-dom';

export default function WelcomeComponent() {

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