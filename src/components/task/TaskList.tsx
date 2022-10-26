import { Card } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Task } from "src/types/Task";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  const router = useRouter();

  return (
    <Card.Group itemsPerRow={3}>
      {tasks.map((task) => {
        return (
          <Card
            key={task.id}
            onClick={() => router.push(`/tasks/edit/${task.id}`)}
          >
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              {task.created_on && (
                <Card.Meta>
                  {new Date(task.created_on).toLocaleDateString()}
                </Card.Meta>
              )}
              <Card.Description>{task.description}</Card.Description>
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}
