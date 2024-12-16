import NextLink from "next/link";
import { forwardRef } from "react";
import { css } from "styled-system/css";
import type { Assign, JsxStyleProps } from "styled-system/types";
import * as StyledTreeView from "../../ui/styled/tree-view";

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

export type TreeViewProps = Assign<JsxStyleProps, StyledTreeView.RootProps>;

export interface TreeViewNode {
  id: string;
  name: string;
  children?: TreeViewNode[];
}

export const TreeView = forwardRef<HTMLDivElement, StyledTreeView.RootProps>(
  (props, ref) => {
    return (
      <StyledTreeView.Root ref={ref} {...props}>
        <StyledTreeView.Tree>
          {/* @ts-expect-error hoge hoge hoge */}
          {props.collection.rootNode.children.map((node, index) => (
            <TreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </StyledTreeView.Tree>
      </StyledTreeView.Root>
    );
  },
);

TreeView.displayName = "TreeViewLink";

const TreeNode = (props: StyledTreeView.NodeProviderProps) => {
  const { node, indexPath } = props;
  return (
    <StyledTreeView.NodeProvider
      key={node.id}
      node={node}
      indexPath={indexPath}
    >
      {node.children ? (
        <StyledTreeView.Branch>
          <StyledTreeView.BranchControl>
            <StyledTreeView.BranchText className={css({ cursor: "pointer" })}>
              {node.name}
            </StyledTreeView.BranchText>
            <StyledTreeView.BranchIndicator>
              <ChevronRightIcon />
            </StyledTreeView.BranchIndicator>
          </StyledTreeView.BranchControl>
          <StyledTreeView.BranchContent>
            <StyledTreeView.BranchIndentGuide />
            {/* @ts-expect-error hoge hoge hoge */}
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
              />
            ))}
          </StyledTreeView.BranchContent>
        </StyledTreeView.Branch>
      ) : (
        <StyledTreeView.Item className={css({ display: "block" })} asChild>
          <NextLink href={node.id}>
            <StyledTreeView.ItemText>{node.name}</StyledTreeView.ItemText>
          </NextLink>
        </StyledTreeView.Item>
      )}
    </StyledTreeView.NodeProvider>
  );
};
