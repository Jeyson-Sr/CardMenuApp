
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  path: string; // 🔥 Se pasa solo el `path` del SVG
}

function Icon ({ size = 24, color = "currentColor", className = "", path }: IconProps)  {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width={size}
      height={size}
      fill={color}
      className={className}
    >
      <path d={path} />
    </svg>
  );
};

export default Icon;
