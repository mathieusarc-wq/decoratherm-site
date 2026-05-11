type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

// Placeholder horizontal logo (Qualibat RGE + drapeau français).
// Replace with /public/logo.png when client provides it.
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const ink = variant === "dark" ? "#1a2f4f" : "#ffffff";
  const pillFill = variant === "dark" ? "#1a2f4f" : "#ffffff";
  const pillText = variant === "dark" ? "#ffffff" : "#1a2f4f";
  const flagBorder = variant === "dark" ? "#d4d8e0" : "rgba(255,255,255,0.4)";

  return (
    <svg
      viewBox="0 0 320 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="DECORATHERM — Qualibat RGE"
    >
      {/* Wordmark */}
      <text
        x="0"
        y="28"
        fontFamily="var(--font-jakarta), sans-serif"
        fontWeight={800}
        fontSize={26}
        letterSpacing="-0.8"
        fill={ink}
      >
        DECORATHERM
      </text>

      {/* Red signature bar */}
      <rect x="0" y="36" width="56" height="2" fill="#c8102e" />

      {/* Qualibat RGE pill */}
      <g transform="translate(0,46)">
        <rect width="116" height="16" rx="1" fill={pillFill} />
        <text
          x="58"
          y="11.5"
          textAnchor="middle"
          fontFamily="var(--font-jakarta), sans-serif"
          fontWeight={700}
          fontSize={9}
          letterSpacing="1.4"
          fill={pillText}
        >
          QUALIBAT RGE
        </text>
      </g>

      {/* French flag */}
      <g transform="translate(126,46)">
        <rect x="0" y="0" width="8" height="16" fill="#0055A4" />
        <rect x="8" y="0" width="8" height="16" fill="#ffffff" stroke={flagBorder} strokeWidth={0.5} />
        <rect x="16" y="0" width="8" height="16" fill="#EF4135" />
      </g>
    </svg>
  );
}
