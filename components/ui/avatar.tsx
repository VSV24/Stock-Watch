"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Wraps Radix's Avatar.Root to render a consistently styled avatar container.
 *
 * @param className - Additional CSS class names appended to the default avatar classes
 * @returns A React element for the avatar root with baseline sizing, rounded shape, and merged class names; all other Avatar.Root props are forwarded
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an avatar image element with consistent sizing and a `data-slot` attribute.
 *
 * @param className - Additional class names to merge with the default avatar image styles
 * @returns A React element representing the avatar image area
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders the avatar fallback content used when the avatar image is unavailable.
 *
 * The rendered element is marked with `data-slot="avatar-fallback"` and applies
 * default sizing and centered fallback styling; any `className` passed in is merged.
 *
 * @returns The rendered AvatarPrimitive.Fallback element for fallback/default avatar content.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }