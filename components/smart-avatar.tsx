// components/SmartAvatar.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getFallbackBgClassFromKey } from "@/lib/getFallbackBgClassFromKey";
import { extractFirstLetters } from "@/lib/text";
import { cn } from "@/lib/utils";

interface SmartAvatarProps<T> {
  data: T | undefined;
  src?: string;
  alt?: string;
  className?: string;
  getKey: (data: T) => string | undefined;
  getName?: (data: T) => string; // shown beside avatar
  getInitialsName?: (data: T) => string; // used for fallback initials
  showName?: boolean;
  nameClassName?: string;
  fallbackTextClassName?: string;
  avatarSizeClassName?: string;
}

export function SmartAvatar<T>({
  data,
  src,
  alt = "avatar",
  className,
  getKey,
  getName = (d) => (d as any)?.firstName + " " + (d as any)?.lastName,
  getInitialsName = (d) => (d as any)?.firstName + " " + (d as any)?.lastName,
  showName = false,
  nameClassName,
  fallbackTextClassName,
  avatarSizeClassName,
}: SmartAvatarProps<T>) {
  const key = data ? getKey(data) : undefined;
  const displayName = data ? getName(data) : "";
  const initials = data ? extractFirstLetters(getInitialsName(data), 2) : "";
  const fallbackBgClass = getFallbackBgClassFromKey(key);

  const avatarElement = (
    <Avatar className={cn("shrink-0", avatarSizeClassName)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback
        className={cn(
          "text-white font-semibold",
          fallbackBgClass,
          fallbackTextClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  if (!showName) return avatarElement;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {avatarElement}
      <span
        className={cn("text-sm font-medium text-foreground", nameClassName)}
      >
        {displayName}
      </span>
    </div>
  );
}
