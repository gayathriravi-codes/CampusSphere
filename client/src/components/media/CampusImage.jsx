export default function CampusImage({
  image,
  sizes = '100vw',
  className = '',
  priority = false,
}) {
  const srcSet = image.webpSmall
    ? `${image.webpSmall} ${image.smallWidth}w, ${image.webp} ${image.width}w`
    : undefined

  return (
    <picture className={`campus-image ${className}`.trim()}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={image.jpg}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
