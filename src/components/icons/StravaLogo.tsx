interface StravaLogoProps {
  fill?: string;
  height: number;
  width: number;
}

export const StravaLogo: React.FC<StravaLogoProps> = ({
  fill,
  height,
  width,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    fill={fill}
    version="1.1"
    viewBox="0 0 64 64"
  >
    <path
      d="M41.03 47.852l-5.572-10.976h-8.172L41.03 64l13.736-27.124h-8.18"
      fill={fill ?? "#f9b797"}
    />
    <path
      d="M27.898 21.944l7.564 14.928h11.124L27.898 0 9.234 36.876H20.35"
      fill={fill ?? "#f9b797"}
    />
  </svg>
);
