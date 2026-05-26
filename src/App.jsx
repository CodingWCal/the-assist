import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { MATCHUP, TIMELINE, TRANSCRIPT } from './data/timeline.js';

/* ----------------------------- CLOCK + ENGINE ----------------------------- */
// Wait for the IFrame API (loaded from a script tag in index.html) to be ready.
function whenYTReady() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(window.YT);
    };
  });
}

// Mounts a real YT.Player into `containerRef.current` and tracks playback state.
function useYouTubePlayer(videoId, containerRef) {
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let intervalId;
    let player;

    whenYTReady().then((YT) => {
      if (cancelled || !containerRef.current) return;
      player = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1, controls: 0, disablekb: 1, modestbranding: 1,
          rel: 0, playsinline: 1, iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            playerRef.current = player;
            setDuration(player.getDuration() || 0);
            setReady(true);
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 3 = buffering, 0 = ended
            setPlaying(e.data === 1);
            if (e.data === 1 && !duration) setDuration(player.getDuration() || 0);
          },
        },
      });

      intervalId = setInterval(() => {
        if (!playerRef.current || typeof playerRef.current.getCurrentTime !== 'function') return;
        setTime(playerRef.current.getCurrentTime() || 0);
        if (!duration) {
          const d = playerRef.current.getDuration() || 0;
          if (d) setDuration(d);
        }
      }, 250);
    });

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      // Player may already be torn down by YT during HMR — swallow.
      try { playerRef.current && playerRef.current.destroy(); } catch { /* noop */ }
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const play = useCallback(() => {
    try { playerRef.current && playerRef.current.playVideo(); } catch { /* noop */ }
  }, []);
  const pause = useCallback(() => {
    try { playerRef.current && playerRef.current.pauseVideo(); } catch { /* noop */ }
  }, []);
  const seek = useCallback((t) => {
    try { playerRef.current && playerRef.current.seekTo(t, true); } catch { /* noop */ }
    setTime(t);
  }, []);

  return { ready, time, duration, playing, play, pause, seek };
}

function useGameClock(timeline, getTime) {
  const [state, setState] = useState({
    homeScore: 0,
    awayScore: 0,
    quarter: 'Q1',
    clock: '12:00',
    excitement: 0,
    activeCard: null,
    cardHistory: [],
    lastScore: null,
    lastScoreId: 0,
  });
  const fired = useRef(new Set());

  useEffect(() => {
    const id = setInterval(() => {
      const now = getTime();
      setState((prev) => {
        let next = { ...prev, excitement: Math.max(0, prev.excitement - 0.015) };
        if (now == null) return next;

        const q = now < 80 ? 'Q1' : now < 160 ? 'Q2' : now < 240 ? 'Q3' : 'Q4';
        const intoQ = q === 'Q1' ? now : q === 'Q2' ? now - 80 : q === 'Q3' ? now - 160 : now - 240;
        const remaining = Math.max(0, 720 - intoQ * 9);
        const mm = Math.floor(remaining / 60);
        const ss = Math.floor(remaining % 60).toString().padStart(2, '0');
        next.quarter = q;
        next.clock = `${mm}:${ss}`;

        timeline.events.forEach((ev, i) => {
          if (fired.current.has(i) || ev.t > now) return;
          if (now - ev.t > 7) {
            fired.current.add(i);
            return;
          }
          fired.current.add(i);
          if (ev.type === 'score') {
            next = {
              ...next,
              homeScore: ev.homeScore,
              awayScore: ev.awayScore,
              excitement: Math.min(1, next.excitement + (ev.points >= 3 ? 0.5 : 0.3)),
              lastScore: ev,
              lastScoreId: next.lastScoreId + 1,
              activeCard: ev,
              cardHistory: [ev, ...next.cardHistory],
            };
          } else if (ev.type === 'hype') {
            next = {
              ...next,
              excitement: Math.min(1, next.excitement + ev.intensity),
              activeCard: ev,
              cardHistory: [ev, ...next.cardHistory],
            };
          } else {
            next = { ...next, activeCard: ev, cardHistory: [ev, ...next.cardHistory] };
          }
        });
        return next;
      });
    }, 250);
    return () => clearInterval(id);
  }, [timeline, getTime]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = getTime();
      if (now == null) return;
      timeline.events.forEach((ev, i) => {
        if (fired.current.has(i) && ev.t > now + 1) fired.current.delete(i);
      });
    }, 500);
    return () => clearInterval(id);
  }, [timeline, getTime]);

  const resetFired = useCallback(() => {
    fired.current = new Set();
  }, []);
  return [state, resetFired];
}

