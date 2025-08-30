export default function Spinner({ size = "medium", className = "" }) {
  const sizeClasses = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-20 h-20",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200`}
        style={{
          borderTopColor: "#9333ea",
          borderRightColor: "#2563eb",
        }}
      ></div>
    </div>
  );
}
