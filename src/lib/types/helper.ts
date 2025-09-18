import type {
  HTMLAttributes,
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react";

export type ValidTag = keyof React.JSX.IntrinsicElements;

export type CustomTag<T extends ValidTag> = PropsWithChildren<
  {
    tag?: T | ValidTag;
  } & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>)
>;

export type APIResponse<T = unknown> = T | { message: string };

export type PropsForViews<T = unknown> = T & { slug: string } & {
  increment?: boolean;
};
