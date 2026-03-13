import * as React from "react"
import { cn } from "@/utils/cn"

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Command({ className, ...props }: CommandProps) {
    return (
        <div
            className={cn(
                "flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground",
                className
            )}
            {...props}
        />
    )
}

export function CommandInput({
    className,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex items-center border-b px-3">
            <input
                className={cn(
                    "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        </div>
    )
}

export function CommandList({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
            {...props}
        />
    )
}

export function CommandEmpty({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("py-6 text-center text-sm", className)} {...props}>
            No results found.
        </div>
    )
}

export function CommandGroup({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("overflow-hidden p-1 text-foreground", className)}
            {...props}
        />
    )
}

export function CommandItem({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                className
            )}
            {...props}
        />
    )
}
