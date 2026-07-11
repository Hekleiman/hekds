import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'node:fs'

const client = getCliClient()

const PUBLIC = '/Users/harrisonkipper/Claude/Projects/HEK Designs/hekds/public/images/portfolio'

async function run() {
  const doc = await client.getDocument('homepage')
  if (!doc) throw new Error('no homepage doc')
  const work: any[] = (doc as any).featuredWork || []
  console.log('current featuredWork:', work.map((w) => `${w._key}:${w.label}:${w.image ? 'img' : 'no-img'}`))

  async function upload(file: string) {
    const asset = await client.assets.upload('image', createReadStream(`${PUBLIC}/${file}`), {
      filename: file,
    })
    console.log('uploaded', file, '->', asset._id)
    return asset._id
  }

  const tradeupAsset = await upload('tradeup.webp')
  const jewmanityAsset = await upload('jewmanity.webp')

  const tradeup = work.find((w) => /trade\s*up/i.test(w.label || ''))
  const jewmanity = work.find((w) => /jewmanity/i.test(w.label || ''))

  let patch = client.patch('homepage')
  if (tradeup) {
    patch = patch.set({
      [`featuredWork[_key=="${tradeup._key}"].image`]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: tradeupAsset },
      },
      [`featuredWork[_key=="${tradeup._key}"].url`]: 'tradeupmarket.com',
    })
    console.log('patching Trade Up image, key', tradeup._key)
  }
  if (jewmanity) {
    patch = patch.set({
      [`featuredWork[_key=="${jewmanity._key}"].image`]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: jewmanityAsset },
      },
    })
    console.log('patching Jewmanity image, key', jewmanity._key)
  }
  await patch.commit()
  console.log('done')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
