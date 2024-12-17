import type { PropsWithChildren } from "react";
import { Tabs as ParkTabs } from "../ui/tabs";

export default function Tabs({
  children,
  options,
  ...props
}: PropsWithChildren<
  ParkTabs.RootProps & { options: { id: string; label: string }[] }
>) {
  return (
    <ParkTabs.Root {...props}>
      <ParkTabs.List>
        {options.map((option) => (
          <ParkTabs.Trigger key={option.id} value={option.id}>
            {option.label}
          </ParkTabs.Trigger>
        ))}
        <ParkTabs.Indicator />
      </ParkTabs.List>
      {children}
    </ParkTabs.Root>
  );
}
