// import { Outlet } from "react-router-dom"
// import Navbar from "./components/navbar/Navbar"

// function App() {
  

//   return (
//     <>
//     <Navbar/>
//     <Outlet/>
      
//     </>
//   )
// }

// export default App


import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      {/* Push content down so it's not hidden under the navbar */}
      <main >
        <Outlet />
      </main>
    </>
  );
}

export default App;

