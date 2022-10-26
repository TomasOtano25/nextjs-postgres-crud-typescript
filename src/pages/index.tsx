import { Grid, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Task } from "src/types/Task";
import TaskList from "src/components/task/TaskList";

type Props = {
  tasks: Task[];
};

export default function Index({ tasks }: Props) {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        columns={3}
        centered
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Row>
          <Grid.Column width={9} textAlign="center">
            <h1> No tasks yet</h1>
            <Button primary={true} onClick={() => router.push("/tasks/new")}>
              Create one task
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
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
