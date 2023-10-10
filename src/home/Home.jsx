import { Link } from 'react-router-dom';
import { authActions } from '_store';
import { useSelector, useDispatch } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    
    // only show nav when logged in
    if (!auth) return null;
   
    return (
        <div>
            <h1>Hi </h1>
            <h2>{auth?.firstName}!</h2>
            <button onClick={logout} className="btn btn-primary" >
                    Logout
                </button>
        </div>
    );
}



   