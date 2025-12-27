import { emptyState as s } from "../styles";

export default function EmptyState({ title, text }) {
  return (
    <div style={s.emptyWrap}>
      <h3 style={s.emptyTitle}>{title}</h3>
      <p style={s.emptyText}>{text}</p>
    </div>
  );
}
