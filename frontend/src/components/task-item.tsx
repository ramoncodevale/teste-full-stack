type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type Props = {
  task: Task;
  isEditing: boolean;
  editTitle: string;
  editDescription: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onEditTitleChange: (value: string) => void;
  onEditDescriptionChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

const TaskItem = ({
  task,
  isEditing,
  editTitle,
  editDescription,
  onEdit,
  onDelete,
  onToggle,
  onEditTitleChange,
  onEditDescriptionChange,
  onSaveEdit,
  onCancelEdit,
}: Props) => (
  <li className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-md transition-all">
    {isEditing ? (
      <>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => onEditTitleChange(e.target.value)}
          className="w-full mb-2 p-3 rounded-md border border-gray-300 text-sm"
        />
        <textarea
          value={editDescription}
          onChange={(e) => onEditDescriptionChange(e.target.value)}
          className="w-full mb-2 p-3 rounded-md border resize-none border-gray-300 text-sm"
        />
        <div className="flex gap-2">
          <button onClick={onSaveEdit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Salvar
          </button>
          <button onClick={onCancelEdit} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm">
            Cancelar
          </button>
        </div>
      </>
    ) : (
      <div className="flex justify-between items-start">
        <div>
          <h2 className={`text-lg font-medium ${task.completed ? 'line-through text-green-600' : ''}`}>{task.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 sm:ml-4">
          <button onClick={onToggle} className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-sm">
            {task.completed ? 'Desfazer' : 'Concluir'}
          </button>
          <button onClick={onEdit} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-md text-sm">
            Editar
          </button>
          <button onClick={onDelete} className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md text-sm">
            Deletar
          </button>
        </div>
      </div>
    )}
  </li>
);

export default TaskItem;
