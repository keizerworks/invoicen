import * as React from "react";
import { cn } from "lib/utils";
import { Eye, EyeClosed } from "lucide-react";

import type { InputProps } from "./input";
import { Button } from "./button";
import { Input } from "./input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 z-20 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.disabled}
        >
          {showPassword && !props.disabled ? (
            <Eye className="size-4" aria-hidden />
          ) : (
            <EyeClosed className="size-4" aria-hidden />
          )}

          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
