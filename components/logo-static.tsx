export function Logo({ size = 32 }: { size?: number }) {
  // Primary color that matches our theme
  const primaryColor = "#3b82f6" // This is tailwind's blue-500
  const backgroundColor = "white"

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main circle */}
      <circle cx="20" cy="20" r="20" fill={`${primaryColor}CC`} />

      {/* Inner circle */}
      <circle cx="20" cy="20" r="14" fill={backgroundColor} fillOpacity="0.9" />

      {/* Q shape */}
      <circle cx="20" cy="20" r="10" stroke={primaryColor} strokeWidth="3" />
      <circle cx="20" cy="20" r="6" fill={primaryColor} />
      <rect
        x="24"
        y="24"
        width="10"
        height="10"
        fill={backgroundColor}
        fillOpacity="0.9"
        transform="rotate(45 24 24)"
      />

      {/* Highlight */}
      <circle cx="14" cy="14" r="4" fill="white" fillOpacity="0.3" />
    </svg>
  )
}
