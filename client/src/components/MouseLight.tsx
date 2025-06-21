import { useMousePosition } from '@/hooks/useMousePosition';

interface MouseLightProps {
  intensity?: number;
  size?: number;
}

export default function MouseLight({ intensity = 0.15, size = 600 }: MouseLightProps) {
  const { x, y } = useMousePosition();

  return (
    <div
      className="mouse-light"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(59, 130, 246, ${intensity}) 0%, rgba(59, 130, 246, ${intensity * 0.3}) 30%, transparent 70%)`,
      }}
    />
  );
}