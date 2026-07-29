import {useEffect, useState} from 'react';

type Priority = "Urgente" | "Moyenne" | "Basse";
type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne")
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Priority | "Tous">("Tous")
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function addtodo() {
    if(input.trim()==""){
      return
    }
    const newTodo: Todo = {
      id: Date.now(),
      text:input.trim(),
      priority: priority
    }
    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")
    console.log(newTodos)
  }
  let filteredTodos = todos;
  if (filter !== "Tous") {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }
  return (
   <div className="flex justify-center">
    <div className="w-1/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
      <div className="flex gap-4">
        <input type="text" className="input w-full" placeholder="Ajouter une tâche..." value={input} onChange={(e) => setInput(e.target.value)}/>
        <select className="select w-full" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option>Urgente</option>
          <option>Moyenne</option>
          <option>Basse</option>
        </select>
        <button onClick={addtodo} className="btn btn-primary">Ajouter</button>
      </div>  
      <div className="flex gap-4">
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter==="Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}>
              Tous
            </button>
          </div>
        </div>
    </div>
   </div>
  )
}

export default App
