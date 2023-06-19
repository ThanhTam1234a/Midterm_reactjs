import './App.css';
import {Routesweb} from '../src/component/Routesweb';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const renderPages = () => {
    return Routesweb.map((page) => (
      <Route
        key={page.path}
        path={page.path}
        element={page.element}
        index={page.index}
      />
    ))
  }

  return (
    <Router>
      <Routes>
        {renderPages()}
      </Routes>
    </Router>
    // <ShowProductmid></ShowProductmid>
  );
}

export default App;
