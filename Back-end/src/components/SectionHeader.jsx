export default function SectionHeader({ tag, tagIcon, title, description }) {
  return (
    <div className="section-header">
      {tag && (
        <span className="section-tag">
          {tagIcon && <i className={tagIcon}></i>}
          {tag}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
