// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import '../app/globals.css'

interface HomeProps {
  initialTasks: Task[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: false },
  ];

  return { props: { initialTasks } };
};

const Home = ({ initialTasks }: HomeProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      {/* <TaskForm setTasks={setTasks} /> */}
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
export default Home;
