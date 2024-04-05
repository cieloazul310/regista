import { LuX, LuMenu } from "react-icons/lu";
import { css } from "styled-system/css";
import { ColorModeHandler } from "../client";
import { Button, IconButton, Drawer as ParkDrawer } from "../ui";
import Menu from "./menu";

function DrawerServer(props: ParkDrawer.RootProps) {
  return (
    <ParkDrawer.Root {...props}>
      <ParkDrawer.Trigger asChild>
        <IconButton
          className={css({
            position: "fixed",
            bottom: 4,
            right: 4,
            zIndex: "banner",
            shadow: "lg",
          })}
          size="xl"
        >
          <LuMenu />
        </IconButton>
      </ParkDrawer.Trigger>
      <ParkDrawer.Backdrop />
      <ParkDrawer.Positioner>
        <ParkDrawer.Content>
          <ParkDrawer.Header>
            <ParkDrawer.Title>Regista</ParkDrawer.Title>
            <ParkDrawer.Description>
              for Next.js App Router
            </ParkDrawer.Description>
            <ParkDrawer.CloseTrigger
              asChild
              position="absolute"
              top="3"
              right="4"
            >
              <IconButton variant="ghost">
                <LuX />
              </IconButton>
            </ParkDrawer.CloseTrigger>
          </ParkDrawer.Header>
          <ParkDrawer.Body>
            <Menu />
          </ParkDrawer.Body>
          <ParkDrawer.Footer gap="3">
            <ColorModeHandler />
            <ParkDrawer.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </ParkDrawer.CloseTrigger>
          </ParkDrawer.Footer>
        </ParkDrawer.Content>
      </ParkDrawer.Positioner>
    </ParkDrawer.Root>
  );
}

export default DrawerServer;