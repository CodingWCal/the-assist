// Timeline for: Game 6, 2022 NBA Finals — GSW @ BOS (6/16/2022).
// Final score: GSW 103, BOS 90 (Warriors clinched the title, Curry won Finals MVP).
//
// Timestamps derived from the YouTube closed-caption track (English CC1).
// Each `t` is ~3–6s BEFORE the announcer cue so the card is on screen in time.
// Cards use: onScreen (what's happening visually), commentary (broadcast line),
// body (context), why (mechanics / rookie takeaway).

export const TIMELINE = {
  video: {
    youtubeId: 'AOYACk7m7Fk',
    homeTeam: 'BOS',
    awayTeam: 'GSW',
    clipTitle: 'NBA Finals · Game 6 · GSW at BOS · 6/16/22',
  },
  events: [
    {
      t: 10,
      type: 'lore',
      subject: 'team',
      name: 'Game 6: the clincher',
      onScreen:
        'Pre-game at TD Garden — both teams warming up, crowd loud, scoreboard shows this is a potential series-ending night.',
      commentary: 'Garden building tonight — back in regulation form.',
      body:
        'Warriors lead the series 3–2. A Golden State win tonight ends the season and gives them a fourth title in eight years. Boston must win to force Game 7 in San Francisco.',
      why: 'In the NBA Finals, "Game 6" with the away team up 3–2 means the home crowd is either celebrating a championship or facing elimination.',
    },

    {
      t: 35,
      type: 'lore',
      subject: 'player',
      name: 'Jayson Tatum',
      onScreen:
        'Boston is running offense — a teammate throws a high lob pass toward Tatum cutting toward the basket. Watch #0 track the ball in the air.',
      commentary: 'Lobs it across to Tatum.',
      body:
        "Tatum is Boston's franchise star — the player they want shooting or finishing when the possession matters.",
      why:
        'A lob is a high arcing pass over defenders. When you hear "lob to Tatum," expect a catch near the rim for a dunk, layup, or kick-out pass if the defense collapses.',
    },

    {
      t: 68,
      type: 'lore',
      subject: 'player',
      name: 'Payton Pritchard',
      onScreen:
        'Pritchard is on the floor with the second unit — catching passes on the perimeter and looking to shoot quickly before the defense resets.',
      commentary: 'Pritchard again — getting some interesting early action.',
      body:
        "Backup point guard and three-point specialist. Coaches use him to space the floor when starters rest — his job is to make the defense pay if they help off him.",
      why:
        '"Early action" for a bench guard usually means quick shots in rhythm — the offense is trying to score before Golden State\'s defense is set.',
    },

    {
      t: 95,
      type: 'lore',
      subject: 'player',
      name: 'Derrick White',
      onScreen:
        'White is posted on the left wing with the ball — a defender (Pritchard\'s matchup) is in his stance, arms out, forcing White to decide: drive, pass, or shoot.',
      commentary: 'Derrick White, left wing, Payton on him.',
      body:
        'White became a playoff starter after a mid-season trade — a calm ball-handler who can shoot off screens and make the extra pass.',
      why:
        'Left wing is a common spot to initiate offense. "Payton on him" means Boston is using a switch or cross-match — whoever guards White is trying to stay in front without fouling.',
    },

    {
      t: 138,
      type: 'term',
      title: 'Small ball',
      onScreen:
        'Golden State has Draymond Green at center — no traditional 7-footer — with four shooters spaced around him. Boston may try to attack the smaller lineup inside.',
      commentary: 'Small lineup — Green at the five.',
      body:
        'Five players with no classic center — usually quicker switching on defense but less rim protection.',
      why:
        'When you hear "Green at the five," the Warriors are trading size for speed and shooting. Boston\'s bigs either punish them inside or get pulled away from the basket.',
    },

    {
      t: 156,
      type: 'lore',
      subject: 'player',
      name: 'Klay Thompson',
      onScreen:
        'Thompson is spacing to the three-point line — hands ready, feet set — the defense knows he will shoot if he catches with space.',
      commentary: 'Klay Thompson returned from his injury this season.',
      body:
        "Curry's backcourt partner and one of the greatest catch-and-shoot guards ever. Missed two-plus years with ACL and Achilles injuries — this Finals is his comeback story.",
      why:
        'Announcers mention injuries when a player finally looks like their old self. Watch for Klay moving off screens — he rarely needs dribbles to get a shot off.',
    },

    {
      t: 170,
      type: 'lore',
      subject: 'player',
      name: 'Stephen Curry',
      onScreen:
        'Curry has the ball above the arc — a hesitation dribble freezes his defender; teammates cut because everyone must help on Steph.',
      commentary: "Curry hesitation — nobody's seen it quite like that.",
      body:
        'The greatest shooter in NBA history. Defenses tilt toward him even without the ball — that gravity opens driving lanes and open threes for teammates.',
      why:
        'A hesitation move is a pause in the dribble that tricks the defender into thinking drive or shot. Curry uses it to create a sliver of space for a pull-up three or pass.',
    },

    {
      t: 228,
      type: 'term',
      title: 'Offensive rebound',
      onScreen:
        'A missed shot clangs off the rim — Kevon Looney (or another Warrior) fights inside for the ball among taller Celtics.',
      commentary: 'Looney — offensive rebound.',
      body:
        "When your team grabs its own miss, you get a second chance to score and the shot clock resets.",
      why:
        'Offensive rebounds are extra possessions — critical for Golden State because missed threes can still become points if someone wins the scrum inside.',
    },

    {
      t: 262,
      type: 'lore',
      subject: 'team',
      name: 'Ime Udoka',
      onScreen:
        'Cutaway to the Boston bench — Udoka standing, clipboard in hand, talking to assistants while the Celtics try to stop a Warriors run.',
      commentary:
        'Asked Ime Udoka how they begin to turn this around — starts with the Celtics during the playoffs.',
      body:
        "Boston's first-year head coach — former Spurs assistant who took the Celtics from missing the playoffs to the Finals in one season.",
      why:
        'When the broadcast cuts to the coach mid-game, the story is usually "can Boston adjust?" — timeouts, substitutions, and defensive schemes all come from this sideline.',
    },

    {
      t: 280,
      type: 'lore',
      subject: 'team',
      name: 'Celtics in the playoffs',
      onScreen:
        "Wide shots of the Garden crowd and Boston's green jerseys — the scoreboard pressure is on the home team to extend the series.",
      commentary: "They've been outstanding all year.",
      body:
        '17 championship banners — most in NBA history. A win tonight would be title #18 and the first since 2008. Boston played 23 playoff games to reach this moment.',
      why:
        'Home court in a potential elimination game for the away team means the crowd is a real factor — Boston needs energy runs to stay alive.',
    },

    {
      t: 320,
      type: 'term',
      title: 'The 3-point line',
      onScreen:
        'Warriors players are spacing behind the arc — one pass away from a three. Boston defenders are closing out with high hands.',
      commentary: "Mark: you fall in love with the three.",
      body:
        'Shots from behind the arc count for 3 points; inside the line count for 2. Golden State built a dynasty on volume threes.',
      why:
        'A made three is worth 50% more than a two — that\'s why teams live on the arc. When you hear "three-pointer" next, watch whether the shooter had space (open) or contested hands in the face.',
    },

    {
      t: 393,
      type: 'score',
      team: 'AWAY',
      points: 3,
      homeScore: 39,
      awayScore: 54,
      play: 'Thompson catch-and-shoot 3',
      onScreen:
        'Klay catches a pass on the wing already squared to the basket — releases immediately without dribbling. Ball goes through the net; Warriors bench reacts.',
      commentary: 'Thompson — three-pointer!',
      body:
        'Golden State adds 3 points. Catch-and-shoot means the pass did the setup work — Klay only had to catch and fire. The lead grows in a game Boston is trailing.',
      why:
        'This is how the Warriors punish help defense: one extra pass to the open man behind the line. For rookies: watch the assist — someone drew two defenders before Klay touched it.',
    },

    {
      t: 405,
      type: 'hype',
      title: 'Warriors pulling away',
      onScreen:
        'Third quarter winding down — Golden State players celebrating small plays, Boston looking for answers, crowd noise dipping.',
      commentary: 'Final minute, third quarter.',
      body:
        'Late third quarter — the Warriors have seized control. Momentum is the emotional swing of the game; Boston needs a stop and a bucket to stay in it.',
      why:
        'End-of-quarter runs matter because coaches reset at the break — whoever has momentum often sets the tone for the next 12 minutes.',
    },

    {
      t: 420,
      type: 'lore',
      subject: 'player',
      name: 'Marcus Smart',
      onScreen:
        'Smart has the ball at the top of the key — head up, looking to drive the lane against a set Warriors defense.',
      commentary: 'Smart looking to penetrate.',
      body:
        "Defensive Player of the Year — guards multiple positions, draws charges, and will take big shots. Boston's emotional leader on defense.",
      why:
        'Penetration means driving toward the basket to collapse the defense — Smart is trying to force help and kick to open shooters or finish at the rim.',
    },

    {
      t: 450,
      type: 'lore',
      subject: 'team',
      name: 'The Warriors dynasty',
      onScreen:
        'Montage of Curry, Thompson, and Green together — the broadcast is framing this as a legacy-clinching night for the core.',
      commentary: 'Warriors — they were shooting 50% from the floor.',
      body:
        'Three titles already in this era (2015, 2017, 2018). A win tonight makes four — putting this core among the great championship runs of the modern NBA.',
      why:
        'Shooting 50% as a team is elite — it means their shot quality and ball movement are beating Boston\'s defense consistently, not just hot luck.',
    },

    {
      t: 458,
      type: 'hype',
      title: '23 for Curry — chasing the trophy',
      onScreen:
        'Curry with the ball in his hands during a live possession — score graphic likely showing his point total as Golden State controls the game.',
      commentary: '23 for Curry. Hunt for a title.',
      body:
        "Curry already has 23 points and the Warriors are ahead. He's won three rings but never Finals MVP — tonight could complete the résumé.",
      why:
        'When announcers pair a player\'s stat line with "hunt for a title," they mean this game is the coronation — every Curry touch is high leverage.',
    },

    {
      t: 505,
      type: 'term',
      title: 'The double-team',
      onScreen:
        'Two Boston defenders converge on Curry (or the ball-handler) — leaving someone else open somewhere on the floor.',
      commentary:
        'Any play not named Steph Curry — I cannot allow him to play one-on-one against anybody.',
      body:
        'Two defenders gang up on the star to force a pass. The offense must punish the open man; the defense must rotate fast.',
      why:
        'You\'ll hear this all series: Boston cannot let Curry beat them solo. The trade-off is an open teammate — watch where the ball goes after the double.',
    },

    {
      t: 522,
      type: 'ref',
      call: 'Turnover',
      onScreen:
        'A Boston player drives into traffic, spins, and loses the ball — Warriors secure it and push the other way.',
      commentary: 'Drives, spins into a double-team — another turnover.',
      body:
        'A turnover means the offense loses possession without a shot — bad pass, travel, or violation. The other team gets the ball immediately.',
      signal: 'Refs point in the direction of the new possession; no whistle graphic needed on live-ball turnovers.',
      why:
        'Spinning into a double-team is a rookie mistake — two defenders closed the lane. Boston needed to pass out earlier; instead Golden State gets a free possession.',
    },

    {
      t: 542,
      type: 'lore',
      subject: 'player',
      name: 'Al Horford',
      onScreen:
        'Horford on the floor in the paint — box score graphic likely showing his big night even as Boston trails.',
      commentary: '19 points, 14 rebounds for Horford. Impressive.',
      body:
        '16-year veteran in his first Finals. A double-double (19 points + 14 rebounds) is a monster night — especially for a player who spaces the floor and protects the rim.',
      why:
        'Rebounds mean ending the opponent\'s possession or getting Boston a second chance. Horford did his job; the team still needs stops and shooting to win.',
    },

    {
      t: 565,
      type: 'hype',
      title: "Curry's Finals legacy",
      onScreen:
        'Clock winding down — Warriors ahead, Curry controlling pace, championship celebration starting to feel inevitable.',
      commentary: 'Things about what Steph Curry has done in these Finals.',
      body:
        'Minutes from a fourth ring and first Finals MVP. This is the close-out game on the road — the kind of night that defines careers.',
      why:
        'When the broadcast shifts to legacy talk, the game is essentially decided — they are narrating history while you watch the final possessions play out.',
    },

    {
      t: 572,
      type: 'lore',
      subject: 'player',
      name: 'Draymond Green',
      onScreen:
        'Green catches a pass on the perimeter — hub of the offense, looking to swing the ball or set a screen as the clock runs down.',
      commentary: 'Back out to Draymond Green.',
      body:
        "Golden State's defensive quarterback — calls out coverages, switches onto every position, and runs the offense as a passer from the elbow.",
      why:
        '"Back out to Green" means the initial drive or post action didn\'t score — the offense resets through Draymond to find a better shot. He is the connective tissue of this team.',
    },
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

// Real broadcast captions from the YouTube CC track, lightly cleaned.
export const TRANSCRIPT = [
  { t: 15, text: 'Garden building tonight — back in regulation form.' },
  { t: 39, text: 'Lobs it across to Tatum.' },
  { t: 60, text: "Mark: Steve Kerr telling his bench, expect early minutes." },
  { t: 70, text: 'Pritchard again — getting some interesting early action.' },
  { t: 79, text: 'Quick shot — taking it out on the side.' },
  { t: 100, text: 'Derrick White, left wing, Payton on him.' },
  { t: 110, text: "Robert Williams got the rebound — Payton's hands deflected it." },
  { t: 144, text: 'Small lineup — Green at the five.' },
  { t: 153, text: "Mark: you fall in love with the three." },
  { t: 161, text: 'Klay Thompson returned from his injury this season.' },
  { t: 175, text: "Curry hesitation — nobody's seen it quite like that." },
  { t: 212, text: "They've been outstanding all year." },
  { t: 234, text: 'Looney — offensive rebound.' },
  { t: 256, text: 'Grant Williams steps up.' },
  {
    t: 267,
    text: 'Asked Ime Udoka how they begin to turn this around — starts with the Celtics during the playoffs.',
  },
  { t: 297, text: 'Contested miss.' },
  { t: 306, text: 'Tatum to spot in the corner.' },
  { t: 390, text: "He's still a valuable piece of this Warriors franchise." },
  { t: 397, text: 'Mike: Thompson — three-pointer!' },
  { t: 410, text: 'Final minute, third quarter.' },
  { t: 424, text: 'Smart looking to penetrate.' },
  { t: 452, text: 'Warriors — they were shooting 50% from the floor.' },
  { t: 461, text: '23 for Curry. Hunt for a title.' },
  { t: 491, text: 'Marcus Smart thought about it.' },
  {
    t: 509,
    text: 'Any play not named Steph Curry — I cannot allow him to play one-on-one against anybody.',
  },
  { t: 525, text: 'Drives, spins into a double-team — another turnover.' },
  { t: 546, text: '19 points, 14 rebounds for Horford. Impressive.' },
  { t: 557, text: 'Things about what Steph Curry has done in these Finals.' },
  { t: 576, text: 'Back out to Draymond Green.' },
];
