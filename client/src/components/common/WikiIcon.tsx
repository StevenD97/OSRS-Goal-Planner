import { useState } from "react";
import { clsx } from "clsx";
import { wikiFilePath } from "../../lib/wikiIcon";

/**
 * Renders an official OSRS Wiki icon by filename, or nothing at all if the
 * filename is unknown/missing or the image fails to load (e.g. a filename
 * guess that doesn't match the wiki's real title) - callers should never
 * have to special-case a missing icon, the layout just quietly proceeds
 * without one.
 */
export function WikiIcon({
  filename,
  alt,
  size = 20,
  className,
}: {
  filename: string | undefined;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!filename || failed) return null;

  return (
    <img
      src={wikiFilePath(filename)}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={clsx("inline-block flex-none object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
