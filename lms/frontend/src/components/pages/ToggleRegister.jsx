import { useState } from "react";
import Register from "./Register";
import StrudentRegister from "./StrudentRegister";


function ToggleRegister() {
    const [isFaculty, setIsFaculty] = useState(true); // Default to Faculty Login

//   const toggleLoginType = () => {
//     setIsFaculty(prevState => !prevState); // Toggle between Faculty and Student
//   };

  // Function to handle switching to Faculty Login
  const switchToFaculty = () => {
    setIsFaculty(true);
  };

  // Function to handle switching to Student Login
  const switchToStudent = () => {
    setIsFaculty(false);
  };

  
  return (
    <div>
        {/* <button onClick={toggleLoginType} className="btn btn-info">
        {isFaculty ? 'Switch to Student Login' : 'Switch to Faculty Login'}
      </button> */}

        {/* Toggle Buttons for Faculty and Student Login */}
        <button  className="btn btn-info"
        onClick={switchToFaculty} 
        disabled={isFaculty} // Disable if currently on Faculty Login
      >
        Switch to Faculty Login
      </button>

      <button  className="btn btn-info"
        onClick={switchToStudent} 
        disabled={!isFaculty} // Disable if currently on Student Login
      >
        Switch to Student Login
      </button>

      {isFaculty ? <Register /> : <StrudentRegister />}
    </div>
  )
}

export default ToggleRegister