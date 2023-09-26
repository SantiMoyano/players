import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyDataProvider } from "./components/data/MyDataProvider";

// Styles
import "./styles/App.css";
import "./styles/content.css";
import "./styles/players.css";
import "./styles/profile.css";
import "./styles/detailed-player.css";
import "./styles/management.css";
import "./styles/tags.css";
import "./styles/form.css";

// Components
import Header from "./components/static/Header";
import Content from "./components/user/Content";
import Players from "./components/players/Players";
import Profile from "./components/user/Profile";
import DetailedPlayer from "./components/players/DetailedPlayer";
import PlayersManagement from "./components/admin/PlayersManagement";
import CreatePlayer from "./components/admin/CreatePlayer";
import TagsManagement from "./components/admin/TagsManagement";
import Login from "./components/user/Login";
import Footer from "./components/static/Footer";

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

export default App;
