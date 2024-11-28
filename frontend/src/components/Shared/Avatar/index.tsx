import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const avatarVariants = cva(["w-10 h-10"], {
  variants: {
    variant: {
      square: "rounded-lg",
      rounded: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "rounded",
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  url?: string;
  initials?: string;
  className?: string;
}

export const Avatar = ({ variant, url, initials, className }: AvatarProps) => {
  if (!url && initials)
    return (
      <div className={twMerge(avatarVariants({ variant, className }))}>
        {initials}
      </div>
    );
  return (
    <img
      src={url}
      alt="avatar"
      className={twMerge(avatarVariants({ variant, className }))}
    />
  );
};
