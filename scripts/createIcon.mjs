import sharp from 'sharp'

const sizes = [16, 24, 32, 48, 64, 128, 180, 256]
const files = ['favicon']

;(async () => {
  for (const file of files) {
    for (const size of sizes) {
      const inputFile = `./src/img/${file}.svg`
      const outputFile = `./public/img/${file}_${size}x${size}.png`

      try {
        await sharp(inputFile).resize(size, size).png().toFile(outputFile)

        console.log(`Created ${outputFile}`)
      } catch (err) {
        console.error(`Error processing ${outputFile}:`, err)
      }
    }
  }
})()
