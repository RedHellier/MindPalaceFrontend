import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const displayName = (name: string, seperator: string = "%20") => {
    return name
        .split(seperator)
        .reduce((name, currentWord) => {
            return (
                name + " " + currentWord[0].toUpperCase() + currentWord.slice(1)
            );
        }, "")
        .trim();
};