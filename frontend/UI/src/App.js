import React from "react";
import About from "./About";
import Contact from "./Contact";
import Mainform from "./Mainform";
import Userhistory from "./Userhistory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./notfound";
import Error from "./error"


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/Mainform" element={<Mainform />}></Route>
                <Route path="/history" element={<Userhistory />}></Route>
                <Route path="/error" element={<Error />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;