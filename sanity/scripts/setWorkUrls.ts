import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const doc = await client.getDocument('homepage')
  if (!doc) throw new Error('no homepage doc')
  const work: any[] = (doc as any).featuredWork || []

  const jew = work.find((w) => /jewmanity/i.test(w.label || ''))
  const sbk = work.find((w) => /sbk/i.test(w.label || ''))

  // Store bare domains — the card renders just the host in the address bar.
  let patch = client.patch('homepage')
  if (jew) patch = patch.set({ [`featuredWork[_key=="${jew._key}"].url`]: 'jewmanity.com' })
  if (sbk) patch = patch.set({ [`featuredWork[_key=="${sbk._key}"].url`]: 'stuartbkippermd.com' })
  await patch.commit()

  const after = await client.getDocument('homepage')
  console.log(
    ((after as any).featuredWork || []).map((w: any) => `${w.label}: ${w.url ?? '—'}`).join('\n'),
  )
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
