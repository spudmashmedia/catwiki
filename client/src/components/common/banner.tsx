import React, { ReactNode } from "react";

export default function Banner({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col place-content-center ${className}`}>
      <div className="font-extrabold text-8xl">catWiki</div>
      <div className="font-bold text-4xl">The Floofball Compendium</div>
    </div>
  );
}
