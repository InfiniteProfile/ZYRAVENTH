/* ZYRAVENTH — ONE UNIVERSE. INFINITE WORLDS. LIMITLESS IDENTITIES.
 *
 * Everything is generated locally and deterministically from a BigInt index:
 *   profile n  ->  planet  ->  galaxy
 * A galaxy holds 12 planets, a planet holds 10 profiles (120 profiles per galaxy).
 * Identifiers are arbitrary-length decimal strings processed as BigInt.
 */
(function () {
  'use strict';

  /* ====================================================================
   * 1. WORD POOLS
   * ==================================================================== */
  const W = (s) => s.split(' ');

  const FIRST = W('Aelin Aldren Amara Anvik Arden Asha Auren Axel Bastien Belen Bryn Caelum Calix Cassia Cedric Corin Dahlia Darian Delphine Dmitri Eira Elio Elowen Emeric Esme Evander Fenna Finn Freya Galen Gideon Greer Halina Hassan Idris Ilya Imara Ione Isolde Jarek Jessamy Joren Junia Kael Kalinda Kasimir Keiko Kiran Kofi Lazar Leona Linnea Lucan Lyra Maelis Magnus Mara Mateo Mireya Nadia Naveen Neriah Nico Noor Odalys Oren Orla Osric Pavel Petra Phaedra Quill Rafe Rani Remy Rhea Rowan Ruvan Saoirse Selene Soren Sunniva Tamsin Taro Thaddeus Thea Tobias Ulric Una Valen Vesper Vikram Wren Xanthe Xavier Yara Yusuf Zahra Zephyr Zola Alaric Bronwen Cyrus Dara Ezra Farah Gwen Hiro Iris Jonah Lior Marit Nell Oskar Priya Ravi Sela Tariq Uma Vera Wynn Yael Zane');
  const LAST = W('Ashgrove Blackwater Brightwell Calloway Corvane Dunmere Eldridge Fairweather Garrick Hollowell Ironwood Jessup Kingsley Larkspur Marlowe Northcott Oakhaven Penhallow Ravenscroft Stormvale Thornfield Underhill Whitlock Yarrow Aldermoor Brackwell Cinderford Dovecote Emberly Foxglove Greywood Hartwell Ingram Juniper Lockhart Moorcroft Nightingale Overton Pemberley Quennell Rookwood Silverlake Tamarind Vesperly Winterbourne Okafor Sandoval Nakamura Ivanova Haddad Lindqvist Mbeki Castellan Rostova Takahashi Vasquez Adeyemi Kowalczyk Delacroix Brennan Chaudhry Dragomir Eriksen Fontaine Gallagher Hargreave Ibarra Jovanovic Karimi Lombardi Moreau Novak Ostrander Petrov Quintero Rinaldi Svensson Tanaka Ulloa Voss Wexler Xiong Yilmaz Zielinski Abernathy Baptiste Carrow Devereaux Esquivel Falkner Grimaldi Halvorsen Iversen Jankowski Kessler Lindgren Montrose Nettleton Oyelaran Prescott Rasmussen Stanhope Trevane Valmont Wakefield');
  const P_MID = W('Ashvar Belmont Corrin Dray Ellory Fenwick Halloran Ismay Jove Kestrel Lorne Maren Nairn Orrin Pell Quen Rask Sable Tarn Ulwen Vane Wick Yore Zeal Arlo Brae Cade Dane Eddas Faro Glenn Hest Iven Jask Kirin Loom Mirth Noll Oakes Pyre Roan Sorrel Teal Umber Vesk');

  const GAL_A = W('Aur Bel Cyr Dra Eld Fal Gor Hyr Ily Jav Kor Lys Mal Nev Orv Pyr Quo Ruv Sev Tal Ulv Vyr Wel Xor Yel Zan Thal Ner Sol Ves Ask Bry Cal Dev Eri Fen Hal Isk Jor Kel Lun Mer Nyx Ost Phe Qir Rhy Sil Tor');
  const GAL_B = W('aleth andor arion avel ervane ilune iveth omar oryn ulara yndra ethis athen orim ivar elune aryss undra eloth ysar onis alis ephra ithar orae uvane ensis ariel osyn ahlen idrae umeth ovar yrene aldis esmor ithae onwyn urael');
  const GAL_M = W('Reach Verge Drift Expanse Veil Crown Cradle Spiral Halo Rim Basin Span Shoal Tide Cluster Mantle Garland Pale Bloom Wake Meridian Vault Sound Arch');

  const PL_A = W('Kyr Vel Mir Tyr Ros Sav Nol Lor Zul Hav Pel Qen Dov Fey Gur Bix Wal Xel Yun Cer Ash Bor Cym Dun Eph Fir Glo Hes Ind Jun Kem Lav Mos Nar Ori Per Rin Sul Tem Umb');
  const PL_B = W('thara vena lume dris noa sera kun mere phos rith sol tane vora wyn zen bar cal dor fell gard heim jora kel lis mir nor ost pha quar ros sk tur vos yth zan');
  const PL_M = W('Prime Minor Major Reach Landing Haven Outpost Crossing Shelf Terrace Anchorage Hollow Ridge Delta Harbor Rise Veil Shore Spur Gate Fold Quay Mesa Lowlands');

  const ROLES = [
    'lantern wright', 'tide archivist', 'comet farmer', 'signal mender', 'orbit tailor', 'glass singer', 'ice cartographer', 'void cook',
    'moon librarian', 'dust diplomat', 'star-glass blower', 'gravity tuner', 'aurora weaver', 'rift surveyor', 'ember sculptor', 'cloud shepherd',
    'meteor appraiser', 'harbor pilot', 'quiet physician', 'crystal grower', 'wind translator', 'relic restorer', 'beacon keeper', 'rain composer',
    'shadow cartographer', 'pulse engineer', 'seed courier', 'dream cataloguer', 'salt trader', 'ring mechanic', 'archive diver', 'frost botanist',
    'tower astronomer', 'echo collector', 'thread dyer', 'map restorer', 'orbit auditor', 'lighthouse poet', 'mirror polisher', 'drift musician',
    'magnet healer', 'stellar midwife', 'sand historian', 'kite navigator', 'bridge builder', 'vault keeper', 'sky gardener', 'night baker'
  ];
  const DOINGS = [
    'who maps the quiet corners of {p}', 'who keeps the night markets of {p} running on time', 'raised among the terraces of {p}',
    'who trades small truths between {p} and its neighbours', 'who has spent decades listening to the weather of {p}',
    'who restores whatever the tides of {p} leave behind', 'who teaches the children of {p} to read the stars',
    'who guards a lamp on the northern shore of {p}', 'who walks the long roads of {p} at dawn', 'who tends a garden that only blooms in the dark of {p}',
    'who repairs the old signal towers of {p}', 'who writes songs for the storms of {p}', 'who has never left {p} and has never been lonely',
    'who arrived on {p} by accident and stayed on purpose', 'who runs a tiny observatory above the clouds of {p}',
    'who counts the falling stars over {p} every night', 'whose workshop on {p} smells of cold iron and tea',
    'who carries letters between the settlements of {p}', 'who knows every cave beneath {p}', 'who sails the slow rivers of {p}',
    'who keeps the oldest records on {p}', 'who rebuilt a ruined harbour on {p} by hand', 'who learned the language of the winds on {p}',
    'who guides travellers across the salt roads of {p}', 'who tunes the great bells of {p} before each season',
    'who maintains the orbital lanterns above {p}', 'who sells star charts in the lower market of {p}',
    'who has outlived three governments on {p}', 'who studies the odd light that gathers over {p}', 'who mends nets, clocks and quarrels on {p}',
    'who is trusted with the keys to the observatory on {p}', 'who hums while charting the coastlines of {p}',
    'who survived the long winter of {p} and kept the diaries', 'who is rumoured to have drawn the first honest map of {p}',
    'who treats the mountains of {p} as old friends', 'who keeps bees in the glasshouses of {p}', 'who sleeps by day and works the night shift on {p}',
    'who inherited a failing lighthouse on {p} and a stubborn cat', 'who restores murals in the deep halls of {p}', 'who is never far from the shoreline of {p}'
  ];
  const KNOWN = [
    'a patient laugh', 'perfect recall of faces', 'an unusually steady hand', 'a collection of cracked lenses', 'never arriving at the same place twice',
    'a voice that carries across canyons', 'mending things nobody else would touch', 'a coat stitched from old charts', 'a habit of naming every cloud',
    'extraordinarily generous soup', 'a wall of handwritten maps', 'a lifelong feud with a stubborn telescope', 'sleeping through meteor showers',
    'a talent for quiet negotiations', 'a pocketful of pebbles from forty worlds', 'answering questions with better questions', 'a knack for finding lost things',
    'humming off-key in perfect time', 'a tidy desk and a chaotic heart', 'a quiet reputation for fairness', 'forgetting names but never directions',
    'a signature scarf the colour of dusk', 'a surprising talent for chess', 'terrible puns and excellent timing', 'keeping promises made decades ago',
    'a ledger of favours owed', 'unshakeable calm in any storm', 'an old compass that points somewhere else', 'laughing at the right moment',
    'knowing which stars are lying', 'remembering every birthday', 'a worn notebook of overheard poetry', 'an uncanny sense of direction',
    'brewing tea strong enough to wake a comet', 'always arriving with exactly the right tool', 'a gentle way with stubborn machines',
    'a long coat with too many pockets', 'giving directions as stories', 'winning arguments by listening', 'making silence feel welcome'
  ];
  const WIP = [
    'an atlas of falling stars', 'a glossary of forgotten winds', 'a lantern that never needs oil', 'a map of places that move', 'a quilt of one hundred sunsets',
    'a book of unfinished lullabies', 'a clock that keeps galactic time', 'a recipe for starlight tea', 'a catalogue of echoes', 'a bridge between two moons',
    'a field guide to impossible weather', 'a dictionary of small silences', 'a violin carved from comet ice', 'a chart of every tide ever recorded',
    'a garden that grows in zero gravity', 'a letter to someone across the void', 'a tower tall enough to touch the ring', 'a catalogue of lost lighthouses',
    'a mosaic from fragments of old meteors', 'a lullaby for the nearest sun', 'a ledger of kind strangers', 'a ship in a bottle the size of a moon',
    'a symphony for twelve winds', 'a map of the dark between stars', 'a manual for befriending storms', 'a cookbook for the end of the world',
    'a museum of ordinary things', 'a telescope made entirely of mirrors', 'a song only the tides can finish', 'an index of every promise kept',
    'a kite that can survive orbit', 'a diary written in starlight code', 'a weather vane for the solar wind', 'a river map of the sky',
    'a hymn for the first morning', 'a lantern festival with no end', 'a dictionary of the old tongue', 'a puzzle box from a dead moon',
    'a ladder to the nearest cloud', 'a history of one small harbour'
  ];
  const TEMPER = W('Calm Curious Stubborn Warm Wry Meticulous Restless Gentle Fearless Dreamy Dry-witted Loyal Playful Solitary Methodical Generous Cautious Bold Serene Inquisitive Steadfast Mischievous Patient Spirited');
  const AFFINITY = ['Red-shifted light', 'Cold nebula dust', 'Slow tides', 'Violet storms', 'Polar auroras', 'Deep-space silence', 'Crystal frost', 'Ringlight', 'Ion rain', 'Old starlight', 'Magnetic fields', 'Low gravity', 'Twin sunsets', 'Dust seas', 'Glacier song', 'Quiet comets', 'Moonlit canyons', 'Tidal caves', 'Soft static', 'Midnight markets'];
  const GUILD_PRE = ['Order of the', 'Circle of the', 'Guild of the', 'House of the', 'Assembly of the', 'Lodge of the', 'Company of the'];
  const GUILD_N = ['Hollow Lantern', 'Silent Orbit', 'Pale Compass', 'Winding Tide', 'Seventh Window', 'Glass Meridian', 'Drifting Bell', 'Quiet Comet', 'Lower Aurora', 'Iron Constellation', 'Open Horizon', 'Slow Meteor', 'Veiled Moon', 'Long Shadow', 'Far Harbor', 'Violet Gate', 'Red Meridian', 'Cyan Archive', 'Midnight Ledger', 'Folded Star'];
  const LOG1 = [
    'First entered the registry as a quiet apprentice, carrying little more than a lamp and a borrowed map.',
    'Began their career repairing instruments nobody else wanted, and slowly became indispensable.',
    'Grew up watching ships leave the harbour and promised to learn every route they took.',
    'Joined the guild late, after a long period of wandering between settlements.',
    'Was first noticed for a remarkably accurate forecast that saved an entire harvest.',
    'Spent early years in a remote outpost, learning patience from the silence.',
    'Rose to local fame after finding a lost convoy using nothing but old star charts.',
    'Was trained by a retired navigator who insisted that every map must have a flaw.',
    'Left a comfortable post to follow a rumour about a vanished lighthouse.',
    'Started by sweeping the floors of an observatory and ended up running it.',
    'Arrived with a single trunk of tools and a talent for making strangers feel at home.',
    'Became known for settling disputes over coffee long before holding any title.'
  ];
  const LOG2 = [
    'Today the workshop is a gathering place for travellers, children and the occasionally lost.',
    'Colleagues describe a habit of solving problems by walking around them three times first.',
    'Visitors leave with directions, a small gift and a feeling they have been expected.',
    'Their notebooks, filled over many cycles, are quietly studied by younger apprentices.',
    'Neighbours say the lights in their window have not gone out in living memory.',
    'Their methods are unusual, slow and almost always right.',
    'A small circle of friends meets weekly to argue happily about the same unanswered questions.',
    'They are trusted with secrets, spare keys and the last slice of cake.',
    'Their reputation travels faster than they do, which suits them fine.',
    'Every season brings a new project and a fresh set of ink-stained fingers.',
    'Most evenings end on a rooftop with a thermos and a view of something distant.',
    'They are rarely in a hurry and almost never late.'
  ];
  const LOG3 = [
    'Rumour holds that a complete map of their journeys exists, hidden somewhere unremarkable.',
    'They say the best discoveries happen on the way to somewhere else, and act accordingly.',
    'Asked about retirement, they smile and change the subject to the weather.',
    'The registry lists them as active, which is the least of what can be said.',
    'Plans for a long voyage are always on the table, though never quite scheduled.',
    'Their latest project remains unnamed, partly out of superstition.',
    'A younger generation now carries on their methods, with permission and variations.',
    'They keep one door in the house permanently locked and will not discuss it.',
    'Several worlds claim them as a native, and they politely agree with each.',
    'They have promised a final volume of notes, eventually.',
    'Whatever comes next, they intend to meet it with tea and a good map.',
    'Nobody has ever seen them hurry, and nobody has ever seen them miss a thing.'
  ];
  const G_SHAPE = ['barred spiral', 'grand-design spiral', 'ringed', 'lenticular', 'dwarf irregular', 'tidal-tail', 'flocculent spiral', 'elliptical', 'twin-core', 'warped-disc', 'loose spiral', 'cartwheel'];
  const G_FEAT = [
    'a core that glows violet through the dust', 'arms strung with young blue-white stars', 'a dark lane that splits it like a river',
    'a slow red heart of ancient suns', 'faint cyan filaments drifting at its rim', 'a halo of quiet globular clusters', 'ribbons of cold nebula',
    'a bright bar lit from end to end', 'a scatter of wandering stars', 'a ring of newborn suns', 'a veil of dust shot through with crimson',
    'long streamers pulled out by a distant neighbour'
  ];
  const G_MOOD = [
    'Travellers call it patient.', 'Its worlds are known for long, quiet evenings.', 'Navigators treat it as a lighthouse of the outer dark.',
    'Old songs describe it as the place where the night keeps its colours.', 'Its settlements trade in maps, music and good weather.',
    'Visitors speak of an unhurried sky.', 'Cartographers argue happily about where it ends.', 'It rewards those who stay a while.',
    'Its planets are said to be unusually welcoming.', 'The light here is soft and slightly violet.'
  ];
  const PL_TYPE = ['ocean', 'glacier', 'desert', 'jungle', 'canyon', 'storm', 'crystal', 'archipelago', 'tundra', 'salt-flat', 'twilight', 'mist-forest', 'ringed', 'basalt', 'cloud-city', 'meadow'];
  const PL_CLIM = [
    'where the horizon glows violet at noon', 'wrapped in slow auroras', 'where rain falls upward at night', 'with twin tides that never agree',
    'under a sky streaked with red dust', 'where fog fills the valleys at dusk', 'warmed by a dim crimson sun', 'lit by three pale moons',
    'with winds that sing through the cliffs', 'that stays in permanent twilight', 'where storms roll in on a fixed schedule', 'with seas as clear as glass'
  ];
  const PL_FEAT = [
    'Its settlements cling to cliffs above silent seas.', 'Travellers come for the star-clear nights.', 'Markets here open only after dark.',
    'The locals navigate by sound as much as by sight.', 'Its libraries are carved into the mountainsides.', 'Every harbour keeps a lantern lit through the night.',
    'Its people measure time in tides.', 'Caravans cross it along roads of pale stone.', 'A ring of old beacons still blinks along its equator.',
    'Its observatories are older than its cities.', 'Most visitors stay longer than planned.', 'Festivals follow the passing of each moon.'
  ];

  /* ====================================================================
   * 2. DETERMINISTIC HELPERS (BigInt-safe)
   * ==================================================================== */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n, w) => { const s = n.toString(); return s.length >= w ? s : '0'.repeat(w - s.length) + s; };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const art = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
  const nf = (n) => Number(n).toLocaleString('en-US');

  /* 32-bit hash over a BigInt of any length (folds every 32-bit word) */
  function h32(n, salt) {
    let x = (salt ^ 0x9e3779b9) | 0;
    let v = n;
    do {
      x = Math.imul(x ^ Number(v & 0xffffffffn), 0x85ebca6b);
      x ^= x >>> 13;
      x = Math.imul(x, 0xc2b2ae35);
      x ^= x >>> 16;
      v >>= 32n;
    } while (v > 0n);
    x ^= x >>> 15; x = Math.imul(x, 0x2c1b3c6d);
    x ^= x >>> 12; x = Math.imul(x, 0x297a2d39);
    x ^= x >>> 15;
    return x >>> 0;
  }
  function prng(seed) {
    let a = seed | 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (arr, r) => arr[(r() * arr.length) | 0];

  function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
  function coprimeNear(s, m) { let x = s; while (gcd(x, m) !== 1) x++; return x; }
  function modInv(a, m) {
    let t = 0, nt = 1, r = m, nr = a % m;
    while (nr) { const q = Math.floor(r / nr); [t, nt] = [nt, t - q * nt]; [r, nr] = [nr, r - q * nr]; }
    return ((t % m) + m) % m;
  }
  const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  function toRoman(n) { let s = ''; for (const [v, c] of ROMAN) { while (n >= v) { s += c; n -= v; } } return s; }
  function fromRoman(s) {
    if (!/^[IVXLCDM]+$/.test(s)) return null;
    const m = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let t = 0;
    for (let i = 0; i < s.length; i++) { const v = m[s[i]], nx = m[s[i + 1]] || 0; t += v < nx ? -v : v; }
    return t;
  }

  /* ====================================================================
   * 3. NAMERS — a bijection between index (BigInt >= 1) and a unique name.
   *    index -> name is encode(); name -> index is decode(), so exact names
   *    can be located anywhere in the infinite universe.
   *    mode 'between': "First [Middle] Last [Numeral]"   (profiles)
   *    mode 'after'  : "Basename [Middle] [Numeral]"    (planets, galaxies)
   * ==================================================================== */
  function makeNamer(o) {
    const A = o.A, B = o.B, M = o.M, LA = A.length, LB = B.length, C = LA * LB;
    const Cb = BigInt(C), MB = BigInt(M.length);
    const mult = coprimeNear(o.mult, C), add = o.add % C, inv = modInv(mult % C, C);
    const between = o.mode === 'between';
    let amap = null, bmap = null, mmap = null, lowers = null, k2idx = null;

    function init() {
      if (amap) return;
      amap = new Map(); bmap = new Map(); mmap = new Map();
      A.forEach((x, i) => amap.set(x.toLowerCase(), i));
      B.forEach((x, i) => bmap.set(x.toLowerCase(), i));
      M.forEach((x, i) => mmap.set(x.toLowerCase(), i));
      lowers = new Array(C); k2idx = new Array(C);
      for (let k = 0; k < C; k++) {
        const a = A[k % LA], b = B[(k / LA) | 0];
        lowers[k] = (between ? a + ' ' + b : a + b).toLowerCase();
        k2idx[k] = ((inv * ((((k - add) % C) + C) % C)) % C) + 1;
      }
    }
    function encode(idx) {
      const z = idx - 1n, k0 = Number(z % Cb), cyc = z / Cb;
      const k = (mult * k0 + add) % C, ai = k % LA, bi = (k / LA) | 0;
      if (cyc === 0n) return between ? A[ai] + ' ' + B[bi] : A[ai] + B[bi];
      const j = cyc - 1n, mid = M[Number(j % MB)], q = j / MB;
      const num = q === 0n ? '' : (q + 1n < 4000n ? toRoman(Number(q + 1n)) : (q + 1n).toString());
      return between ? [A[ai], mid, B[bi], num].filter(Boolean).join(' ') : [A[ai] + B[bi], mid, num].filter(Boolean).join(' ');
    }
    function parseNumeral(s) {
      if (/^\d+$/.test(s)) return BigInt(s);
      const r = fromRoman(s.toUpperCase());
      return r === null ? null : BigInt(r);
    }
    function decode(text) {
      init();
      const t = String(text).trim().split(/\s+/);
      if (!t[0]) return null;
      let ai, bi, mi = -1, num = null;
      if (between) {
        if (t.length < 2 || t.length > 4) return null;
        ai = amap.get(t[0].toLowerCase());
        bi = bmap.get(t[t.length === 2 ? 1 : 2].toLowerCase());
        if (t.length >= 3) { mi = mmap.get(t[1].toLowerCase()); if (mi === undefined) return null; }
        if (t.length === 4) num = t[3];
      } else {
        if (t.length > 3) return null;
        const base = t[0].toLowerCase();
        for (const [al, i] of amap) {
          if (base.startsWith(al) && bmap.has(base.slice(al.length))) { ai = i; bi = bmap.get(base.slice(al.length)); break; }
        }
        if (t.length >= 2) { mi = mmap.get(t[1].toLowerCase()); if (mi === undefined) return null; }
        if (t.length === 3) num = t[2];
      }
      if (ai === undefined || bi === undefined) return null;
      const k = ai + bi * LA;
      let cyc = 0n;
      if (mi >= 0) {
        let q = 0n;
        if (num !== null) { const v = parseNumeral(num); if (v === null || v < 2n) return null; q = v - 1n; }
        cyc = 1n + BigInt(mi) + q * MB;
      } else if (num !== null) return null;
      const k0 = (inv * ((((k - add) % C) + C) % C)) % C;
      const idx = cyc * Cb + BigInt(k0) + 1n;
      return encode(idx).toLowerCase() === t.join(' ').toLowerCase() ? idx : null;
    }
    /* substring search over base names (first cycle); returns indices */
    function matches(q, limit) {
      init();
      q = String(q).trim().toLowerCase();
      if (!q) return [];
      const hits = [];
      for (let k = 0; k < C; k++) {
        const p = lowers[k].indexOf(q);
        if (p >= 0) hits.push({ i: k2idx[k], s: p === 0 || lowers[k][p - 1] === ' ' ? 0 : 1 });
      }
      hits.sort((x, y) => x.s - y.s || x.i - y.i);
      return hits.slice(0, limit).map((h) => BigInt(h.i));
    }
    return { encode, decode, matches, size: C, _lists: { A, B, M } };
  }

  const PROFILE_NAMER = makeNamer({ A: FIRST, B: LAST, M: P_MID, mode: 'between', mult: 7919, add: 3571 });
  const GALAXY_NAMER = makeNamer({ A: GAL_A, B: GAL_B, M: GAL_M, mode: 'after', mult: 1237, add: 911 });
  const PLANET_NAMER = makeNamer({ A: PL_A, B: PL_B, M: PL_M, mode: 'after', mult: 1531, add: 1207 });

  /* ====================================================================
   * 4. ENTITIES  (universe -> galaxy -> planet -> profile)
   * ==================================================================== */
  const PPG = 12n;      // planets per galaxy
  const PPP = 10n;      // profiles per planet
  const BLOCK = 120n;   // profiles per galaxy

  const ID_PROFILE = (n) => 'ZYRAVENTH-' + pad(n, 21);
  const ID_PLANET = (n) => 'PLANET-' + pad(n, 12);
  const ID_GALAXY = (n) => 'GALAXY-' + pad(n, 12);

  function cachePut(m, k, v, cap) { if (m.size >= cap) m.delete(m.keys().next().value); m.set(k, v); }
  const galCache = new Map(), plCache = new Map(), prCache = new Map();

  function getGalaxy(g) {
    const key = g.toString();
    let o = galCache.get(key);
    if (o) return o;
    const rng = prng(h32(g, 0x6a1));
    const shape = pick(G_SHAPE, rng);
    o = {
      kind: 'galaxy', g, key, id: ID_GALAXY(g), name: GALAXY_NAMER.encode(g), shape,
      desc: cap(art(shape)) + ' ' + shape + ' galaxy with ' + pick(G_FEAT, rng) + '. ' + pick(G_MOOD, rng),
      firstPlanet: (g - 1n) * PPG + 1n, firstProfile: (g - 1n) * BLOCK + 1n
    };
    cachePut(galCache, key, o, 1500);
    return o;
  }
  function getPlanet(p) {
    const key = p.toString();
    let o = plCache.get(key);
    if (o) return o;
    const g = (p - 1n) / PPG + 1n, gal = getGalaxy(g), rng = prng(h32(p, 0x91a));
    const type = pick(PL_TYPE, rng);
    o = {
      kind: 'planet', p, key, id: ID_PLANET(p), name: PLANET_NAMER.encode(p), g, gKey: gal.key, galaxy: gal, type,
      desc: cap(art(type)) + ' ' + type + ' world ' + pick(PL_CLIM, rng) + '. ' + pick(PL_FEAT, rng)
    };
    cachePut(plCache, key, o, 3000);
    return o;
  }
  function getProfile(n) {
    const key = n.toString();
    let o = prCache.get(key);
    if (o) return o;
    const z = n - 1n, b = z / BLOCK, r = Number(z % BLOCK), c = r % 12, j = (r / 12) | 0;
    const p = b * PPG + BigInt(c) + 1n, g = b + 1n;
    const planet = getPlanet(p), galaxy = planet.galaxy;
    const name = PROFILE_NAMER.encode(n), first = name.split(' ')[0];
    const rng = prng(h32(n, 0xb10));
    const role = pick(ROLES, rng);
    const doing = pick(DOINGS, rng).replace('{p}', planet.name);
    const bio = first + ' is ' + art(role) + ' ' + role + ' ' + doing + '. Known for ' + pick(KNOWN, rng) + '; still working on ' + pick(WIP, rng) + '.';
    o = {
      kind: 'profile', n, key, id: ID_PROFILE(n), name, first, bio, role: cap(role), slot: j + 1,
      p, pKey: planet.key, g, gKey: galaxy.key, planet, galaxy,
      temper: pick(TEMPER, rng), affinity: pick(AFFINITY, rng),
      guild: pick(GUILD_PRE, rng) + ' ' + pick(GUILD_N, rng),
      age: 19 + ((rng() * 394) | 0),
      mark: 'RX-' + pad(h32(n, 0x77).toString(16).toUpperCase(), 8).replace(/^(....)(....)$/, '$1-$2'),
      log: [pick(LOG1, rng), pick(LOG2, rng), pick(LOG3, rng)]
    };
    cachePut(prCache, key, o, 3000);
    return o;
  }

  function planetProfileKeys(p) {
    const z = p - 1n, b = z / PPG, c = z % PPG, out = [];
    for (let j = 0n; j < PPP; j++) out.push(b * BLOCK + j * PPG + c + 1n);
    return out;
  }
  function galaxyPlanetKeys(g) { const s = (g - 1n) * PPG + 1n, out = []; for (let i = 0n; i < PPG; i++) out.push(s + i); return out; }
  function galaxyProfileKeys(g, limit) { const s = (g - 1n) * BLOCK + 1n, out = [], m = limit || Number(BLOCK); for (let i = 0; i < m; i++) out.push(s + BigInt(i)); return out; }

  /* ====================================================================
   * 5. GENERATED IMAGES (inline SVG, no network, can never break)
   * ==================================================================== */
  const AV_PAL = [
    ['#1d0d3d', '#06030d', '#8b5cf6', '#67e8f9', '#c4b5fd'], ['#2c0a1b', '#07030a', '#e11d48', '#a78bfa', '#fda4af'],
    ['#0a2033', '#05060d', '#22d3ee', '#7c3aed', '#a5f3fc'], ['#25093d', '#09030f', '#c026d3', '#fb7185', '#f0abfc'],
    ['#15133a', '#04030a', '#6366f1', '#22d3ee', '#c7d2fe'], ['#2d0a24', '#060309', '#be123c', '#67e8f9', '#fecdd3'],
    ['#0d1b3a', '#030409', '#38bdf8', '#a78bfa', '#bae6fd']
  ];
  const AV_SKIN = [['#3b2a5e', '#251840'], ['#4a2d58', '#2d1639'], ['#2c3a63', '#18223f'], ['#52304f', '#321a31'], ['#2e2a4f', '#1a1733'], ['#3d3560', '#241f3d']];
  const dataURI = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg);
  const R = Math.round;

  function avatarURI(d) {
    const r = prng(h32(d.n, 0xface)), pal = pick(AV_PAL, r), sk = pick(AV_SKIN, r), ac = pal[2], ac2 = pal[3], rim = pal[4];
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><defs><radialGradient id="b" cx="' + R(20 + r() * 60) + '%" cy="' + R(15 + r() * 30) + '%" r="90%"><stop offset="0" stop-color="' + pal[0] + '"/><stop offset="1" stop-color="' + pal[1] + '"/></radialGradient><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sk[0] + '"/><stop offset="1" stop-color="' + sk[1] + '"/></linearGradient></defs><rect width="200" height="240" fill="url(#b)"/>';
    for (let i = 0; i < 9; i++) s += '<circle cx="' + R(r() * 200) + '" cy="' + R(r() * 150) + '" r="' + (0.5 + r() * 1.1).toFixed(1) + '" fill="#fff" opacity="' + (0.35 + r() * 0.55).toFixed(2) + '"/>';
    const px = r() < 0.5 ? 34 : 166, py = 40 + R(r() * 30), pr = 16 + R(r() * 16);
    s += '<circle cx="' + px + '" cy="' + py + '" r="' + (pr * 1.7).toFixed(0) + '" fill="' + ac2 + '" opacity=".1"/><circle cx="' + px + '" cy="' + py + '" r="' + pr + '" fill="' + ac + '" opacity=".4"/>';
    const sw = 60 + R(r() * 24), hw = 30 + R(r() * 10), hh = 38 + R(r() * 10), hy = 112, crest = (r() * 5) | 0, face = (r() * 3) | 0, emb = (r() * 3) | 0;
    if (crest === 2) s += '<path d="M' + (100 - hw - 12) + ' ' + R(hy + hh * 0.7) + 'Q' + (100 - hw - 12) + ' ' + (hy - hh - 16) + ' 100 ' + (hy - hh - 16) + 'Q' + (100 + hw + 12) + ' ' + (hy - hh - 16) + ' ' + (100 + hw + 12) + ' ' + R(hy + hh * 0.7) + 'Z" fill="#0b0714" stroke="' + ac2 + '" stroke-opacity=".55"/>';
    s += '<path d="M' + (100 - sw) + ' 240C' + (100 - sw) + ' 196 54 176 100 176S' + (100 + sw) + ' 196 ' + (100 + sw) + ' 240Z" fill="url(#f)" stroke="' + rim + '" stroke-opacity=".35"/>';
    s += '<rect x="88" y="150" width="24" height="32" rx="8" fill="url(#f)"/>';
    s += '<ellipse cx="100" cy="' + hy + '" rx="' + hw + '" ry="' + hh + '" fill="url(#f)" stroke="' + rim + '" stroke-opacity=".4"/>';
    if (crest === 0) s += '<ellipse cx="100" cy="' + (hy - hh - 8) + '" rx="' + (hw + 6) + '" ry="7" fill="none" stroke="' + ac + '" stroke-width="2.5"/>';
    else if (crest === 1) s += '<polygon points="' + (100 - hw + 4) + ',' + (hy - hh + 12) + ' ' + R(100 - hw / 2) + ',' + (hy - hh - 18) + ' 100,' + (hy - hh + 4) + ' ' + R(100 + hw / 2) + ',' + (hy - hh - 18) + ' ' + (100 + hw - 4) + ',' + (hy - hh + 12) + '" fill="' + ac + '" opacity=".85"/>';
    else if (crest === 3) s += '<path d="M84 ' + (hy - hh + 4) + 'L74 ' + (hy - hh - 22) + 'M116 ' + (hy - hh + 4) + 'L126 ' + (hy - hh - 22) + '" stroke="' + rim + '" stroke-width="2" fill="none"/><circle cx="74" cy="' + (hy - hh - 24) + '" r="3.5" fill="' + ac + '"/><circle cx="126" cy="' + (hy - hh - 24) + '" r="3.5" fill="' + ac2 + '"/>';
    else if (crest === 4) s += '<path d="M' + (100 - hw) + ' ' + (hy - 6) + 'Q100 ' + (hy - hh - 24) + ' ' + (100 + hw) + ' ' + (hy - 6) + 'Z" fill="' + ac + '" opacity=".55"/>';
    if (face === 0) s += '<rect x="' + (100 - hw + 6) + '" y="' + (hy - 6) + '" width="' + (2 * hw - 12) + '" height="14" rx="7" fill="' + ac2 + '" opacity=".92"/><rect x="' + (100 - hw + 12) + '" y="' + (hy - 3) + '" width="' + (hw - 6) + '" height="3" rx="1.5" fill="#fff" opacity=".55"/>';
    else if (face === 1) s += '<ellipse cx="86" cy="' + hy + '" rx="5.5" ry="7" fill="' + ac2 + '"/><ellipse cx="114" cy="' + hy + '" rx="5.5" ry="7" fill="' + ac2 + '"/><circle cx="87.5" cy="' + (hy - 2) + '" r="1.8" fill="#fff"/><circle cx="115.5" cy="' + (hy - 2) + '" r="1.8" fill="#fff"/><path d="M90 ' + (hy + 24) + 'Q100 ' + (hy + 29) + ' 110 ' + (hy + 24) + '" stroke="' + rim + '" stroke-opacity=".6" fill="none" stroke-width="2"/>';
    else s += '<circle cx="100" cy="' + (hy - 2) + '" r="10" fill="' + ac + '" opacity=".95"/><circle cx="100" cy="' + (hy - 2) + '" r="4" fill="#fff"/><path d="M86 ' + (hy + 26) + 'H114" stroke="' + rim + '" stroke-opacity=".6" stroke-width="2"/>';
    if (emb === 0) s += '<circle cx="100" cy="210" r="7" fill="' + ac + '"/>';
    else if (emb === 1) s += '<polygon points="100,201 108,211 100,221 92,211" fill="' + ac2 + '"/>';
    else s += '<polygon points="100,202 108,218 92,218" fill="' + ac + '"/>';
    return dataURI(s + '</svg>');
  }

  const PL_PAL = [['#8b5cf6', '#2b1457'], ['#be123c', '#3a0a1a'], ['#22d3ee', '#082a38'], ['#6366f1', '#14123e'], ['#c026d3', '#3a0a44'], ['#a78bfa', '#1e1042'], ['#e11d48', '#2a0614'], ['#38bdf8', '#0a2236']];
  function planetURI(d) {
    const r = prng(h32(d.p, 0x51)), pal = pick(PL_PAL, r), ring = r() < 0.5, tilt = R(-30 + r() * 60), rad = 40 + R(r() * 14);
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="g" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="' + pal[0] + '"/><stop offset="1" stop-color="' + pal[1] + '"/></radialGradient><clipPath id="c"><circle cx="100" cy="100" r="' + rad + '"/></clipPath><radialGradient id="bg" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="#150a28"/><stop offset="1" stop-color="#040208"/></radialGradient></defs><rect width="200" height="200" fill="url(#bg)"/>';
    for (let i = 0; i < 14; i++) s += '<circle cx="' + R(r() * 200) + '" cy="' + R(r() * 200) + '" r="' + (0.5 + r() * 1).toFixed(1) + '" fill="#fff" opacity="' + (0.3 + r() * 0.6).toFixed(2) + '"/>';
    if (ring) s += '<g transform="rotate(' + tilt + ' 100 100)"><path d="M' + (100 - rad - 36) + ' 100A' + (rad + 36) + ' 20 0 0 1 ' + (100 + rad + 36) + ' 100" fill="none" stroke="' + pal[0] + '" stroke-opacity=".55" stroke-width="5"/></g>';
    s += '<circle cx="100" cy="100" r="' + rad + '" fill="url(#g)"/><g clip-path="url(#c)">';
    for (let i = 0; i < 4; i++) s += '<ellipse cx="100" cy="' + R(60 + r() * 80) + '" rx="' + (rad + 20) + '" ry="' + (3 + R(r() * 7)) + '" fill="' + (r() < 0.5 ? '#fff' : '#000') + '" opacity="' + (0.08 + r() * 0.14).toFixed(2) + '"/>';
    s += '<circle cx="' + R(120 + r() * 40) + '" cy="' + R(110 + r() * 40) + '" r="' + (rad * 0.95).toFixed(0) + '" fill="#000" opacity=".38"/></g>';
    if (ring) s += '<g transform="rotate(' + tilt + ' 100 100)"><path d="M' + (100 - rad - 36) + ' 100A' + (rad + 36) + ' 20 0 0 0 ' + (100 + rad + 36) + ' 100" fill="none" stroke="' + pal[0] + '" stroke-opacity=".8" stroke-width="5"/></g>';
    return dataURI(s + '</svg>');
  }

  function galaxyURI(d) {
    const r = prng(h32(d.g, 0x6a2)), arms = 2 + ((r() * 3) | 0), cols = ['#a78bfa', '#67e8f9', '#e11d48', '#c4b5fd', '#ffffff'], tilt = R(r() * 180), flat = 0.45 + r() * 0.4;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="k" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".25" stop-color="#8b5cf6" stop-opacity=".7"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></radialGradient></defs><rect width="200" height="200" fill="#050209"/><g transform="rotate(' + tilt + ' 100 100)"><ellipse cx="100" cy="100" rx="34" ry="' + R(34 * flat) + '" fill="url(#k)"/>';
    const turn = 3 + r() * 2.2;
    for (let a = 0; a < arms; a++) {
      for (let i = 1; i <= 34; i++) {
        const t = i / 34, ang = (a / arms) * 6.2832 + t * turn, rr = 8 + t * 82, jx = (r() - 0.5) * 9 * t, jy = (r() - 0.5) * 9 * t;
        s += '<circle cx="' + (100 + Math.cos(ang) * rr + jx).toFixed(1) + '" cy="' + (100 + Math.sin(ang) * rr * flat + jy).toFixed(1) + '" r="' + (0.5 + r() * 1.3).toFixed(1) + '" fill="' + cols[(r() * cols.length) | 0] + '" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
      }
    }
    return dataURI(s + '</g></svg>');
  }

  /* test hook (Node only): expose the pure core and stop before touching the DOM */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROFILE_NAMER, GALAXY_NAMER, PLANET_NAMER, getProfile, getPlanet, getGalaxy, planetProfileKeys, galaxyPlanetKeys, galaxyProfileKeys, avatarURI, planetURI, galaxyURI, h32, FIRST, LAST, GAL_A, GAL_B, PL_A, PL_B, P_MID, GAL_M, PL_M };
    return;
  }

  /* ====================================================================
   * 6. STORAGE (localStorage with safe fallback to memory)
   * ==================================================================== */
  const SKEY = 'zyraventh:v1';
  const state = { gen: { profiles: 0, galaxies: 0, planets: 0 }, prefs: { history: true, tab: 'profiles' }, history: [], visited: [] };
  const DIG = /^\d{1,400}$/;
  function loadState() {
    try {
      const o = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (!o || typeof o !== 'object') return;
      if (o.gen && typeof o.gen === 'object') for (const k of ['profiles', 'galaxies', 'planets']) { const v = String(o.gen[k] || ''); if (/^\d{1,9}$/.test(v)) state.gen[k] = Number(v); }
      if (o.prefs && typeof o.prefs === 'object') {
        if (typeof o.prefs.history === 'boolean') state.prefs.history = o.prefs.history;
        if (['profiles', 'planets', 'galaxies'].includes(o.prefs.tab)) state.prefs.tab = o.prefs.tab;
      }
      if (Array.isArray(o.history)) state.history = o.history.filter((x) => typeof x === 'string' && x.length <= 120).slice(0, 8);
      if (Array.isArray(o.visited)) state.visited = o.visited.filter((x) => x && DIG.test(String(x.n)) && typeof x.name === 'string' && x.name.length < 120).map((x) => ({ n: String(x.n), name: x.name })).slice(0, 16);
    } catch (e) {
      try { localStorage.removeItem(SKEY); } catch (_) { /* storage unavailable */ }
    }
  }
  let saveTimer = 0;
  function saveState() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { try { localStorage.setItem(SKEY, JSON.stringify(state)); } catch (e) { /* keep working in memory */ } }, 350);
  }
  loadState();

  /* ====================================================================
   * 7. CARDS + LAZY HYDRATION
   *    Cards have a fixed height. Content is only present while a card is
   *    near the viewport; far-away cards collapse to empty shells and are
   *    rebuilt deterministically on return. Memory stays flat forever.
   * ==================================================================== */
  const $ = (s, r) => (r || document).querySelector(s);
  const KINDS = {
    profile: { get: getProfile, cls: 'card-profile', html: profileCard },
    planet: { get: getPlanet, cls: 'card-planet', html: planetCard },
    galaxy: { get: getGalaxy, cls: 'card-galaxy', html: galaxyCard }
  };

  function profileCard(d) {
    const h = '#/profile/' + d.key;
    return '<a class="cimg" href="' + h + '" tabindex="-1" aria-hidden="true"><img src="' + avatarURI(d) + '" alt="Portrait of ' + esc(d.name) + '" width="200" height="240" loading="lazy" decoding="async"></a>' +
      '<div class="cbody"><h3><a href="' + h + '">' + esc(d.name) + '</a></h3><p class="cid">' + d.id + '</p><p class="cdesc">' + esc(d.bio) + '</p>' +
      '<p class="cloc"><a class="tag tag-g" href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a><a class="tag tag-s" href="#/planet/' + d.pKey + '">' + esc(d.planet.name) + '</a></p>' +
      '<a class="btn" href="' + h + '">View profile</a></div>';
  }
  function planetCard(d) {
    const h = '#/planet/' + d.key;
    return '<a class="cimg" href="' + h + '" tabindex="-1" aria-hidden="true"><img src="' + planetURI(d) + '" alt="' + esc(d.name) + ' from space" width="200" height="200" loading="lazy" decoding="async"></a>' +
      '<div class="cbody"><h3><a href="' + h + '">' + esc(d.name) + '</a></h3><p class="cid">' + d.id + '</p><p class="cdesc">' + esc(d.desc) + '</p>' +
      '<p class="cloc"><a class="tag tag-g" href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a><span class="tag tag-s">10 profiles</span></p>' +
      '<a class="btn" href="' + h + '">Explore planet</a></div>';
  }
  function galaxyCard(d) {
    const h = '#/galaxy/' + d.key;
    return '<a class="cimg" href="' + h + '" tabindex="-1" aria-hidden="true"><img src="' + galaxyURI(d) + '" alt="' + esc(d.name) + ' galaxy" width="200" height="200" loading="lazy" decoding="async"></a>' +
      '<div class="cbody"><h3><a href="' + h + '">' + esc(d.name) + '</a></h3><p class="cid">' + d.id + '</p><p class="cdesc">' + esc(d.desc) + '</p>' +
      '<p class="cloc"><span class="tag tag-g">12 planets</span><span class="tag tag-s">120 profiles</span></p>' +
      '<a class="btn" href="' + h + '">Explore galaxy</a></div>';
  }

  function fill(el) {
    if (el.__f) return;
    el.innerHTML = KINDS[el.__kind].html(KINDS[el.__kind].get(el.__k));
    el.__f = 1;
  }
  function clear(el) {
    if (!el.__f) return;
    el.textContent = '';
    el.__f = 0;
  }

  const feeds = [];
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      let moved = false;
      for (const e of entries) {
        const el = e.target;
        if (e.isIntersecting) {
          fill(el);
          const f = el.__feed;
          if (f && el.__i > f.reached) { f.reached = el.__i; moved = true; }
        } else clear(el);
      }
      if (moved) feeds.forEach((f) => f.pump());
    }, { rootMargin: '1500px 0px 1500px 0px' })
    : null;

  function newCard(kind, key, role) {
    const el = document.createElement('article');
    el.className = 'card ' + KINDS[kind].cls;
    el.setAttribute('role', 'listitem');
    el.__kind = kind; el.__k = key; el.__f = 0;
    return el;
  }

  /* Static grids (detail pages): small, rendered immediately, natural height */
  function mountStatic(grid, kind, keys) {
    grid.textContent = '';
    const frag = document.createDocumentFragment();
    for (const k of keys) { const el = newCard(kind, k); fill(el); frag.appendChild(el); }
    grid.appendChild(frag);
  }

  /* ====================================================================
   * 8. INFINITE FEED ENGINE
   *    - generation is driven by a background scheduler, not by scrolling
   *    - batches of 300 are prepared in idle time once <= 100 items remain
   *      ahead of the furthest card the visitor has reached
   *    - new cards are appended only; the viewport is never moved
   * ==================================================================== */
  const BATCH = 300, LOOKAHEAD = 100, EMERGENCY = 25, RESTORE_CAP = 6000;
  const idle = window.requestIdleCallback
    ? (fn) => window.requestIdleCallback(fn, { timeout: 300 })
    : (fn) => setTimeout(() => { const t = performance.now(); fn({ timeRemaining: () => Math.max(0, 12 - (performance.now() - t)) }); }, 16);

  function createFeed(cfg) {
    const kind = cfg.kind, K = KINDS[kind];
    const f = { kind, grid: cfg.grid, generated: 0, reached: 0, building: false };
    const initial = Math.max(BATCH, Math.min(state.gen[cfg.stateKey] || 0, RESTORE_CAP));
    const label = cfg.counter;

    function commit(start, count, first) {
      const frag = document.createDocumentFragment(), made = [];
      for (let i = 0; i < count; i++) {
        const idx = start + i, el = newCard(kind, BigInt(idx));
        el.__feed = f; el.__i = idx;
        frag.appendChild(el); made.push(el);
      }
      f.grid.appendChild(frag);
      for (let i = 0; i < made.length; i++) {
        if (!io || (first && i < 24)) fill(made[i]);
        if (io) io.observe(made[i]);
      }
      f.generated += count;
      label.textContent = nf(f.generated);
      state.gen[cfg.stateKey] = f.generated;
      saveState();
    }

    /* prepare `count` items beyond the current end, in idle slices */
    f.build = function (count, sync) {
      if (f.building) return;
      f.building = true;
      const start = f.generated + 1, first = f.generated === 0;
      let i = 0;
      function slice(deadline) {
        while (i < count) {
          K.get(BigInt(start + i)); // warm the cache with the real profile/planet/galaxy data
          i++;
          if (!sync && i % 20 === 0 && deadline.timeRemaining() < 2) break;
        }
        if (i < count) { idle(slice); return; }
        commit(start, count, first);
        f.building = false;
        f.pump();
      }
      if (sync) slice(null); else idle(slice);
    };

    f.pump = function () {
      if (f.building) return;
      if (f.generated === 0) { f.build(initial, true); return; }
      const runway = f.generated - f.reached;
      if (runway <= LOOKAHEAD) f.build(BATCH, runway <= EMERGENCY);
    };

    /* fallback when IntersectionObserver is missing: estimate from scroll position */
    f.estimate = function () {
      const r = f.grid.getBoundingClientRect();
      if (!r.height || !f.generated) return;
      const ratio = (window.innerHeight + 1500 - r.top) / r.height;
      if (ratio > 0) { const est = Math.floor(Math.min(1, ratio) * f.generated); if (est > f.reached) f.reached = est; }
    };

    feeds.push(f);
    f.pump();
    return f;
  }

  /* independent heartbeat: keeps the supply topped up whether or not anyone scrolls */
  setInterval(() => { feeds.forEach((f) => { if (!io) f.estimate(); f.pump(); }); }, 400);

  /* ====================================================================
   * 9. ROUTER + VIEWS (list views stay alive; detail view is re-rendered)
   * ==================================================================== */
  const views = { profiles: $('#view-profiles'), galaxies: $('#view-galaxies'), planets: $('#view-planets'), detail: $('#view-detail') };
  const feedState = {};
  const scrollPos = {};
  let curRoute = null, navDepth = 0;
  const bootEl = $('#boot');
  if (bootEl) bootEl.remove();
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function ensureFeed(name) {
    if (feedState[name]) return;
    const map = { profiles: ['profile', 'profiles'], galaxies: ['galaxy', 'galaxies'], planets: ['planet', 'planets'] }[name];
    feedState[name] = createFeed({ kind: map[0], stateKey: map[1], grid: $('#grid-' + name), counter: $('#count-' + name) });
  }

  function setActiveNav(name) {
    document.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.getAttribute('data-nav') === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>';
  function crumbs(extra) {
    return '<nav class="crumbs" aria-label="Breadcrumb"><button class="back" type="button" data-back>' + chevron + '<span>Back</span></button>' + (extra || '') + '</nav>';
  }
  function notFound() {
    views.detail.innerHTML = '<div class="wrap">' + crumbs('') + '<div class="empty"><h1 tabindex="-1">Nothing lives at this address</h1><p>That link does not point to a galaxy, planet or profile. Identifiers are whole numbers starting at 1.</p><a class="btn" href="#/profiles">Back to profiles</a></div></div>';
    return 'Not found';
  }

  function factRow(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }

  function renderProfile(n) {
    const d = getProfile(n);
    const pk = planetProfileKeys(d.p).filter((x) => x !== n);
    views.detail.innerHTML = '<div class="wrap">' +
      crumbs('<span class="trail"><a href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a><span aria-hidden="true">/</span><a href="#/planet/' + d.pKey + '">' + esc(d.planet.name) + '</a></span>') +
      '<article class="detail"><div class="dportrait"><img src="' + avatarURI(d) + '" alt="Portrait of ' + esc(d.name) + '" width="200" height="240" decoding="async"></div>' +
      '<div class="dinfo"><h1 tabindex="-1">' + esc(d.name) + '</h1>' +
      '<p class="idline"><span class="cid big">' + d.id + '</span><button class="chip" type="button" data-copy="' + d.id + '">Copy ID</button></p>' +
      '<p class="lead">' + esc(d.bio) + '</p>' +
      '<dl class="facts">' + factRow('Calling', esc(d.role)) + factRow('Galaxy', '<a href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a>') +
      factRow('Planet', '<a href="#/planet/' + d.pKey + '">' + esc(d.planet.name) + '</a>') + factRow('Temperament', esc(d.temper)) + factRow('Affinity', esc(d.affinity)) +
      factRow('Affiliation', esc(d.guild)) + factRow('Age', d.age + ' standard cycles') + factRow('Registry mark', '<span class="mono">' + d.mark + '</span>') +
      factRow('Planet ID', '<span class="mono brk">' + d.planet.id + '</span>') + factRow('Galaxy ID', '<span class="mono brk">' + d.galaxy.id + '</span>') + '</dl>' +
      '<section class="starlog"><h2>Starlog</h2><p>' + esc(d.log.join(' ')) + '</p></section>' +
      '<p class="pager">' + (n > 1n ? '<a class="btn ghost" href="#/profile/' + (n - 1n) + '">Previous profile</a>' : '') + '<a class="btn ghost" href="#/profile/' + (n + 1n) + '">Next profile</a></p></div></article>' +
      '<section class="more"><h2>Also on ' + esc(d.planet.name) + '</h2><div class="grid grid-auto" id="more-grid" role="list"></div></section></div>';
    mountStatic($('#more-grid'), 'profile', pk);
    rememberVisited(d);
    return d.name;
  }

  function renderPlanet(p) {
    const d = getPlanet(p);
    views.detail.innerHTML = '<div class="wrap">' +
      crumbs('<span class="trail"><a href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a></span>') +
      '<article class="detail detail-world"><div class="dportrait square"><img src="' + planetURI(d) + '" alt="' + esc(d.name) + ' from space" width="200" height="200" decoding="async"></div>' +
      '<div class="dinfo"><h1 tabindex="-1">' + esc(d.name) + '</h1><p class="idline"><span class="cid big">' + d.id + '</span><button class="chip" type="button" data-copy="' + d.id + '">Copy ID</button></p>' +
      '<p class="lead">' + esc(d.desc) + '</p><dl class="facts">' + factRow('Galaxy', '<a href="#/galaxy/' + d.gKey + '">' + esc(d.galaxy.name) + '</a>') +
      factRow('Galaxy ID', '<span class="mono brk">' + d.galaxy.id + '</span>') + factRow('World type', esc(cap(d.type))) + factRow('Profiles', '10') + '</dl>' +
      '<p class="pager">' + (p > 1n ? '<a class="btn ghost" href="#/planet/' + (p - 1n) + '">Previous planet</a>' : '') + '<a class="btn ghost" href="#/planet/' + (p + 1n) + '">Next planet</a></p></div></article>' +
      '<section class="more"><h2>Profiles on ' + esc(d.name) + '</h2><div class="grid grid-auto" id="more-grid" role="list"></div></section></div>';
    mountStatic($('#more-grid'), 'profile', planetProfileKeys(p));
    return d.name;
  }

  function renderGalaxy(g) {
    const d = getGalaxy(g);
    views.detail.innerHTML = '<div class="wrap">' + crumbs('') +
      '<article class="detail detail-world"><div class="dportrait square"><img src="' + galaxyURI(d) + '" alt="' + esc(d.name) + ' galaxy" width="200" height="200" decoding="async"></div>' +
      '<div class="dinfo"><h1 tabindex="-1">' + esc(d.name) + '</h1><p class="idline"><span class="cid big">' + d.id + '</span><button class="chip" type="button" data-copy="' + d.id + '">Copy ID</button></p>' +
      '<p class="lead">' + esc(d.desc) + '</p><dl class="facts">' + factRow('Shape', esc(cap(d.shape))) + factRow('Planets', '12') + factRow('Profiles', '120') + '</dl>' +
      '<p class="pager">' + (g > 1n ? '<a class="btn ghost" href="#/galaxy/' + (g - 1n) + '">Previous galaxy</a>' : '') + '<a class="btn ghost" href="#/galaxy/' + (g + 1n) + '">Next galaxy</a></p></div></article>' +
      '<section class="more"><h2>Planets in ' + esc(d.name) + '</h2><div class="grid grid-auto" id="gx-planets" role="list"></div></section>' +
      '<section class="more"><h2>Profiles in ' + esc(d.name) + '</h2><div class="grid grid-auto" id="gx-profiles" role="list"></div></section></div>';
    mountStatic($('#gx-planets'), 'planet', galaxyPlanetKeys(g));
    mountStatic($('#gx-profiles'), 'profile', galaxyProfileKeys(g));
    return d.name;
  }

  function rememberVisited(d) {
    if (d.key.length > 400) return;
    state.visited = [{ n: d.key, name: d.name }].concat(state.visited.filter((v) => v.n !== d.key)).slice(0, 16);
    saveState();
  }

  function onRoute() {
    if (curRoute !== null) scrollPos[curRoute] = window.scrollY;
    const hash = location.hash || '#/profiles';
    const m = /^#\/(profiles|galaxies|planets|profile|planet|galaxy)(?:\/(\d+))?\/?$/.exec(hash);
    let name = m ? m[1] : null, arg = m ? m[2] : undefined, title = '', nav = 'profiles';
    for (const k in views) views[k].hidden = true;
    closeSearch(true);

    if (name === 'profiles' || name === 'galaxies' || name === 'planets') {
      ensureFeed(name);
      views[name].hidden = false;
      nav = name;
      title = cap(name);
    } else {
      views.detail.hidden = false;
      const v = arg !== undefined ? BigInt(arg) : 0n;
      if (name && v > 0n) {
        if (name === 'profile') { title = renderProfile(v); nav = 'profiles'; }
        else if (name === 'planet') { title = renderPlanet(v); nav = 'planets'; }
        else { title = renderGalaxy(v); nav = 'galaxies'; }
      } else title = notFound();
    }
    setActiveNav(nav);
    document.title = title + ' · ZYRAVENTH';
    if (curRoute !== null) navDepth++;
    curRoute = hash;
    window.scrollTo(0, scrollPos[hash] || 0);
    if (name && !/^(profiles|galaxies|planets)$/.test(name) || !name) {
      const h1 = $('#view-detail h1'); if (h1) h1.focus({ preventScroll: true });
    }
    feeds.forEach((f) => f.pump());
  }

  /* scroll bookkeeping (never moves the page; only records it) */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (curRoute !== null) scrollPos[curRoute] = window.scrollY;
      if (!io) feeds.forEach((f) => { f.estimate(); f.pump(); });
    });
  }, { passive: true });

  window.addEventListener('hashchange', onRoute);

  /* delegated clicks: back button, copy ID, search chips */
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 1600);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise((res, rej) => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? res() : rej(); } catch (e) { rej(e); }
      ta.remove();
    });
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest ? e.target.closest('[data-back],[data-copy]') : null;
    if (!t) return;
    if (t.hasAttribute('data-back')) {
      if (navDepth > 0) history.back(); else location.hash = '#/profiles';
    } else {
      copyText(t.getAttribute('data-copy')).then(() => toast('Identifier copied'), () => toast('Copy is not available here'));
    }
  });
  document.addEventListener('error', (e) => { const t = e.target; if (t && t.tagName === 'IMG') t.style.visibility = 'hidden'; }, true);

  /* ====================================================================
   * 10. SEARCH  (independent of the feeds; resolves any identifier exactly)
   * ==================================================================== */
  const sheet = $('#search'), qEl = $('#q'), resEl = $('#results'), hintEl = $('#q-hint');
  const TAB_KIND = { profiles: 'profile', planets: 'planet', galaxies: 'galaxy' };
  const PLACEHOLDER = { profiles: 'Profile name, planet, galaxy or ID', planets: 'Planet name, galaxy or ID', galaxies: 'Galaxy name or ID' };
  let tab = state.prefs.tab, lastFocus = null;

  function setTab(t) {
    tab = t; state.prefs.tab = t; saveState();
    sheet.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.getAttribute('data-tab') === t)));
    qEl.placeholder = PLACEHOLDER[t];
    hintEl.textContent = 'Paste an identifier of any length for an exact match, or type part of a name.';
  }
  function openSearch(t) {
    lastFocus = document.activeElement;
    if (t) setTab(t); else setTab(tab);
    sheet.hidden = false;
    qEl.focus();
    runSearch();
  }
  function closeSearch(silent) {
    if (sheet.hidden) return;
    sheet.hidden = true;
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function parseId(q) {
    const s = q.replace(/\s+/g, '').toUpperCase();
    const m = /^([A-Z]*)-?(\d+)$/.exec(s);
    if (!m) return null;
    const pre = m[1];
    let kind;
    if (pre === '') kind = TAB_KIND[tab];
    else if (['ZYRAVENTH', 'PROFILE', 'P', 'ID'].includes(pre)) kind = 'profile';
    else if (['GALAXY', 'GAL', 'G'].includes(pre)) kind = 'galaxy';
    else if (['PLANET', 'PL'].includes(pre)) kind = 'planet';
    else return null;
    return { kind, v: BigInt(m[2]) };
  }

  const CAP = 60;
  function Results() {
    const groups = [], seen = new Set();
    let total = 0;
    return {
      add(title, items) {
        const list = [];
        for (const it of items) {
          if (total >= CAP) break;
          const id = it.kind + ':' + it.key;
          if (seen.has(id)) continue;
          seen.add(id); list.push(it); total++;
        }
        if (list.length) groups.push({ title, items: list });
      },
      groups, get total() { return total; }
    };
  }
  const asItems = (kind, keys) => keys.map((k) => ({ kind, key: k }));

  function search(q) {
    const res = Results();
    const id = parseId(q);
    if (id) {
      if (id.v < 1n) return { note: 'Identifiers start at 1.', res };
      res.add('Exact match', [{ kind: id.kind, key: id.v }]);
      return { res };
    }
    if (tab === 'profiles') {
      const ep = PROFILE_NAMER.decode(q);
      if (ep) res.add('Exact match', [{ kind: 'profile', key: ep }]);
      const epl = PLANET_NAMER.decode(q), eg = GALAXY_NAMER.decode(q);
      if (epl) { res.add('Planet match', [{ kind: 'planet', key: epl }]); res.add('Profiles on this planet', asItems('profile', planetProfileKeys(epl))); }
      if (eg) { res.add('Galaxy match', [{ kind: 'galaxy', key: eg }]); res.add('Profiles in this galaxy', asItems('profile', galaxyProfileKeys(eg, 24))); }
      res.add('Name matches', asItems('profile', PROFILE_NAMER.matches(q, CAP)));
      PLANET_NAMER.matches(q, 3).forEach((p) => res.add('On planets matching “' + q + '”', asItems('profile', planetProfileKeys(p))));
      GALAXY_NAMER.matches(q, 2).forEach((g) => res.add('In galaxies matching “' + q + '”', asItems('profile', galaxyProfileKeys(g, 20))));
    } else if (tab === 'planets') {
      const epl = PLANET_NAMER.decode(q), eg = GALAXY_NAMER.decode(q);
      if (epl) res.add('Exact match', [{ kind: 'planet', key: epl }]);
      if (eg) res.add('Planets in this galaxy', asItems('planet', galaxyPlanetKeys(eg)));
      res.add('Name matches', asItems('planet', PLANET_NAMER.matches(q, 30)));
      GALAXY_NAMER.matches(q, 3).forEach((g) => res.add('In galaxies matching “' + q + '”', asItems('planet', galaxyPlanetKeys(g))));
    } else {
      const eg = GALAXY_NAMER.decode(q);
      if (eg) res.add('Exact match', [{ kind: 'galaxy', key: eg }]);
      res.add('Name matches', asItems('galaxy', GALAXY_NAMER.matches(q, 40)));
    }
    return { res };
  }

  function rowHTML(it) {
    const d = KINDS[it.kind].get(it.key);
    const href = '#/' + it.kind + '/' + it.key;
    let img, sub;
    if (it.kind === 'profile') { img = avatarURI(d); sub = esc(d.planet.name) + ' · ' + esc(d.galaxy.name); }
    else if (it.kind === 'planet') { img = planetURI(d); sub = 'Planet in ' + esc(d.galaxy.name); }
    else { img = galaxyURI(d); sub = 'Galaxy · 12 planets · 120 profiles'; }
    return '<li><a class="res" href="' + href + '" data-q><img src="' + img + '" alt="" width="52" height="52" loading="lazy" decoding="async"><span class="res-main"><strong>' + esc(d.name) + '</strong><span class="mono brk">' + d.id + '</span><span class="res-sub">' + sub + '</span></span></a></li>';
  }

  function idleHTML() {
    let h = '';
    if (state.visited.length) {
      h += '<h3 class="gh">Recently viewed</h3><ul class="chips">' + state.visited.slice(0, 8).map((v) => '<li><a class="chip" href="#/profile/' + v.n + '">' + esc(v.name) + '</a></li>').join('') + '</ul>';
    }
    if (state.prefs.history && state.history.length) {
      h += '<h3 class="gh">Recent searches</h3><ul class="chips">' + state.history.map((q) => '<li><button class="chip" type="button" data-hq="' + esc(q) + '">' + esc(q) + '</button></li>').join('') + '</ul><p><button class="link" type="button" data-clear>Clear search history</button></p>';
    }
    h += '<p class="pref"><label><input type="checkbox" id="pref-history"' + (state.prefs.history ? ' checked' : '') + '> Remember my searches on this device</label></p>';
    return h;
  }

  let searchRaf = 0;
  function runSearch() {
    cancelAnimationFrame(searchRaf);
    searchRaf = requestAnimationFrame(() => {
      const q = qEl.value.trim();
      if (!q) { resEl.innerHTML = idleHTML(); return; }
      const { res, note } = search(q);
      if (note) { resEl.innerHTML = '<p class="msg">' + esc(note) + '</p>'; return; }
      if (!res.total) {
        resEl.innerHTML = '<p class="msg">No match for “' + esc(q.length > 80 ? q.slice(0, 80) + '…' : q) + '”. Try part of a name, or paste an exact identifier. Any whole number is a valid identifier.</p>';
        return;
      }
      resEl.innerHTML = res.groups.map((g) => '<h3 class="gh">' + g.title.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])) + '</h3><ul class="results">' + g.items.map(rowHTML).join('') + '</ul>').join('') +
        (res.total >= CAP ? '<p class="msg">Showing the first ' + CAP + ' matches. Paste an exact identifier or full name to jump anywhere in the universe.</p>' : '');
    });
  }
  function pushHistory(q) {
    if (!state.prefs.history || !q || q.length > 120) return;
    state.history = [q].concat(state.history.filter((x) => x !== q)).slice(0, 8);
    saveState();
  }

  $('#open-search').addEventListener('click', () => openSearch());
  $('#close-search').addEventListener('click', () => closeSearch());
  sheet.addEventListener('click', (e) => { if (e.target === sheet) closeSearch(); });
  sheet.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { setTab(b.getAttribute('data-tab')); runSearch(); qEl.focus(); }));
  qEl.addEventListener('input', runSearch);
  qEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { pushHistory(qEl.value.trim()); const a = resEl.querySelector('a.res'); if (a) a.click(); } });
  resEl.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-q]');
    if (a) { pushHistory(qEl.value.trim()); return; }
    const hq = e.target.closest('[data-hq]');
    if (hq) { qEl.value = hq.getAttribute('data-hq'); runSearch(); qEl.focus(); return; }
    if (e.target.closest('[data-clear]')) { state.history = []; saveState(); runSearch(); return; }
    if (e.target.closest('a.chip')) closeSearch(true);
  });
  resEl.addEventListener('change', (e) => {
    if (e.target.id === 'pref-history') { state.prefs.history = e.target.checked; if (!e.target.checked) state.history = []; saveState(); runSearch(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sheet.hidden) { closeSearch(); return; }
    if (e.key === '/' && sheet.hidden && !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); openSearch(); }
    if (e.key === 'Tab' && !sheet.hidden) {  /* keep keyboard focus inside the dialog */
      const f = Array.from(sheet.querySelectorAll('button,a[href],input')).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  setTab(tab);

  /* ====================================================================
   * 11. START
   * ==================================================================== */
  onRoute();
})();
