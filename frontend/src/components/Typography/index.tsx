import { createElement, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const typographyVariants = cva([], {
  variants: {
    variant: {
      h1: ["scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"],
      h2: [
        "mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      ],
      h3: ["mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"],
      p: ["leading-7 [&:not(:first-child)]:mt-6"],
      a: ["font-medium text-primary underline underline-offset-4"],
      blockquote: ["mt-6 border-l-2 pl-6 italic"],
      code: [
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      ],
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps extends TypographyVariants {
  children: ReactNode;
  className?: string;
}

export const Typography = ({
  variant,
  children,
  className,
}: TypographyProps) => {
  const classes = twMerge([typographyVariants({ variant }), className]);
  return createElement(variant || "p", { className: classes }, children);
};
