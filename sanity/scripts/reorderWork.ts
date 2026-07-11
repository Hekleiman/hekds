import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const doc = await client.getDocument('homepage')
  if (!doc) throw new Error('no homepage doc')
  const work: any[] = (doc as any).featuredWork || []
  console.log('before:', work.map((w) => w.label))

  // Move SBK MD to the end.
  const sbk = work.filter((w) => /sbk/i.test(w.label || ''))
  const rest = work.filter((w) => !/sbk/i.test(w.label || ''))
  const reordered = [...rest, ...sbk]
  console.log('after:', reordered.map((w) => w.label))

  await client.patch('homepage').set({ featuredWork: reordered }).commit()
  console.log('done')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
