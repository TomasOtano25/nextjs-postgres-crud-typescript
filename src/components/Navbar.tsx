import { Menu, Container, Button, Icon } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
          <Image
            src="https://react.semantic-ui.com/logo.png"
            width={30}
            height={30}
            alt="logo"
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button secondary onClick={() => router.push("/tasks/new")}>
              <Icon name="plus" />
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
