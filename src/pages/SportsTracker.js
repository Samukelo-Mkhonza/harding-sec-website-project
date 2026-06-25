import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaTrophy, FaCalendarAlt,
  FaCheckCircle, FaClock, FaTimesCircle,
  FaArrowRight,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SPORTS = [
  {
    id: 'soccer',
    label: 'Soccer',
    emoji: '⚽',
    color: '#0D4E25',
    season: 'Terms 1 & 2',
    description: 'Harding Secondary\'s soccer programme runs two teams — U19 (1st team) and U15 (junior team) — competing in the Ugu District Soccer League and provincial competitions.',
    coach: 'Mr. B. Mthethwa',
    teams: [
      {
        id: 'soccer-u19',
        name: 'U19 Boys (1st Team)',
        captain: 'Sipho Ndaba',
        results: [
          { date: '5 Mar 2026', opponent: 'Paddock Secondary', home: false, goalsFor: 3, goalsAgainst: 1, competition: 'Ugu District League' },
          { date: '12 Mar 2026', opponent: 'Umzimkhulu High', home: true, goalsFor: 2, goalsAgainst: 0, competition: 'Ugu District League' },
          { date: '19 Mar 2026', opponent: 'KwaBhaca Secondary', home: false, goalsFor: 1, goalsAgainst: 1, competition: 'Ugu District League' },
          { date: '2 Apr 2026', opponent: 'Port Shepstone High', home: true, goalsFor: 4, goalsAgainst: 2, competition: 'Ugu District League' },
          { date: '9 Apr 2026', opponent: 'Highflats High', home: false, goalsFor: 0, goalsAgainst: 2, competition: 'Ugu District League' },
          { date: '7 May 2026', opponent: 'Paddock Secondary', home: true, goalsFor: 2, goalsAgainst: 1, competition: 'Ugu District Semifinal' },
        ],
        fixtures: [
          { date: '25 Jun 2026', opponent: 'Highflats High', home: true, time: '14:00', competition: 'Ugu District Final' },
          { date: '9 Jul 2026', opponent: 'KZN Regional TBD', home: false, time: '10:00', competition: 'KZN Regional Round 1' },
        ],
        roster: [
          { number: 1, name: 'Kwanele Mbatha', position: 'Goalkeeper' },
          { number: 2, name: 'Ntokozo Cele', position: 'Right Back' },
          { number: 5, name: 'Sifiso Dlamini', position: 'Centre Back' },
          { number: 6, name: 'Mthokozisi Ngcobo', position: 'Centre Back (VC)' },
          { number: 3, name: 'Lungani Mkhize', position: 'Left Back' },
          { number: 8, name: 'Thulani Hadebe', position: 'Central Midfield' },
          { number: 4, name: 'Siphamandla Ntuli', position: 'Central Midfield' },
          { number: 7, name: 'Sandile Buthelezi', position: 'Right Wing' },
          { number: 11, name: 'Nkosi Zulu', position: 'Left Wing' },
          { number: 10, name: 'Sipho Ndaba (C)', position: 'Attacking Mid / Captain' },
          { number: 9, name: 'Bongani Mthethwa', position: 'Striker' },
        ],
        standings: [
          { pos: 1, team: 'Harding Secondary', p: 6, w: 4, d: 1, l: 1, gf: 12, ga: 6, pts: 13, home: true },
          { pos: 2, team: 'Highflats High', p: 6, w: 4, d: 0, l: 2, gf: 11, ga: 7, pts: 12 },
          { pos: 3, team: 'Paddock Secondary', p: 6, w: 3, d: 1, l: 2, gf: 9, ga: 8, pts: 10 },
          { pos: 4, team: 'KwaBhaca Secondary', p: 6, w: 2, d: 2, l: 2, gf: 8, ga: 9, pts: 8 },
          { pos: 5, team: 'Umzimkhulu High', p: 6, w: 2, d: 0, l: 4, gf: 6, ga: 12, pts: 6 },
          { pos: 6, team: 'Port Shepstone High', p: 6, w: 1, d: 0, l: 5, gf: 5, ga: 9, pts: 3 },
        ],
      },
      {
        id: 'soccer-u15',
        name: 'U15 Boys (Junior Team)',
        captain: 'Lethiwe Mthembu',
        results: [
          { date: '6 Mar 2026', opponent: 'Paddock Secondary', home: true, goalsFor: 2, goalsAgainst: 0, competition: 'Ugu Junior League' },
          { date: '20 Mar 2026', opponent: 'Umzimkhulu High', home: false, goalsFor: 1, goalsAgainst: 2, competition: 'Ugu Junior League' },
          { date: '3 Apr 2026', opponent: 'KwaBhaca Secondary', home: true, goalsFor: 3, goalsAgainst: 1, competition: 'Ugu Junior League' },
          { date: '10 Apr 2026', opponent: 'Port Shepstone High', home: false, goalsFor: 2, goalsAgainst: 2, competition: 'Ugu Junior League' },
        ],
        fixtures: [
          { date: '26 Jun 2026', opponent: 'Highflats High', home: false, time: '12:00', competition: 'Ugu Junior League' },
          { date: '3 Jul 2026', opponent: 'Paddock Secondary', home: true, time: '11:00', competition: 'Ugu Junior League' },
        ],
        roster: [
          { number: 1, name: 'Sipho Xulu', position: 'Goalkeeper' },
          { number: 5, name: 'Mandla Mthembu', position: 'Centre Back' },
          { number: 6, name: 'Thabo Shabalala', position: 'Centre Back' },
          { number: 10, name: 'Lethiwe Mthembu (C)', position: 'Attacking Midfielder / Captain' },
          { number: 9, name: 'Ayanda Zondi', position: 'Striker' },
        ],
        standings: null,
      },
    ],
  },
  {
    id: 'netball',
    label: 'Netball',
    emoji: '🏐',
    color: '#AD1457',
    season: 'Terms 1 & 2',
    description: 'The Harding Secondary netball programme competes in both the Ugu District League and KZN provincial competitions. Girls from Grades 8–12 are eligible to try out.',
    coach: 'Ms. T. Mkhize',
    teams: [
      {
        id: 'netball-u19',
        name: 'U19 Girls (1st Team)',
        captain: 'Nomvula Dube',
        results: [
          { date: '7 Mar 2026', opponent: 'Paddock Secondary', home: true, goalsFor: 48, goalsAgainst: 32, competition: 'Ugu District League' },
          { date: '14 Mar 2026', opponent: 'Port Shepstone High', home: false, goalsFor: 41, goalsAgainst: 39, competition: 'Ugu District League' },
          { date: '21 Mar 2026', opponent: 'Umzimkhulu High', home: true, goalsFor: 55, goalsAgainst: 28, competition: 'Ugu District League' },
          { date: '4 Apr 2026', opponent: 'KwaBhaca Secondary', home: false, goalsFor: 37, goalsAgainst: 44, competition: 'Ugu District League' },
          { date: '11 Apr 2026', opponent: 'Highflats High', home: true, goalsFor: 50, goalsAgainst: 38, competition: 'Ugu District League' },
        ],
        fixtures: [
          { date: '27 Jun 2026', opponent: 'KwaBhaca Secondary', home: true, time: '09:00', competition: 'Ugu District Semifinal' },
          { date: '11 Jul 2026', opponent: 'TBD', home: false, time: '10:00', competition: 'Ugu District Final' },
        ],
        roster: [
          { number: 1, name: 'Nomvula Dube (C)', position: 'Goal Shooter / Captain' },
          { number: 2, name: 'Zanele Mthembu', position: 'Goal Attack' },
          { number: 3, name: 'Siphokazi Ndaba', position: 'Wing Attack' },
          { number: 4, name: 'Nokwanda Msomi', position: 'Centre' },
          { number: 5, name: 'Thandi Hadebe', position: 'Wing Defence' },
          { number: 6, name: 'Ayanda Cele', position: 'Goal Defence' },
          { number: 7, name: 'Lungelo Buthelezi', position: 'Goal Keeper' },
        ],
        standings: [
          { pos: 1, team: 'Harding Secondary', p: 5, w: 4, d: 0, l: 1, pts: 8, home: true },
          { pos: 2, team: 'KwaBhaca Secondary', p: 5, w: 3, d: 0, l: 2, pts: 6 },
          { pos: 3, team: 'Port Shepstone High', p: 5, w: 2, d: 0, l: 3, pts: 4 },
          { pos: 4, team: 'Highflats High', p: 5, w: 2, d: 0, l: 3, pts: 4 },
          { pos: 5, team: 'Paddock Secondary', p: 5, w: 1, d: 0, l: 4, pts: 2 },
          { pos: 6, team: 'Umzimkhulu High', p: 5, w: 2, d: 0, l: 3, pts: 4 },
        ],
      },
    ],
  },
  {
    id: 'athletics',
    label: 'Athletics',
    emoji: '🏃',
    color: '#E65100',
    season: 'Term 1 (January–March)',
    description: 'Harding Secondary\'s athletics programme covers track and field events from 100m to 4×400m relay, shot put, long jump, and high jump. Learners compete at district, regional, and provincial levels.',
    coach: 'Mr. S. Hadebe',
    teams: [
      {
        id: 'athletics-main',
        name: 'Athletics Team 2026',
        captain: 'Various Team Captains',
        results: [
          { date: '14 Feb 2026', opponent: 'Ugu District Athletics Championships', home: false, competition: 'District Championships', label: 'District', medals: { gold: 3, silver: 5, bronze: 4 } },
          { date: '7 Mar 2026', opponent: 'KZN South Coast Regional', home: false, competition: 'Regional Championships', label: 'Regional', medals: { gold: 1, silver: 2, bronze: 1 } },
        ],
        fixtures: [
          { date: '12 Jul 2026', opponent: 'KZN Provincial Athletics Championships', home: false, time: '08:00', competition: 'KZN Provincial', location: 'Absa Stadium, PMB' },
        ],
        athleteResults: [
          { name: 'Thabani Mthembu', event: '100m', time: '10.84s', grade: 12, medal: 'gold', level: 'District' },
          { name: 'Zanele Ngcobo', event: '200m', time: '25.1s', grade: 11, medal: 'gold', level: 'District' },
          { name: 'Sipho Ndaba', event: '800m', time: '2:02.4', grade: 12, medal: 'gold', level: 'District' },
          { name: 'Nomvula Dube', event: 'Long Jump', distance: '5.62m', grade: 12, medal: 'silver', level: 'District' },
          { name: 'Bongani Mkhize', event: '4×100m Relay', time: '44.2s', grade: 11, medal: 'silver', level: 'District' },
          { name: 'Ayanda Cele', event: 'High Jump', distance: '1.64m', grade: 10, medal: 'bronze', level: 'District' },
          { name: 'Thabani Mthembu', event: '100m', time: '10.91s', grade: 12, medal: 'silver', level: 'Regional' },
          { name: 'Sipho Ndaba', event: '800m', time: '2:03.8', grade: 12, medal: 'gold', level: 'Regional' },
        ],
        roster: null,
        standings: null,
      },
    ],
  },
  {
    id: 'cricket',
    label: 'Cricket',
    emoji: '🏏',
    color: '#5D4037',
    season: 'Terms 4 & 1',
    description: 'The Harding Secondary cricket team competes in the Ugu District Cricket League. The team plays 20-over format matches on the school\'s prepared cricket pitch.',
    coach: 'Mr. K. Ntanzi',
    teams: [
      {
        id: 'cricket-u19',
        name: 'U19 Boys Cricket',
        captain: 'Lwazi Dlamini',
        results: [
          { date: '14 Oct 2025', opponent: 'Paddock Secondary', home: true, goalsFor: 156, goalsAgainst: 120, competition: 'Ugu District League' },
          { date: '28 Oct 2025', opponent: 'Port Shepstone High', home: false, goalsFor: 134, goalsAgainst: 136, competition: 'Ugu District League' },
          { date: '11 Nov 2025', opponent: 'Umzimkhulu High', home: true, goalsFor: 178, goalsAgainst: 95, competition: 'Ugu District League' },
          { date: '25 Nov 2025', opponent: 'Highflats High', home: false, goalsFor: 148, goalsAgainst: 152, competition: 'Ugu District League' },
          { date: '6 Feb 2026', opponent: 'KwaBhaca Secondary', home: true, goalsFor: 165, goalsAgainst: 110, competition: 'Ugu District League' },
        ],
        fixtures: [
          { date: '2 Oct 2026', opponent: 'Paddock Secondary', home: false, time: '09:00', competition: 'Ugu District League — New Season' },
        ],
        roster: [
          { number: null, name: 'Lwazi Dlamini (C)', position: 'Batsman / Captain' },
          { number: null, name: 'Siphamandla Ntuli', position: 'Wicket Keeper' },
          { number: null, name: 'Thulani Mthethwa', position: 'Opening Batsman' },
          { number: null, name: 'Nkosi Buthelezi', position: 'All Rounder' },
          { number: null, name: 'Sandile Zulu', position: 'Fast Bowler' },
          { number: null, name: 'Mthokozisi Ndaba', position: 'Spinner' },
          { number: null, name: 'Bongani Shabalala', position: 'Batsman' },
          { number: null, name: 'Ayanda Hadebe', position: 'Medium Pace Bowler' },
          { number: null, name: 'Lungani Ngcobo', position: 'Batsman' },
          { number: null, name: 'Sifiso Cele', position: 'Bowler' },
          { number: null, name: 'Kwanele Mkhize', position: 'Batsman' },
        ],
        standings: [
          { pos: 1, team: 'Port Shepstone High', p: 5, w: 4, d: 0, l: 1, pts: 8 },
          { pos: 2, team: 'Harding Secondary', p: 5, w: 3, d: 0, l: 2, pts: 6, home: true },
          { pos: 3, team: 'Highflats High', p: 5, w: 3, d: 0, l: 2, pts: 6 },
          { pos: 4, team: 'KwaBhaca Secondary', p: 5, w: 2, d: 0, l: 3, pts: 4 },
          { pos: 5, team: 'Paddock Secondary', p: 5, w: 1, d: 0, l: 4, pts: 2 },
          { pos: 6, team: 'Umzimkhulu High', p: 5, w: 1, d: 0, l: 4, pts: 2 },
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getResultIcon = (r) => {
  if (r.medals) return null;
  const w = r.goalsFor > r.goalsAgainst;
  const d = r.goalsFor === r.goalsAgainst;
  if (w) return { Icon: FaCheckCircle, color: '#0D4E25', label: 'W' };
  if (d) return { Icon: FaClock, color: '#F59E0B', label: 'D' };
  return { Icon: FaTimesCircle, color: '#B71C1C', label: 'L' };
};

const TeamRecord = ({ results }) => {
  if (results[0]?.medals) return null;
  const w = results.filter((r) => r.goalsFor > r.goalsAgainst).length;
  const d = results.filter((r) => r.goalsFor === r.goalsAgainst).length;
  const l = results.filter((r) => r.goalsFor < r.goalsAgainst).length;
  return (
    <div className="flex gap-3">
      {[{ label: 'W', value: w, color: '#0D4E25' }, { label: 'D', value: d, color: '#F59E0B' }, { label: 'L', value: l, color: '#B71C1C' }].map(({ label, value, color }) => (
        <div key={label} className="text-center">
          <p className="text-lg font-heading font-bold" style={{ color }}>{value}</p>
          <p className="text-[10px] text-neutral-400">{label}</p>
        </div>
      ))}
    </div>
  );
};

// ─── Standings Table ──────────────────────────────────────────────────────────

const StandingsTable = ({ standings, color }) => (
  <div className="overflow-x-auto rounded-xl border border-neutral-100">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-neutral-50">
          {['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'Pts'].map((h) => (
            <th key={h} className="px-3 py-2.5 text-left font-bold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {standings.map((row) => (
          <tr
            key={row.team}
            className={`border-t border-neutral-50 ${row.home ? 'bg-primary/5 font-semibold' : ''}`}
          >
            <td className="px-3 py-2.5 text-neutral-500">{row.pos}</td>
            <td className="px-3 py-2.5 font-semibold text-neutral-800 flex items-center gap-1.5 whitespace-nowrap">
              {row.home && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />}
              {row.team}
            </td>
            <td className="px-3 py-2.5 text-neutral-600">{row.p}</td>
            <td className="px-3 py-2.5 text-green-700 font-bold">{row.w}</td>
            <td className="px-3 py-2.5 text-amber-700">{row.d ?? '—'}</td>
            <td className="px-3 py-2.5 text-red-700">{row.l}</td>
            <td className="px-3 py-2.5 text-neutral-600">{row.gf ?? '—'}</td>
            <td className="px-3 py-2.5 text-neutral-600">{row.ga ?? '—'}</td>
            <td className="px-3 py-2.5 font-bold" style={{ color: row.home ? color : '#374151' }}>{row.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Team Section ─────────────────────────────────────────────────────────────

const TeamSection = ({ team, color, isAthletics }) => {
  const [tab, setTab] = useState('results');

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-neutral-800 text-base">{team.name}</h3>
          {team.captain && !isAthletics && (
            <p className="text-xs text-neutral-400 mt-0.5">Captain: {team.captain}</p>
          )}
        </div>
        {!isAthletics && <TeamRecord results={team.results} />}
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 px-5 pt-4 flex-wrap">
        {[
          { id: 'results', label: isAthletics ? 'Competition Results' : 'Results' },
          { id: 'fixtures', label: 'Fixtures' },
          ...(!isAthletics && team.roster ? [{ id: 'roster', label: 'Team Roster' }] : []),
          ...(!isAthletics && team.standings ? [{ id: 'standings', label: 'Standings' }] : []),
          ...(isAthletics ? [{ id: 'athletes', label: 'Athletes' }] : []),
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              tab === id ? 'text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
            style={tab === id ? { backgroundColor: color } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* Results */}
        {tab === 'results' && (
          <div className="space-y-2">
            {team.results.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-4">No results recorded yet.</p>
            ) : team.results.map((r, i) => {
              const res = getResultIcon(r);
              return (
                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                  {res && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: res.color }}
                    >
                      {res.label}
                    </div>
                  )}
                  {r.medals && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {r.medals.gold > 0 && <span className="text-xs font-bold text-amber-600">🥇{r.medals.gold}</span>}
                      {r.medals.silver > 0 && <span className="text-xs font-bold text-slate-500">🥈{r.medals.silver}</span>}
                      {r.medals.bronze > 0 && <span className="text-xs font-bold text-amber-800">🥉{r.medals.bronze}</span>}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800 truncate">{r.medals ? r.opponent : `vs ${r.opponent}`}</p>
                    <p className="text-[10px] text-neutral-400">
                      {r.date} · {r.home !== undefined ? (r.home ? 'Home' : 'Away') : ''} · {r.competition}
                    </p>
                  </div>
                  {!r.medals && (
                    <span className="text-xs font-bold text-neutral-700 flex-shrink-0">
                      {r.goalsFor}–{r.goalsAgainst}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Fixtures */}
        {tab === 'fixtures' && (
          <div className="space-y-2">
            {team.fixtures.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-4">No upcoming fixtures scheduled.</p>
            ) : team.fixtures.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border-2 border-dashed border-neutral-200 rounded-xl">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: color + '80' }}
                >
                  <FaCalendarAlt className="text-[10px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-800 truncate">
                    {f.opponent}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {f.date} · {f.time} · {f.home !== undefined ? (f.home ? 'Home' : 'Away') : ''}{f.location ? ` · ${f.location}` : ''} · {f.competition}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Roster */}
        {tab === 'roster' && team.roster && (
          <div className="space-y-1.5">
            {team.roster.map((player, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50">
                {player.number != null && (
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {player.number}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-neutral-800">{player.name}</p>
                </div>
                <span className="text-[10px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{player.position}</span>
              </div>
            ))}
          </div>
        )}

        {/* Standings */}
        {tab === 'standings' && team.standings && (
          <StandingsTable standings={team.standings} color={color} />
        )}

        {/* Athletes (athletics) */}
        {tab === 'athletes' && team.athleteResults && (
          <div className="space-y-2">
            {team.athleteResults.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <div className="text-base flex-shrink-0">
                  {a.medal === 'gold' ? '🥇' : a.medal === 'silver' ? '🥈' : '🥉'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-800">{a.name}</p>
                  <p className="text-[10px] text-neutral-400">{a.event} · Grade {a.grade} · {a.level}</p>
                </div>
                <span className="text-xs font-bold text-neutral-700">{a.time || a.distance}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Sport Panel ──────────────────────────────────────────────────────────────

const SportPanel = ({ sport }) => (
  <div className="space-y-6">
    {/* Sport header */}
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Coach: {sport.coach}</p>
          <p className="text-sm text-neutral-600 leading-relaxed">{sport.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-neutral-400 text-xs" />
          <span className="text-xs text-neutral-500 font-semibold">{sport.season}</span>
        </div>
      </div>
    </div>

    {/* Teams */}
    {sport.teams.map((team) => (
      <TeamSection
        key={team.id}
        team={team}
        color={sport.color}
        isAthletics={sport.id === 'athletics'}
      />
    ))}
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const SportsTracker = () => {
  const [activeSport, setActiveSport] = useState('soccer');
  const sport = SPORTS.find((s) => s.id === activeSport);

  // Quick stats
  const soccerU19 = SPORTS[0].teams[0];
  const winsU19 = soccerU19.results.filter((r) => r.goalsFor > r.goalsAgainst).length;

  return (
    <>
      <SEO
        title="Sports Fixtures & Results | Harding Secondary School"
        description="Live sports results, upcoming fixtures, team rosters, and standings for Harding Secondary School — soccer, netball, athletics, and cricket."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.campus}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaTrophy className="text-xs" />
              School Life — Sports
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Sports Fixtures &amp; Results
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Follow Harding Secondary's teams — results, fixtures, rosters, and league standings all in one place.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Sports Codes', value: SPORTS.length },
                { label: 'U19 Soccer Wins', value: `${winsU19}/${soccerU19.results.length}` },
                { label: 'District Medals (Athletics)', value: '12' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-accent-neon">{value}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="bg-neutral-50 min-h-screen py-10 md:py-16">
          <div className="container-custom">

            {/* Sport tabs */}
            <div className="flex gap-3 flex-wrap mb-8">
              {SPORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSport(s.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    activeSport === s.id
                      ? 'text-white shadow-md'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                  style={activeSport === s.id ? { backgroundColor: s.color } : {}}
                >
                  <span className="text-base">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>

            {/* Active sport */}
            <AnimateOnScroll key={activeSport} animation="fade">
              <SportPanel sport={sport} />
            </AnimateOnScroll>

            {/* Footer callout */}
            <div className="mt-10 bg-primary-dark rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
              <div>
                <h3 className="font-heading font-bold text-lg mb-1">Want to join a team?</h3>
                <p className="text-white/70 text-sm">Tryouts are held at the start of each season. Speak to the relevant coach or contact the Sports Department for more information.</p>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-neon text-primary-dark rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
              >
                Contact Sports Department
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsTracker;
