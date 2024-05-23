import { ark } from "@ark-ui/react";
import { styled } from "styled-system/jsx";

export const TableHeadCell = styled(ark.th, {
  base: {
    px: 2,
    py: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "sm",
    lineHeight: 1.2,
    minWidth: "6em",
    bg: "bg.default",
    position: "sticky",
    top: 0,
    left: { base: undefined, _first: 0 },
    zIndex: { base: 2, _first: 3 },
  },
});

export const TableBodyHeadCell = styled(ark.th, {
  base: {
    px: 2,
    py: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "sm",
    lineHeight: 1.2,
    minWidth: "6em",
    position: "sticky",
    bg: { base: undefined, _first: "bg.default" },
    left: { base: undefined, _first: 0 },
    zIndex: { base: 1, _first: 2 },
    borderRightColor: "accent.4",
    borderRightWidth: "1px",
  },
});

export const TableBodyCell = styled(ark.td, {
  base: {
    px: 2,
    py: 1,
    textAlign: "right",
    fontFamily: "Arial, sans-serif",
    zIndex: 0,
    borderRightColor: "accent.4",
    borderRightWidth: "1px",
  },
  variants: {
    emphasized: {
      true: {
        fontWeight: "bold",
      },
    },
    bgEmphasized: {
      true: {
        bg: "accent.a2",
      },
    },
  },
  defaultVariants: {
    emphasized: false,
    bgEmphasized: false,
  },
});
