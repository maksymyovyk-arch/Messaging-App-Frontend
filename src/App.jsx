import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import SettingsSidebar from "./components/Settings/SettingsSidebar";
import FriendsSidebar from "./components/Friends/FriendsSidebar";
import Sidebar from "./components/Sidebar/Sidebar";
import SettingsAccount from "./components/Settings/SettingsAccount";
import SettingsProfile from "./components/Settings/SettingsProfile";
import FriendsOnline from "./components/Friends/FriendsOnline";
import FriendsAll from "./components/Friends/FriendsAll";
import FriendsPending from "./components/Friends/FriendsPending";
import FriendsNew from "./components/Friends/FriendsNew";
import Chat from "./components/Chat/Chat";

// This is hte solutions what I've mentioned at that time.

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="chat/:username" element={<Chat />} />
          <Route path="friends" element={<FriendsSidebar />}>
            <Route index element={<Navigate to="/friends/online" replace={true} />} />
            <Route path="online" element={<FriendsOnline />} />
            <Route path="all" element={<FriendsAll />} />
            <Route path="pending" element={<FriendsPending />} />
            <Route path="new" element={<FriendsNew />} />
          </Route>
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/settings" element={<SettingsSidebar />}>
          <Route index element={<Navigate to="/settings/profile" replace={true} />} />
          <Route path="account" element={<SettingsAccount />} />
          <Route path="profile" element={<SettingsProfile />} />
        </Route>
      </Routes>
    </>
  );
}
