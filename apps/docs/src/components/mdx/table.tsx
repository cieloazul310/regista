import type { ComponentPropsWithoutRef } from "react";
import { Table as ParkTable } from "../ui/table";

type TableTags = "table" | "thead" | "tbody" | "tr" | "th" | "td";

export default function createTables(): Record<
  TableTags,
  React.FC<Record<string, unknown>>
> {
  return {
    table: (props: ComponentPropsWithoutRef<"table">) => (
      <ParkTable.Root variant="outline" {...props} />
    ),
    thead: (props: ComponentPropsWithoutRef<"thead">) => (
      <ParkTable.Head {...props} />
    ),
    tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
      <ParkTable.Body {...props} />
    ),
    tr: (props: ComponentPropsWithoutRef<"tr">) => <ParkTable.Row {...props} />,
    th: (props: ComponentPropsWithoutRef<"th">) => (
      <ParkTable.Header {...props} />
    ),
    td: (props: ComponentPropsWithoutRef<"td">) => (
      <ParkTable.Cell {...props} />
    ),
  };
}

export function Table(props: ComponentPropsWithoutRef<"table">) {
  return <ParkTable.Root variant="outline" {...props} />;
}

export function Thead(props: ComponentPropsWithoutRef<"thead">) {
  return <ParkTable.Head {...props} />;
}

export function Tbody(props: ComponentPropsWithoutRef<"tbody">) {
  return <ParkTable.Body {...props} />;
}

export function Tr(props: ComponentPropsWithoutRef<"tr">) {
  return <ParkTable.Row {...props} />;
}

export function Th(props: ComponentPropsWithoutRef<"th">) {
  return <ParkTable.Header {...props} />;
}

export function Td(props: ComponentPropsWithoutRef<"td">) {
  return <ParkTable.Cell {...props} />;
}
