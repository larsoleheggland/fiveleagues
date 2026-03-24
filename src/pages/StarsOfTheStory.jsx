const STARS = [
  {
    id: 'betterPartOfValor',
    name: 'Better Part of Valor',
    description: 'The entire warband immediately escapes from the battle and does not have to roll on the Flight in the Dark table.',
  },
  {
    id: 'luckyBreak',
    name: 'A Lucky Break!',
    description: 'A character may ignore a roll they just made on the post-game Injury Table or Flight in the Dark Table.',
  },
  {
    id: 'oldFriends',
    name: 'What About Old Friends?',
    description: 'At the beginning of a battle round, roll up a new Hero character and place them within 6" of any battlefield edge. They join your warband in the battle and may act immediately. After the game, the character remains as part of your warband, if desired.',
  },
  {
    id: 'notHowTheStoryWent',
    name: "I Don't Think That's How the Story Went...",
    description: 'When rolling on any type of random events table, roll twice and pick the result you like best. If you dislike both results, you may choose to have nothing happen.',
  },
  {
    id: 'learnedToDoThis',
    name: 'Did I Ever Tell You How I Learned to Do This?',
    description: 'Automatically succeed at a proficiency test, and if a skill is applicable, add the skill to the character permanently.',
  },
]

export default function StarsOfTheStory({ campaign, updateCampaign }) {
  const used = campaign.starsOfTheStory || {}

  const toggle = (starId) => {
    updateCampaign(c => ({
      ...c,
      starsOfTheStory: {
        ...c.starsOfTheStory,
        [starId]: !used[starId],
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-gold tracking-wider">Stars of the Story</h2>
        <p className="text-sm text-stone-500 mt-1">
          Each of these can be used <strong className="text-stone-400">once per campaign</strong>. Click to mark as used. Click again to undo.
        </p>
      </div>

      <div className="space-y-3">
        {STARS.map(star => {
          const isUsed = !!used[star.id]
          return (
            <button
              key={star.id}
              onClick={() => toggle(star.id)}
              className={`w-full text-left rounded-lg border p-4 transition-all select-none ${
                isUsed
                  ? 'bg-stone-900/60 border-stone-800 opacity-40'
                  : 'bg-stone-800/50 border-stone-700 hover:border-gold/50 hover:bg-stone-800/70 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className={`font-display tracking-wider ${isUsed ? 'text-stone-500 line-through' : 'text-gold'}`}>
                  {star.name}
                </h3>
                <span className={`text-xs font-display tracking-wider shrink-0 px-2 py-0.5 rounded ${
                  isUsed ? 'bg-rust/20 text-rust' : 'bg-forest/20 text-forest'
                }`}>
                  {isUsed ? 'Used' : 'Available'}
                </span>
              </div>
              <p className={`text-sm mt-2 ${isUsed ? 'text-stone-600' : 'text-stone-400'}`}>
                {star.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
