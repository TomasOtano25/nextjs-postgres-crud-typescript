import { Card, Form, Button, Icon } from "semantic-ui-react";
import { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { Task } from "src/types/Task";
import Layout from "src/components/Layout";

export default function NewPage() {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setTask({ ...task, [name]: value });
  };

  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createTask(task);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Card>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="titles">Title:</label>
              <input
                type="text"
                placeholder="Write your title"
                name="title"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label htmlFor="titles">Title:</label>
              <textarea
                name="description"
                rows={2}
                placeholder="Write a description"
                onChange={handleChange}
              ></textarea>
            </Form.Field>

            <Button type="submit" primary={true}>
              <Icon name="save" />
              Save
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Layout>
  );
}
