import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Batch from "./batch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/batch" element={<Batch />} />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import BatchDetails from './BatchDetails';

// function App() {
//   return (
//     <Router>
//       <div className="p-4 text-center">
//         <h1 className="text-3xl font-bold mb-6">Welcome to Ayurveda Supply Chain Viewer</h1>
//       </div>

//       <Routes>
//         {/* Route with batchId as URL param */}
//         <Route path="/:batchId" element={<BatchDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
