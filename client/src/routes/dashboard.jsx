import { Outlet } from 'react-router-dom';
import Sidebar from '../components/slidebar';

export default function Dashboard() {
  return (
    <div>
        <div>
            <Sidebar />
        </div>
        <div>
           <Outlet />
        </div>
    </div>
  )
}
