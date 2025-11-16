import { Route, Routes } from "react-router-dom";
// import Login from "../../auth/login/Login";
// import Profile from "../../vacations/profile/Profile";
// import Feed from "../../vacations/feed/Feed";
import NotFound from "../not-found/NotFound";
import Signup from "../../auth/signup/Signup";
import VacationsPage from "../../vacations-page/vacationsPage";
import EditVacation from "../../edit/EditVacation";
import NewVacation from "../../new/NewVacation";
import Report from "../../report/Report";
// import EditPost from "../../vacations/edit/EditPost";

export default function Main() {
    return (
        <Routes>

            <Route path="/" element={<VacationsPage />} />
            <Route path="/vacations" element={<VacationsPage />} />
            <Route path="/vacations/edit/:id" element={<EditVacation />} />
            <Route path="/new-vacation" element={<NewVacation />} />
            <Route path="/report" element={< Report/>} />
            <Route path="/signup" element={<Signup />} /> {/* /signup */}

            {/* <Route path="/profile/edit/:id" element={<EditPost />} />
            <Route path="/feed" element={<Feed />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
