export default function GuardianLogo() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>

      {/* Shield with G */}
      <g filter="url(#glow)">
        <path
          d="M20 2 C10 2, 2 10, 2 20 C2 30, 10 38, 20 38 C30 38, 38 30, 38 20 C38 10, 30 2, 20 2 Z M20 6 C24.4183 6 28 9.58172 28 14 L28 17 L22 17 L22 15 L26 15 C25.4463 11.9531 22.9531 10 20 10 C16.6863 10 14 12.6863 14 16 L14 24 C14 27.3137 16.6863 30 20 30 C22.9531 30 25.4463 27.0469 26 24 L22 24 L22 22 L28 22 L28 26 C28 30.4183 24.4183 34 20 34 C15.5817 34 12 30.4183 12 26 L12 14 C12 9.58172 15.5817 6 20 6 Z"
          fill="url(#logo-gradient)"
        />
      </g>

      {/* Text */}
      <text
        x="48"
        y="26"
        fontFamily="Orbitron, sans-serif"
        fontSize="22"
        fill="hsl(var(--foreground))"
        className="font-headline"
      >
        Guardian
      </text>

    </svg>
  );
}