/* ----------------------------- COMPONENTS ----------------------------- */

function HypeStrip({ home, away, homeScore, awayScore, quarter, clock, excitement, flashSide }) {
  const pct = Math.round(excitement * 100);
  return (
    <div
      style={{
        height: 56,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderRight: '1px solid var(--border)' }}>
        <span className="live-dot" />
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: '#E03A3A', fontWeight: 600 }}>LIVE</span>
        <span style={{ color: 'var(--muted)', fontSize: 13 }}>·</span>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Highlights · BOS vs NYK</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <ScoreBlock abbr={home} score={homeScore} accent="green" flash={flashSide === 'home'} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em' }}>{quarter}</span>
          <span className="mono tnum" style={{ fontSize: 18, fontWeight: 600 }}>{clock}</span>
        </div>
        <ScoreBlock abbr={away} score={awayScore} accent="muted" flash={flashSide === 'away'} />
      </div>

      <div style={{ width: 260, padding: '0 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, borderLeft: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.16em' }}>EXCITEMENT</span>
          <span className="mono tnum" style={{ fontSize: 11, color: 'var(--gold)' }}>{pct.toString().padStart(2, '0')}</span>
        </div>
        <div style={{ height: 6, background: '#101012', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <div
            className="meter-fill"
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--green) 0%, var(--gold) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ScoreBlock({ abbr, score, accent, flash }) {
  return (
    <div
      className={flash ? 'score-flash' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '6px 12px',
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 4,
          background: accent === 'green' ? 'var(--green)' : 'var(--surface-2)',
          border: accent === 'green' ? 'none' : '1px solid var(--border-strong)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{abbr}</span>
      </div>
      <span className="mono tnum" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1, minWidth: 36 }}>
        {score.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

function VideoPlayer({ time, duration, playing, onTogglePlay, onSeek, shake, clipTitle, ytContainerRef, ytReady }) {
  const safeDuration = duration || 1;
  const pct = Math.min(100, (time / safeDuration) * 100);
  const mm = Math.floor(time / 60);
  const ss = Math.floor(time % 60).toString().padStart(2, '0');
  const dmm = Math.floor(safeDuration / 60);
  const dss = Math.floor(safeDuration % 60).toString().padStart(2, '0');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        padding: '20px 24px 0 24px',
        flex: 1,
        minHeight: 0,
      }}
    >
      <div
        className={shake ? 'shake' : ''}
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          width: '100%',
          background: '#000',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* YouTube IFrame mounts here. The wrapper div is what useYouTubePlayer
            hands to YT.Player — YT replaces this element with its iframe. */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div ref={ytContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Loading state — shown until the iframe API is ready. */}
        {!ytReady && (
          <>
            <div className="parquet-bg" style={{ position: 'absolute', inset: 0 }} />
            <div className="court-arc" />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--muted)',
                  textAlign: 'center',
                }}
              >
                LOADING YOUTUBE PLAYER…
              </div>
            </div>
          </>
        )}

        {/* Click-catcher for pause when the iframe is up. The iframe sits below
            this layer; clicking toggles play. When playing, a small overlay
            disappears so the YouTube layer is unobstructed visually. */}
        {ytReady && !playing && (
          <div
            onClick={onTogglePlay}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.35)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid var(--border-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 0, height: 0,
                  borderLeft: '14px solid #fff',
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                  marginLeft: 4,
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border)',
            padding: '6px 10px',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <span className="live-dot" />
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: '#fff' }}>{clipTitle}</span>
        </div>
      </div>

      <div style={{ padding: '14px 0 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onTogglePlay}
          style={{
            width: 36,
            height: 36,
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {playing ? (
            <div style={{ display: 'flex', gap: 3 }}>
              <div style={{ width: 3, height: 12, background: '#fff' }} />
              <div style={{ width: 3, height: 12, background: '#fff' }} />
            </div>
          ) : (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid #fff',
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                marginLeft: 2,
              }}
            />
          )}
        </button>
        <span className="mono tnum" style={{ fontSize: 12, color: 'var(--muted)', minWidth: 90 }}>
          {mm}:{ss} <span style={{ color: 'var(--muted-dim)' }}>/ {dmm}:{dss}</span>
        </span>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            onSeek(x * safeDuration);
          }}
          style={{
            flex: 1,
            height: 6,
            background: '#101012',
            border: '1px solid var(--border)',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: 'var(--green)' }} />
          {TIMELINE.events.map((ev, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(ev.t / safeDuration) * 100}%`,
                top: -2,
                bottom: -2,
                width: 1,
                background: ev.type === 'score' ? 'var(--gold)' : ev.type === 'ref' ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)' }}>SPEED</span>
          <span className="mono tnum" style={{ fontSize: 12 }}>1.0×</span>
        </div>
      </div>
    </div>
  );
}

/* ------ CARDS ------ */

function CardSection({ tag, tagColor, children }) {
  return (
    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--border)' }}>
      <div
        className="mono"
        style={{ fontSize: 9, letterSpacing: '0.18em', color: tagColor || 'var(--muted-dim)', marginBottom: 6 }}
      >
        {tag}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function Card({ event, dim, onClick }) {
  if (!event) return null;
  const type = event.type;
  const edgeCls =
    type === 'term'
      ? 'edge-term'
      : type === 'ref'
      ? 'edge-ref'
      : type === 'score'
      ? 'edge-hype'
      : type === 'lore'
      ? 'edge-lore'
      : 'edge-hype';
  const label =
    type === 'term'
      ? 'RULE IN PLAY'
      : type === 'ref'
      ? 'REF CALL'
      : type === 'score'
      ? 'SCORE'
      : type === 'lore'
      ? event.subject === 'player'
        ? 'PLAYER ON SCREEN'
        : 'GAME CONTEXT'
      : 'MOMENT';
  const labelColor =
    type === 'term'
      ? 'var(--green-bright)'
      : type === 'ref'
      ? 'var(--gold)'
      : type === 'score'
      ? '#E03A3A'
      : type === 'lore'
      ? '#E8E8E8'
      : '#E03A3A';
  const title =
    type === 'score'
      ? event.play || `${event.team === 'BOS' ? 'Boston' : 'Golden State'} +${event.points}`
      : event.title || event.call || event.name || 'Moment';

  return (
    <div
      onClick={onClick}
      className={`${edgeCls} ${!dim ? 'card-in' : ''}`}
      style={{
        background: dim ? 'var(--surface)' : 'var(--surface-2)',
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 16px',
        cursor: onClick ? 'pointer' : 'default',
        opacity: dim ? 0.72 : 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: labelColor, fontWeight: 600 }}>
          {label}
        </span>
        <span className="mono tnum" style={{ fontSize: 10, color: 'var(--muted-dim)' }}>
          {formatT(event.t)}
        </span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.25, marginBottom: 6 }}>{title}</div>
      {type === 'score' && (
        <div className="mono tnum" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
          Score now · BOS {event.homeScore} — GSW {event.awayScore}
        </div>
      )}
      {event.onScreen && (
        <CardSection tag="WHAT YOU'RE SEEING" tagColor="var(--green-bright)">
          {event.onScreen}
        </CardSection>
      )}
      {event.body && (
        <div
          style={{
            fontSize: 13,
            color: event.onScreen ? 'var(--muted)' : 'var(--text)',
            lineHeight: 1.5,
            marginTop: event.onScreen ? 8 : 0,
          }}
        >
          {event.body}
        </div>
      )}
      {event.commentary && (
        <CardSection tag="ANNOUNCER" tagColor="var(--gold)">
          <span style={{ fontStyle: 'italic' }}>&ldquo;{event.commentary}&rdquo;</span>
        </CardSection>
      )}
      {event.why && (
        <CardSection tag="ROOKIE TAKEAWAY" tagColor="var(--muted-dim)">
          {event.why}
        </CardSection>
      )}
      {event.signal && (
        <CardSection tag="REF SIGNAL" tagColor="var(--gold)">
          {event.signal}
        </CardSection>
      )}
    </div>
  );
}

function formatT(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function MatchupCard({ data, expanded, onToggle }) {
  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: 'var(--text)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--gold)' }}>MATCHUP</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            {data.home.abbr} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>vs</span> {data.away.abbr}
          </span>
        </div>
        <span
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms',
            display: 'inline-block',
          }}
        >
          ▾
        </span>
      </button>
      {expanded && (
        <div style={{ padding: '0 16px 16px' }}>
          <TeamBlock t={data.home} accent="var(--green-bright)" />
          <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
          <TeamBlock t={data.away} accent="var(--muted)" />
        </div>
      )}
    </div>
  );
}

function TeamBlock({ t, accent }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, background: accent }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{t.city}</span>
        </div>
        <span className="mono tnum" style={{ fontSize: 11, color: 'var(--muted)' }}>{t.record}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>{t.blurb}</div>
      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--muted-dim)', marginBottom: 6 }}>WATCH</div>
      {t.watch.map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0' }}>
          <span style={{ color: 'var(--text)' }}>{p.name}</span>
          <span style={{ color: 'var(--muted)' }}>{p.note}</span>
        </div>
      ))}
    </div>
  );
}

function RookiePanel({ rookieOn, onToggle, activeCard, history, matchupOpen, setMatchupOpen, onCardClick }) {
  return (
    <aside
      style={{
        width: 340,
        background: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)' }}>ROOKIE MODE</div>
          <div
            style={{
              fontSize: 13,
              color: rookieOn ? 'var(--green-bright)' : 'var(--muted)',
              marginTop: 2,
              fontWeight: 500,
            }}
          >
            {rookieOn ? 'ON · explaining as we go' : 'OFF · just the game'}
          </div>
        </div>
        <Toggle on={rookieOn} onChange={onToggle} />
      </div>

      {rookieOn ? (
        <div
          className="scroll-thin"
          style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {activeCard ? (
            <div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--muted-dim)', marginBottom: 8 }}>NOW</div>
              <Card key={activeCard.t} event={activeCard} />
            </div>
          ) : (
            <PreRollCard />
          )}

          <MatchupCard data={MATCHUP} expanded={matchupOpen} onToggle={() => setMatchupOpen(!matchupOpen)} />

          {history.length > 1 && (
            <div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--muted-dim)', marginBottom: 8 }}>
                EARLIER · {history.length - 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {history.slice(1).map((c, i) => (
                  <Card key={`${c.t}-${i}`} event={c} dim onClick={() => onCardClick(c)} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ textAlign: 'left', maxWidth: 240 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted-dim)', marginBottom: 12 }}>
              VETERAN VIEW
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>
              Cards and explanations are off. Flip the toggle anytime — keyboard{' '}
              <span
                className="mono"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-strong)',
                  padding: '1px 6px',
                  fontSize: 11,
                }}
              >
                R
              </span>{' '}
              works too.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function PreRollCard() {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        background: 'var(--surface-2)',
        padding: 16,
        borderLeft: '3px solid var(--green-bright)',
      }}
    >
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--green-bright)', marginBottom: 8 }}>
        WELCOME
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Rookie Mode is on</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
        As the game happens, this panel explains what you&apos;re seeing on screen, what the announcers are talking about, and the rules behind each play — in plain language. Cards stay in the history below if you miss one.
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        padding: 2,
        background: on ? 'var(--green)' : 'var(--surface-2)',
        border: `1px solid ${on ? 'var(--green)' : 'var(--border-strong)'}`,
        borderRadius: 2,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 150ms',
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          background: '#fff',
          borderRadius: 1,
          transform: `translateX(${on ? 20 : 0}px)`,
          transition: 'transform 150ms ease-out',
        }}
      />
    </button>
  );
}

function TranscriptRail({ time, lines }) {
  const containerRef = useRef(null);
  const activeIdx = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].t <= time) idx = i;
      else break;
    }
    return idx;
  }, [time, lines]);

  useEffect(() => {
    if (!containerRef.current || activeIdx < 0) return;
    const el = containerRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    if (el) {
      const c = containerRef.current;
      const eRect = el.getBoundingClientRect();
      const cRect = c.getBoundingClientRect();
      const target = c.scrollLeft + (eRect.left - cRect.left) - cRect.width / 2 + eRect.width / 2;
      c.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [activeIdx]);

  return (
    <div
      style={{
        height: 88,
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '10px 16px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)' }}>
          ANNOUNCER · LIVE TRANSCRIPT
        </span>
        <span style={{ color: 'var(--muted-dim)' }}>·</span>
        <span style={{ fontSize: 11, color: 'var(--muted-dim)' }}>synced to playback</span>
      </div>
      <div
        ref={containerRef}
        className="scroll-thin"
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          padding: '0 32px',
          whiteSpace: 'nowrap',
        }}
      >
        {lines.map((l, i) => {
          const state = i < activeIdx ? 'tx-past' : i === activeIdx ? 'tx-active' : 'tx-future';
          return (
            <div
              key={i}
              data-idx={i}
              className={state}
              style={{
                fontSize: i === activeIdx ? 16 : 14,
                fontWeight: i === activeIdx ? 600 : 400,
                transition: 'color 200ms, font-size 200ms',
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                flexShrink: 0,
              }}
            >
              <span
                className="mono tnum"
                style={{ fontSize: 10, color: i === activeIdx ? 'var(--gold)' : 'var(--muted-dim)' }}
              >
                {formatT(l.t)}
              </span>
              <span>{l.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------ CELEBRATIONS ------ */
function useCelebration(lastScore, lastScoreId, onShake) {
  useEffect(() => {
    if (!lastScore || lastScoreId === 0) return;
    if (lastScore.team !== 'BOS') return;

    const big = lastScore.points >= 3;
    const count = big ? 140 : 80;
    confetti({
      particleCount: count,
      spread: big ? 90 : 65,
      startVelocity: big ? 55 : 40,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#007A33', '#1A9A4E', '#C9A04E', '#FFFFFF'],
      ticks: 180,
      gravity: 1.1,
      scalar: big ? 1.1 : 0.9,
    });
    onShake();
  }, [lastScoreId]); // eslint-disable-line react-hooks/exhaustive-deps
}

/* ----------------------------- APP ----------------------------- */
export default function App() {
  const ytContainerRef = useRef(null);
  const yt = useYouTubePlayer(TIMELINE.video.youtubeId, ytContainerRef);
  const { ready: ytReady, time, duration, playing, play, pause, seek } = yt;

  const getTime = useCallback(() => time, [time]);
  const [game, resetFired] = useGameClock(TIMELINE, getTime);

  const [rookieOn, setRookieOn] = useState(true);
  const [matchupOpen, setMatchupOpen] = useState(true);
  const [shake, setShake] = useState(false);
  const [flashSide, setFlashSide] = useState(null);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 360);
    setFlashSide('home');
    setTimeout(() => setFlashSide(null), 820);
  };

  useCelebration(game.lastScore, game.lastScoreId, triggerShake);

  useEffect(() => {
    if (!game.lastScore) return;
    if (game.lastScore.team === 'AWAY') {
      setFlashSide('away');
      setTimeout(() => setFlashSide(null), 820);
    }
  }, [game.lastScoreId]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    if (playing) pause(); else play();
  }, [playing, play, pause]);

  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'r' || e.key === 'R') setRookieOn((v) => !v);
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay]);

  const onSeek = (newT) => {
    seek(newT);
    resetFired();
  };

  return (
    <div
      data-screen-label="Watch"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      <header
        style={{
          height: 48,
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: 'var(--green)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 4, border: '1.5px solid #fff' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>The Assist</span>
        </div>
        <nav style={{ display: 'flex', gap: 18 }}>
          <a style={{ fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>Watch</a>
          <a style={{ fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>Library</a>
          <a style={{ fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>About</a>
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)' }}>SHORTCUTS</span>
          <Kbd>R</Kbd>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>rookie</span>
          <Kbd>Space</Kbd>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>play</span>
        </div>
      </header>

      <HypeStrip
        home={TIMELINE.video.homeTeam}
        away={TIMELINE.video.awayTeam}
        homeScore={game.homeScore}
        awayScore={game.awayScore}
        quarter={game.quarter}
        clock={game.clock}
        excitement={game.excitement}
        flashSide={flashSide}
      />

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <VideoPlayer
            time={time}
            duration={duration}
            playing={playing}
            onTogglePlay={togglePlay}
            onSeek={onSeek}
            shake={shake}
            clipTitle={TIMELINE.video.clipTitle}
            ytContainerRef={ytContainerRef}
            ytReady={ytReady}
          />
          <TranscriptRail time={time} lines={TRANSCRIPT} />
        </div>

        <RookiePanel
          rookieOn={rookieOn}
          onToggle={() => setRookieOn((v) => !v)}
          activeCard={game.activeCard}
          history={game.cardHistory}
          matchupOpen={matchupOpen}
          setMatchupOpen={setMatchupOpen}
          onCardClick={() => {}}
        />
      </div>
    </div>
  );
}

function Kbd({ children }) {
  return (
    <span
      className="mono"
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-strong)',
        padding: '2px 7px',
        fontSize: 11,
        color: 'var(--text)',
      }}
    >
      {children}
    </span>
  );
}
