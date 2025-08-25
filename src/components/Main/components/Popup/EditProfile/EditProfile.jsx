
import { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';



export default function EditProfile(props) {

  const { onSubmit } = props;

  const {currentUser} = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    setName(currentUser?.name || "");
    setJob(currentUser?.about || "");
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleJobChange = (event) => {
    setJob(event.target.value); 
  };

  return (
    <form className="popup__form" required>
      <input type="text" value={name} placeholder="Nombre" className="popup__input" id="input-name" name="name" minlength="2" maxlength="40" required onChange={handleNameChange}/>
      <span className="popup__error" id="input-name-error"></span>
      <input type="text" value={job} placeholder="Profesión" className="popup__input" id="input-job" name="job" minlength="2" maxlength="200" required onChange={handleJobChange}/>
      <span className="popup__error" id="input-job-error"></span>
      <button type="submit" className="popup__button" id="popupU__btn">Guardar</button>
    </form>
  )
}