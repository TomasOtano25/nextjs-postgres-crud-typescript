import { Task } from "src/types/Task";

type Props = {
  tasks: Task[];
};

export default function Index({ tasks }: Props) {
  if (tasks.length === 0) return <h1>No tasks</h1>;

  return <h1></h1>;
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/api/tasks");
  const tasks: Task[] = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
