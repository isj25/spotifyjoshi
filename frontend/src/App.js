import Home from "./Screens/Home";
import {Routes, Route} from 'react-router-dom'
import LoginScreen from "./Screens/LoginScreen";
import Artist from "./Screens/Artist";
import Album from "./Screens/Album";
import Genre from "./Screens/Genre";
import Tracks from "./Screens/Tracks";
import Tracks2 from "./Screens/Tracks2";
import Playlist from "./Screens/Playlist";
import Recommendation from "./Screens/Recommendation";


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
          <Route path="/artist:name" element={<Artist></Artist>}></Route>
          <Route path="/album:album" element={<Album></Album>}></Route>
          <Route path="/genre:type" element={<Genre></Genre>}></Route>
          <Route path="/tracks:id/type:name" element={<Tracks></Tracks>}></Route>
          <Route path="/tracks:id/artists" element={<Tracks2></Tracks2>}></Route>
          <Route path="/playlist" element={<Playlist></Playlist>}></Route>
          <Route path='/recommendation' element={<Recommendation></Recommendation>}></Route>
      </Routes>
        
    </div>
  );
}
export default App;
