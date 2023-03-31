import React, { ReactNode } from "react";
import Logo from "../logo";

export default function Banner({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-row">
      <Logo className="w-32 h-32 mr-4" />
      <div className={`flex flex-col place-content-center ${className}`}>
        <div className="font-extrabold text-8xl">catWiki</div>
        <div className="font-bold text-4xl">The Floofball Compendium</div>
      </div>
    </div>
  );
}
