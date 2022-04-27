import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";


const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    let location = useLocation();

    if (loading) {
        return <p>...loading</p>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (user.providerData[0].providerId === 'password') {
        if (!user?.emailVerified) {
            return (
                <div className="mt-10">
                    <h2 className="text-2xl">Your Email is not verified yet</h2>
                    <h3 className="text-1xl mt-2">Please check your inbox and verify your email</h3>
                    <button className="mt-2 p-2 bg-slate-700 rounded text-white" onClick={async () => {
                        await sendEmailVerification();
                        alert('Sent Email. Please check your inbox');
                    }}>Resend Email Verification Message</button>
                </div>
            )
        }
    }
    return children;
}

export default RequireAuth;