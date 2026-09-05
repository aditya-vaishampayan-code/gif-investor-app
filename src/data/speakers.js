// Derives the expected photo filename from a speaker's name (e.g. "Dr John
// Chelladurai" -> "dr-john-chelladurai.jpg") so photos just need to be dropped
// into public/speakers/ with matching names — no per-speaker data wiring needed.
export function speakerPhotoSrc(name) {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `/speakers/${slug}.jpg`
}

// Flattens a session's tracks into one speaker list in programme order, keeping
// the first appearance of anyone billed on more than one track.
export function sessionSpeakers(session) {
  const seen = new Set()
  const out = []
  for (const track of session?.tracks ?? []) {
    for (const speaker of track.speakers ?? []) {
      if (seen.has(speaker.name)) continue
      seen.add(speaker.name)
      out.push(speaker)
    }
  }
  return out
}
