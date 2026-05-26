// Timeline for: Game 6, 2022 NBA Finals — GSW @ BOS (6/16/2022).
// Final score: GSW 103, BOS 90 (Warriors clinched the title, Curry won Finals MVP).
//
// Timestamps below are derived from the actual YouTube closed-caption track
// (English CC1). Each `t` is pegged ~3–6 seconds BEFORE the moment the
// announcer brings up that subject, so the card lands on screen as the
// relevant audio plays. Re-time by reading the mm:ss display in the transport.

export const TIMELINE = {
  video: {
    youtubeId: 'AOYACk7m7Fk',
    homeTeam: 'BOS',
    awayTeam: 'GSW',
    clipTitle: 'NBA Finals · Game 6 · GSW at BOS · 6/16/22',
  },
  events: [
    { t: 10, type: 'lore', subject: 'team', name: 'Game 6: the clincher',
      body: "TD Garden, Boston. Warriors lead the series 3–2 — a win tonight ends the season and gives Golden State their fourth title in eight years. A Boston win forces a Game 7 in San Francisco." },

    { t: 35, type: 'lore', subject: 'player', name: 'Jayson Tatum',
      body: "Boston's franchise star and primary scorer. When the offense stalls, the ball finds him at the elbow or the wing. Coming off a long playoff run — has worn down through the Finals." },

    { t: 68, type: 'lore', subject: 'player', name: 'Payton Pritchard',
      body: "Boston's backup point guard — a second-year sharpshooter from Oregon. Steve Kerr just made a sub call thinking about how Pritchard's quick release will pull Warriors defenders out of position." },

    { t: 95, type: 'lore', subject: 'player', name: 'Derrick White',
      body: "Mid-season trade pickup who became a starter by the playoffs. Calm decision-maker, knockdown shooter off screens — exactly the kind of role player who matters in a Finals." },

    { t: 138, type: 'term', title: 'Small ball',
      body: "Five players on the floor with no traditional center — usually Draymond Green at the 5 for Golden State. The trade-off: less rim protection, more shooting and switching on defense.",
      why: 'It is the lineup that defines this Warriors era — and the one Boston has to figure out tonight.' },

    { t: 156, type: 'lore', subject: 'player', name: 'Klay Thompson',
      body: "Curry's 'splash brother' — one of the great pure shooters in NBA history. This is his comeback season after missing two and a half years with an ACL tear and then an Achilles tear. Game 6 of the Finals is the storybook moment." },

    { t: 170, type: 'lore', subject: 'player', name: 'Stephen Curry',
      body: "The greatest shooter the league has ever seen. Defenses bend around him — even when he doesn't have the ball, his gravity opens lanes for teammates. Chasing his first Finals MVP tonight (he had won three rings but never the Finals MVP)." },

    { t: 228, type: 'term', title: 'Offensive rebound',
      body: "When your own team grabs a missed shot, the shot clock resets and you get another possession.",
      why: "Kevon Looney has been the Warriors' best offensive rebounder all series — extra possessions are extra threes for Curry." },

    { t: 262, type: 'lore', subject: 'team', name: 'Ime Udoka',
      body: "Boston's first-year head coach — a former Spurs assistant. He has the Celtics in the Finals one season after they missed the playoffs. The Eastern Conference's coach of the moment." },

    { t: 280, type: 'lore', subject: 'team', name: 'Celtics in the playoffs',
      body: "17 banners in the rafters — most in NBA history. A title tonight would be #18 and the franchise's first since 2008. Boston has played 23 playoff games to get here." },

    { t: 320, type: 'term', title: 'The 3-point line',
      body: "Any shot from behind the arc is worth 3 points instead of 2.",
      why: "Golden State takes 40+ threes a game. This whole game is decided on the perimeter — Boston has to chase Curry and Thompson off the line." },

    { t: 393, type: 'score', team: 'AWAY', points: 3, homeScore: 39, awayScore: 54,
      play: 'Thompson catch-and-shoot 3' },

    { t: 405, type: 'hype', title: 'Warriors finding rhythm', intensity: 0.7,
      body: 'Late third quarter — Golden State is pulling away. The Garden is quieter than it was at tip-off; you can feel a Game 6 starting to slip.' },

    { t: 420, type: 'lore', subject: 'player', name: 'Marcus Smart',
      body: "This season's Defensive Player of the Year — the first guard to win it in 26 years. He'll guard 1 through 4 tonight, draw charges, take big shots. The heartbeat of Boston's defense." },

    { t: 450, type: 'lore', subject: 'team', name: 'The Warriors dynasty',
      body: "Three titles already in this era (2015, 2017, 2018). A win tonight makes it four — putting Curry-Thompson-Green among the great championship cores of the modern league." },

    { t: 458, type: 'hype', title: '23 for Curry — chasing the trophy', intensity: 0.85,
      body: "Curry has 23 points already and the Warriors are in front. He's never won Finals MVP — three rings, zero trophies. Tonight is his game to clinch it." },

    { t: 505, type: 'term', title: 'The double-team',
      body: "Two defenders converge on the ball-handler, forcing them to pass.",
      why: "Boston has to send extra help at Curry — but it leaves a shooter open somewhere. The defense is a constant trade." },

    { t: 522, type: 'ref', call: 'Turnover',
      body: "The offense loses the ball without a shot attempt — bad pass, traveling, offensive foul. Possession flips immediately.",
      signal: "Refs point in the direction of the new possession." },

    { t: 542, type: 'lore', subject: 'player', name: 'Al Horford',
      body: "16-year vet — finally in his first Finals after a decade of trying. Tonight: 19 points and 14 rebounds. The kind of veteran night that makes the loss harder to take." },

    { t: 565, type: 'hype', title: "Curry's Finals legacy", intensity: 0.95,
      body: "Three minutes from a fourth ring and his first Finals MVP. By career's end, this game is one of the moments people will point to — the night the dynasty closed it out on the road." },

    { t: 572, type: 'lore', subject: 'player', name: 'Draymond Green',
      body: "Not a big scorer — the brain of the Warriors' defense. Switches onto every position, talks constantly, sets the tone physically. He'll finish with the assist that ices it." },
  ],
};

