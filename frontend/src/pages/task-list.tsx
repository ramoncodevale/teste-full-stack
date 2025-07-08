import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api/tasks';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const TaskList = () => {
  const { token, logout, userEmail } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');


  const displayName = userEmail?.split('@')[0] || '';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const fetchTasks = async () => {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  const handleToggleCompleted = async (task: Task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async () => {
    if (editId === null) return;

    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        completed: tasks.find((t) => t.id === editId)?.completed || false,
      }),
    });

    setEditId(null);
    setEditTitle('');
    setEditDescription('');
    fetchTasks();
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditDescription('');
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-gray-800 p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-800">Minhas Tarefas</h1>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow"
        >
          Sair
        </button>
      </div>

        {userEmail && (
        <div className='flex justify-center'>
        <h1 className="text-2xl text-gray-800 font-semibold mt-1">
        Olá, {formattedName}
       </h1>
        </div>
        )}

      <form
        onSubmit={handleCreate}
        className="bg-white p-5 rounded-lg shadow mb-8 space-y-3 border border-gray-200 mt-8"
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow transition-colors"
        >
          Criar Tarefa
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-md transition-all"
          >
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 p-3 rounded-md border border-gray-300 text-sm"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full mb-2 p-3 rounded-md border border-gray-300 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-lg font-medium ${task.completed ? 'line-through text-green-600' : ''}`}>
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => handleToggleCompleted(task)}
                    className="bg-green-100 cursor-pointer hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-sm transition"
                  >
                    {task.completed ? 'Desfazer' : 'Concluir'}
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-100 cursor-pointer hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-md text-sm transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-100 cursor-pointer hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md text-sm transition"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
