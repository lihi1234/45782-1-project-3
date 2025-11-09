import {  Route, Routes } from "react-router-dom";
import Login from "../../auth/login/Login";
// import Profile from "../../vacations/profile/Profile";
// import Feed from "../../vacations/feed/Feed";
import NotFound from "../not-found/NotFound";
import Signup from "../../auth/signup/Signup";
// import EditPost from "../../vacations/edit/EditPost";

export default function Main() {
    return (
        <Routes>
            {/* <Route path="/" element={<Navigate to="/vacations" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}

                <Route path="/" element={<Login />}/>
                <Route index element={<Login />} />          {/* Default for / */}
                <Route path="signup" element={<Signup />} /> {/* /signup */}

                {/* <Route path="/profile/edit/:id" element={<EditPost />} />
            <Route path="/feed" element={<Feed />} /> */}
                <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
