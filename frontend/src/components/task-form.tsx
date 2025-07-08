type TaskFormProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const TaskForm = ({ title, description, onTitleChange, onDescriptionChange, onSubmit }: TaskFormProps) => (
  <form
    onSubmit={onSubmit}
    className="bg-white p-5 rounded-lg shadow mb-8 space-y-3 border border-gray-200 mt-8"
  >
    <input
      type="text"
      placeholder="Título da tarefa"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      className="w-full p-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
      required
    />
    <textarea
      placeholder="Descrição da tarefa"
      value={description}
      onChange={(e) => onDescriptionChange(e.target.value)}
      className="w-full p-3 rounded-md border border-gray-300 resize-none text-sm focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow transition-colors"
    >
      Criar Tarefa
    </button>
  </form>
);

export default TaskForm;

