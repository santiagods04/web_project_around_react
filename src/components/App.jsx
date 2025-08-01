import React, { useState, useEffect } from "react";
import api from "../utils/Api";  
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.getInfoUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error("Error cargando usuario:", err));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
