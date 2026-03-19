import { AppProvider } from './store/AppContext';
import MapView from './components/MapView';
import FilterBar from './components/FilterBar';
import BottomBar from './components/BottomBar';
import GuestBanner from './components/GuestBanner';
import LoginModal from './components/LoginModal';
import PostTaskForm from './components/PostTaskForm';
import SkillOnboard from './components/SkillOnboard';
import TaskDetail from './components/TaskDetail';
import TaskListPanel from './components/TaskListPanel';
import ProfilePanel from './components/ProfilePanel';
import Notification from './components/Notification';

function AppContent() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Full-screen map base layer */}
      <MapView />

      {/* Overlays */}
      <FilterBar />
      <GuestBanner />
      <BottomBar />

      {/* Full-screen panels (slide over map) */}
      <TaskListPanel />
      <ProfilePanel />

      {/* Modals */}
      <LoginModal />
      <PostTaskForm />
      <SkillOnboard />
      <TaskDetail />

      {/* Notification toast */}
      <Notification />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
