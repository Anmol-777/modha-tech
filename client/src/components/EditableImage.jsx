import { useState, useRef } from "react";
import { useAdmin } from "../context/AdminContext";
import { updateContent, upsertContent, uploadImage } from "../api";

export default function EditableImage({ contentId, section, contentKey, src, alt, style, wrapperStyle, ...props }) {
  const { editMode } = useAdmin();
  const [imageSrc, setImageSrc] = useState(src);
  const [uploading, setUploading] = useState(false);
  const internalId = useRef(contentId);

  if (!editMode) {
    return <img src={imageSrc} alt={alt} style={style} {...props} />;
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file);
      if (internalId.current) {
        await updateContent(internalId.current, result.path);
      } else if (section && contentKey) {
        const created = await upsertContent(section, contentKey, result.path, "image");
        internalId.current = created._id || created.id;
      }
      setImageSrc(result.path);
    } catch {
      //
    } finally {
      setUploading(false);
    }
    e.target.value = "";
  }

  return (
    <div style={{ position: "relative", display: "inline-block", ...wrapperStyle }}>
      <img src={imageSrc} alt={alt} style={style} {...props} />
      <label style={{
        position: "absolute",
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#48663F",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: uploading ? "wait" : "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 10,
        fontSize: 14,
        fontWeight: "bold",
      }} title="Replace image">
        {uploading ? "..." : "✎"}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
