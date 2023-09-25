import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyDataProvider } from "./MyDataProvider";

// Styles
import "./styles/App.css";
import "./styles/content.css";
import "./styles/players.css";
import "./styles/profile.css";
import "./styles/detailed-player.css";
import "./styles/management.css";
import "./styles/create-player.css";
import "./styles/tags.css";
import "./styles/login.css";

// Components
import Header from "./components/user/Header";
import Content from "./components/user/Content";
import Players from "./components/user/Players";
import Profile from "./components/user/Profile";
import DetailedPlayer from "./components/user/DetailedPlayer";
import PlayersManagement from "./components/admin/PlayersManagement";
import CreatePlayer from "./components/admin/CreatePlayer";
import TagsManagement from "./components/admin/TagsManagement";
import Login from "./components/user/Login";

function App() {
  return (
    <Router>
      <MyDataProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" exact element={<Content />} />
            <Route path="/players" element={<Players showFilter={true} />} />
            <Route path="/players/:id" element={<DetailedPlayer />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/management" element={<PlayersManagement />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/create-player/:id" element={<CreatePlayer />} />
            <Route path="/tags-management" element={<TagsManagement />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </MyDataProvider>
    </Router>
  );
}

function Footer() {
  return (
    <footer>
      <span>COPYRIGHT SANTI</span>
    </footer>
  );
}

export default App;
