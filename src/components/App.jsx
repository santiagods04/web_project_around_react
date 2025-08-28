import React, { useState, useEffect } from "react";
import api from "../utils/Api";  
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.getInfoUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error("Error cargando usuario:", err));
  }, []);

  const handleOpenPopup = (popup) => setPopup(popup);
  const handleClosePopup = () => setPopup(null);

   const handleUpdateUser = (data) => {
      (async () => {
        await api.updateUserInfo(data).then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        });
      })();
    };
  
  const handleUpdateAvatar = (avatarUrl) => {
      (async () => {
        await api.updateAvatar(avatarUrl).then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        });
      })();
  };  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
        <Header />
        <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup}/>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
