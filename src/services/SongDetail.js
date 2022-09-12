export const createRandomSongView = () => {
  const songView = Math.floor(Math.random() * 100000)
  if (songView > 1000 && songView < 1000000) {
    return songView
  } else {
    createRandomSongView()
  }
}