import { Task } from "src/types/Task";

type Props = {
  tasks: Task[];
};

export default function Index({ tasks }: Props) {
  if (tasks.length === 0)
    return (
      <>
        <h1>No tasks</h1>
      </>
    );

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map((item) => {
        return <>{item.title}</>;
      })}
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  console.log(tasks);
  return {
    props: { tasks },
  };
};
