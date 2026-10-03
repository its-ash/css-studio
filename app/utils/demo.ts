/** Fixed Picsum photos (verified subjects) so alt text stays accurate in previews and exported HTML. */
export const PHOTOS = {
  fjord: { id: 1015, alt: 'Blue fjord between rocky cliffs' },
  pug: { id: 1025, alt: 'Pug wrapped in a plaid blanket in a forest' },
  portrait: { id: 1027, alt: 'Portrait of a woman with red lipstick' },
  waterfall: { id: 1035, alt: 'Person in front of a waterfall with a rainbow' },
  valley: { id: 1043, alt: 'Granite cliffs above a pine forest and river' },
  city: { id: 1067, alt: 'City skyline at sunset by a lake' },
  lioness: { id: 1074, alt: 'Lioness looking at the camera' },
  strawberries: { id: 1080, alt: 'Crate of fresh strawberries' }
} as const

export type PhotoKey = keyof typeof PHOTOS

export const PHOTO_OPTIONS: { value: PhotoKey; label: string }[] = [
  { value: 'fjord', label: 'Fjord' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'city', label: 'City' },
  { value: 'strawberries', label: 'Food' },
  { value: 'pug', label: 'Pug' },
  { value: 'lioness', label: 'Lioness' },
  { value: 'waterfall', label: 'Waterfall' },
  { value: 'valley', label: 'Valley' }
]

export const photoUrl = (key: PhotoKey, w = 960, h = 640) => `https://picsum.photos/id/${(PHOTOS[key] ?? PHOTOS.fjord).id}/${w}/${h}`

export const photoAlt = (key: PhotoKey) => (PHOTOS[key] ?? PHOTOS.fjord).alt

/** Shared sizing for exported "surface" generators so pasted code is visible without a wrapper. */
export const SURFACE_SIZE = ['  width: 100%;', '  min-height: 20rem;']
