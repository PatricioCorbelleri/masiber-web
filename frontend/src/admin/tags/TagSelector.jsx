import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { tagSelectorStyles as s } from "../../styles";

export default function TagSelector({ value = [], onChange }) {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    cargarTags();
  }, []);

  const cargarTags = async () => {
    const res = await api.get("/tags");
    setTags(res.data || []);
  };

  const addTag = (name) => {
    if (value.includes(name)) return;
    onChange([...value, name]);
    setInput("");
    setOpen(false);
  };

  const removeTag = (name) => {
    onChange(value.filter((t) => t !== name));
  };

  const filtered = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(t.name)
  );

  return (
    <div style={s.wrapper}>
      <div style={s.selectedBox}>
        {value.map((t) => (
          <span key={t} style={s.tag}>
            {t}
            <button
              type="button"
              style={s.removeBtn}
              onClick={() => removeTag(t)}
            >
              ×
            </button>
          </span>
        ))}

        <input
          style={s.input}
          placeholder="Agregar tag…"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && filtered.length > 0 && (
        <div style={s.dropdown}>
          {filtered.map((t) => (
            <div
              key={t.id}
              style={{
                ...s.option,
                ...(hovered === t.id ? s.optionHover : {}),
              }}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => addTag(t.name)}
            >
              {t.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
