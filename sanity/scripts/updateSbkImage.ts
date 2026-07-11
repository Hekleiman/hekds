import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'node:fs'

const client = getCliClient()
const PUBLIC = '/Users/harrisonkipper/Claude/Projects/HEK Designs/hekds/public/images/portfolio'

async function run() {
  const doc = await client.getDocument('homepage')
  if (!doc) throw new Error('no homepage doc')
  const work: any[] = (doc as any).featuredWork || []
  const sbk = work.find((w) => /sbk/i.test(w.label || ''))
  if (!sbk) throw new Error('no SBK item')

  const asset = await client.assets.upload('image', createReadStream(`${PUBLIC}/sbk.webp`), {
    filename: 'sbk.webp',
  })
  console.log('uploaded ->', asset._id)

  await client
    .patch('homepage')
    .set({
      [`featuredWork[_key=="${sbk._key}"].image`]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit()
  console.log('patched SBK image, key', sbk._key)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