export const MATCHUP = {
  home: {
    abbr: 'BOS',
    city: 'Boston',
    blurb: "17-time NBA champions coming into this series — the league's most decorated franchise. Rode the best defense in basketball (DPOY Marcus Smart) and a young Tatum/Brown core all the way to the Finals.",
    record: '51–31 (East #2)',
    watch: [
      { name: 'Jayson Tatum', note: 'Franchise star · scoring engine' },
      { name: 'Jaylen Brown', note: 'Two-way wing · 2nd option' },
      { name: 'Marcus Smart', note: 'DPOY · on-ball lockdown' },
      { name: 'Al Horford', note: 'Veteran · stretch-5 anchor' },
    ],
  },
  away: {
    abbr: 'GSW',
    city: 'Golden State',
    blurb: 'Splash-brothers dynasty back in the Finals after a two-year absence. Curry-Thompson-Green core chasing a fourth title together; Wiggins emerged as the breakout playoff piece.',
    record: '53–29 (West #3)',
    watch: [
      { name: 'Stephen Curry', note: 'Two-time MVP · gravity in every direction' },
      { name: 'Klay Thompson', note: 'Comeback year · catch-and-shoot' },
      { name: 'Draymond Green', note: 'Defensive QB · switches everything' },
      { name: 'Andrew Wiggins', note: 'Breakout series · wing defender' },
    ],
  },
};

// Real broadcast captions from the YouTube CC track, lightly cleaned (rollup
// captions cut mid-sentence; these are stitched into readable lines). The
// `t` values are the actual caption timestamps from the video.
export const TRANSCRIPT = [
  { t: 15,  text: "Garden building tonight — back in regulation form." },
  { t: 39,  text: "Lobs it across to Tatum." },
  { t: 60,  text: "Mark: Steve Kerr telling his bench, expect early minutes." },
  { t: 70,  text: "Pritchard again — getting some interesting early action." },
  { t: 79,  text: "Quick shot — taking it out on the side." },
  { t: 100, text: "Derrick White, left wing, Payton on him." },
  { t: 110, text: "Robert Williams got the rebound — Payton's hands deflected it." },
  { t: 144, text: "Small lineup — Green at the five." },
  { t: 153, text: "Mark: you fall in love with the three." },
  { t: 161, text: "Klay Thompson returned from his injury this season." },
  { t: 175, text: "Curry hesitation — nobody's seen it quite like that." },
  { t: 212, text: "They've been outstanding all year." },
  { t: 234, text: "Looney — offensive rebound." },
  { t: 256, text: "Grant Williams steps up." },
  { t: 267, text: "Asked Ime Udoka how they begin to turn this around — starts with the Celtics during the playoffs." },
  { t: 297, text: "Contested miss." },
  { t: 306, text: "Tatum to spot in the corner." },
  { t: 390, text: "He's still a valuable piece of this Warriors franchise." },
  { t: 397, text: "Mike: Thompson — three-pointer!" },
  { t: 410, text: "Final minute, third quarter." },
  { t: 424, text: "Smart looking to penetrate." },
  { t: 452, text: "Warriors — they were shooting 50% from the floor." },
  { t: 461, text: "23 for Curry. Hunt for a title." },
  { t: 491, text: "Marcus Smart thought about it." },
  { t: 509, text: "Any play not named Steph Curry — I cannot allow him to play one-on-one against anybody." },
  { t: 525, text: "Drives, spins into a double-team — another turnover." },
  { t: 546, text: "19 points, 14 rebounds for Horford. Impressive." },
  { t: 557, text: "Things about what Steph Curry has done in these Finals." },
  { t: 576, text: "Back out to Draymond Green." },
];
