import type { FC, ComponentProps } from "react";

interface TypographyProps extends ComponentProps<"p"> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "lead"
    | "large"
    | "small"
    | "muted";
}
const TypographyH1: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <h1
    className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    {...props}
  >
    {children}
  </h1>
);

const TypographyH2: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <h2
    className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

const TypographyH3: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <h3
    className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const TypographyH4: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <h4
    className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h4>
);

const TypographyP: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`leading-7 ${className}`} {...props}>
    {children}
  </p>
);

const TypographyLead: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`text-xl text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const TypographyLarge: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </div>
);

const TypographySmall: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <small className={`text-sm font-medium leading-none ${className}`} {...props}>
    {children}
  </small>
);

const TypographyMuted: FC<TypographyProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const Typography: FC<TypographyProps> = ({
  children,
  variant = "p",
  ...props
}) => {
  // chose component based on variant
  switch (variant) {
    case "h1":
      return <TypographyH1 {...props}>{children}</TypographyH1>;
    case "h2":
      return <TypographyH2 {...props}>{children}</TypographyH2>;
    case "h3":
      return <TypographyH3 {...props}>{children}</TypographyH3>;
    case "h4":
      return <TypographyH4 {...props}>{children}</TypographyH4>;
    case "p":
      return <TypographyP {...props}>{children}</TypographyP>;
    case "lead":
      return <TypographyLead {...props}>{children}</TypographyLead>;
    case "large":
      return <TypographyLarge {...props}>{children}</TypographyLarge>;
    case "small":
      return <TypographySmall {...props}>{children}</TypographySmall>;
    case "muted":
      return <TypographyMuted {...props}>{children}</TypographyMuted>;
    default:
      return <TypographyP {...props}>{children}</TypographyP>;
  }
};

export default Typography;
