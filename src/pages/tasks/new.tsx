import { Card, Form, Button, Icon } from "semantic-ui-react";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
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

  const updateTask = async (id: string, task: Task) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        await updateTask(router.query.id, task);
      } else {
        await createTask(task);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loadTask = async (id: string): Promise<Task> => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    return task;
  };

  useEffect(() => {
    async function main() {
      if (typeof router.query.id === "string") {
        const task = await loadTask(router.query.id);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    }
    main();
  }, [router.query]);

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
                value={task.title}
              />
            </Form.Field>

            <Form.Field>
              <label htmlFor="titles">Title:</label>
              <textarea
                name="description"
                rows={2}
                placeholder="Write a description"
                onChange={handleChange}
                value={task.description}
              ></textarea>
            </Form.Field>

            {router.query.id ? (
              <Button color="teal">
                <Icon name="save" />
                Update
              </Button>
            ) : (
              <Button primary>
                <Icon name="save" />
                Save
              </Button>
            )}

            <Button type="button" onClick={() => router.push("/")} color="red">
              <Icon name="cancel" />
              Cancel
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Layout>
  );
}
