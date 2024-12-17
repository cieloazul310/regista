import NextLink from "next/link";
import { useCollapsible } from "@ark-ui/react/collapsible";
import { cva } from "styled-system/css";
import { VStack } from "styled-system/jsx";
import { Collapsible } from "../../ui/collapsible";
import { Button, type ButtonProps } from "../../ui/button";

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>Chevron Right Icon</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m9 18l6-6l-6-6"
      />
    </svg>
  );
}

const indicatorRecipe = cva({
  base: {
    transition: "transform",
  },
  variants: {
    open: {
      true: {
        transform: "rotate(90deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});

function CollapsibleIndicator({ open }: { open: boolean }) {
  return (
    <span className={indicatorRecipe({ open })}>
      <ChevronRightIcon />
    </span>
  );
}

export type MenuItemNode = {
  id: string;
  name: string;
};

export type MenuGroupNode = MenuItemNode & {
  children?: MenuItemNode[];
};

export type MenuItemProps = MenuItemNode & ButtonProps;

export function MenuItem({ id, name, ...props }: MenuItemProps) {
  return (
    <Button
      variant="ghost"
      colorPalette="current"
      width="full"
      justifyContent="start"
      asChild
      {...props}
    >
      <NextLink href={id}>{name}</NextLink>
    </Button>
  );
}

export type MenuGroupProps = MenuGroupNode & {
  current: string;
};

export function MenuGroup({ id, name, children, current }: MenuGroupProps) {
  const parent = current.replace(/\/[\w,-]*$/, "");
  const defaultOpen = parent === id;
  const collapsible = useCollapsible({ defaultOpen });

  if (!children) return <MenuItem id={id} name={name} />;
  return (
    <Collapsible.RootProvider value={collapsible}>
      <Collapsible.Trigger asChild>
        <Button variant="ghost" width="full" justifyContent="space-between">
          {name}
          <CollapsibleIndicator open={collapsible.open} />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <VStack alignItems="stretch" width="full" gap="xs" pl="sm">
          {children.map((node) => (
            <MenuItem
              key={node.id}
              aria-selected={node.id === current}
              {...node}
            />
          ))}
        </VStack>
      </Collapsible.Content>
    </Collapsible.RootProvider>
  );
}

export type MenuContainerProps = {
  nodes: MenuGroupNode[];
  current: string;
};

function MenuContainer({ nodes, current }: MenuContainerProps) {
  return (
    <VStack alignItems="stretch" width="full" gap="md">
      {nodes.map((node) => (
        <MenuGroup key={node.id} current={current} {...node} />
      ))}
    </VStack>
  );
}

export default MenuContainer;
