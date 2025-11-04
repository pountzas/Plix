import Feed from "./Feed";
import Menu from "./Menu";
import MediaItem from "./MediaItem";
import { useMediaStore } from "../stores/mediaStore";

function Dashboard() {
  const { mediaItemActive } = useMediaStore();
  return (
    <div className=" flex flex-row">
      <Menu />
      {!mediaItemActive ? <Feed /> : <MediaItem />}
    </div>
  );
}

export default Dashboard;
