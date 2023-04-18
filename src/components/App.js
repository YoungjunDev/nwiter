import React, {useState} from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";

function App() {
  // console.log(auth.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
      <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>
  );
}

export default App;
