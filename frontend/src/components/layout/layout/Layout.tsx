
import { useContext } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import './Layout.css';
import Login from '../../auth/login/Login';
import Signup from '../../auth/signup/Signup';
import AuthContext from '../../auth/auth/AuthContext';
import { Routes, Route, Navigate } from "react-router-dom";

export default function Layout() {
    const authContext = useContext(AuthContext);
    const isLoggedIn = !!authContext?.jwt;

    return (
        <div className='Layout'>

            <header>
                {isLoggedIn && <Header />}
            </header>

            <main>
                <Routes>
                    
                    {/* דפים ללא התחברות */}
                    {!isLoggedIn && <>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>}

                    {/* דפים שמחייבים התחברות */}
                    {isLoggedIn && (
                        <Route path="/*" element={<Main />} />
                    )}

                </Routes>
            </main>

            <footer>
                {isLoggedIn && <Footer />}
            </footer>

        </div>
    );
}




// import { useContext } from 'react';
// // import Followers from '../../follows/followers/Followers';
// // import Following from '../../follows/following/Following';
// import Footer from '../footer/Footer';
// import Header from '../header/Header';
// import Main from '../main/Main';
// import './Layout.css';
// import Login from '../../auth/login/Login';
// import AuthContext from '../../auth/auth/AuthContext';
// import Signup from '../../auth/signup/Signup';
// import { Routes, Route } from "react-router-dom";
// // import VacationsPage from "../../vacations-page/vacationsPage";


// export default function Layout() {


//     const authContext = useContext(AuthContext);

//     const isLoggedIn = !!authContext?.jwt;



//     return (
//         <div className='Layout'>

//             <Routes>
//                 {!isLoggedIn && <Route path='/' element={<Login />} />}
//                 {/* <Route path="/" element={<VacationsPage />} /> */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />   {/* <-- THIS MUST BE HERE */}
//             </Routes>

//             {isLoggedIn && <>
//                 <header>
//                     <Header />
//                 </header>
//                 <main>
//                     <Main />
//                 </main>
//                 <footer>
//                     <Footer />
//                 </footer>
//             </>}

//             {/* {!isLoggedIn && <Login />} */}
//         </div>
//     );
// }