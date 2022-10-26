import { Card, Form, Button, Icon, Grid, Confirm } from "semantic-ui-react";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";

import { Task } from "src/types/Task";
import Layout from "src/components/Layout";

export default function NewPage() {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });

  const [openConfirm, setOpenConfirm] = useState(false);

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

  const handleDelete = async (id: string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
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
      <Button type="button" onClick={() => router.push("/")} color="violet">
        <Icon name="arrow left" />
        Back
      </Button>
      <Grid
        centered
        columns={2}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card style={{ width: "100% " }}>
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

                {router.query.id && (
                  <Button
                    type="button"
                    onClick={() => setOpenConfirm(true)}
                    color="red"
                  >
                    <Icon name="trash" />
                    Delete
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>

      <Confirm
        header="Delete a task"
        content={`Are you sure you want to delete this task ${router.query.id}?`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
}
