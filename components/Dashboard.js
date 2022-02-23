import Feed from './Feed';
import Menu from './Menu';

function Dashboard() {
  return (
    <div className='flex'>
      <Menu />
      <Feed />
    </div>
  );
}

export default Dashboard;
