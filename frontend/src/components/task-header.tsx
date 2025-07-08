import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

const TaskListHeader = ({ userEmail }: { userEmail: string }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const displayName = userEmail?.split('@')[0] || '';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-800">Minhas Tarefas</h1>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow"
        >
          Sair
        </button>
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">Olá, {formattedName}</h2>
      </div>
    </>
  );
};

export default TaskListHeader;
