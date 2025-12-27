import { productCardSkeleton as s } from "../styles";

export default function ProductCardSkeleton() {
  return (
    <div style={s.card}>
      <div style={s.skelImage} />

      <div style={s.skelBody}>
        <div style={s.skelLineLg} />
        <div style={s.skelLineSm} />
        <div style={s.skelBtn} />
      </div>
    </div>
  );
}
