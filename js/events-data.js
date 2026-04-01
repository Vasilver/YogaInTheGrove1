/* ============================================================
   Yoga in the Grove — Shared Event Data
   Single source of truth for all calendar events.
   Loaded by calendar.html and index.html.

   To change the schedule, edit ONLY this file.
   Both pages will update automatically.
   ============================================================ */

var YOGA_EVENTS = (function () {
  var list = [];
  var id   = 1;

  /* Generate recurring events: 1 month back through 3 months forward */
  var now      = new Date();
  var startAbs = now.getFullYear() * 12 + now.getMonth() - 1;
  var endAbs   = now.getFullYear() * 12 + now.getMonth() + 3;

  for (var abs = startAbs; abs <= endAbs; abs++) {
    var yr  = Math.floor(abs / 12);
    var mo  = abs % 12;
    var dim = new Date(yr, mo + 1, 0).getDate();

    for (var d = 1; d <= dim; d++) {
      var dow = new Date(yr, mo, d).getDay();

      if (dow === 3) {               /* Wednesday — Evening Hatha 6:00 pm */
        list.push({
          id: id++, title: 'Evening Hatha', teacher: 'Vishal Das',
          year: yr, month: mo, day: d,
          timeDisplay: '6:00 pm', duration: '75 min', type: 'asana',
          desc: 'A grounded evening practice with emphasis on breath and slow alignment. No experience necessary — we meet you exactly where you are.'
        });
      }

      if (dow === 6) {               /* Saturday — Morning Hatha 9:00 am */
        list.push({
          id: id++, title: 'Morning Hatha', teacher: 'Vishal Das',
          year: yr, month: mo, day: d,
          timeDisplay: '9:00 am', duration: '75 min', type: 'asana',
          desc: 'A grounded morning practice with emphasis on breath and slow alignment. No experience necessary — we meet you exactly where you are.'
        });
      }

      if (dow === 3) {               /* Wednesday — Kirtan in the Grove 7:00 pm */
        list.push({
          id: id++, title: 'Kirtan in the Grove', teacher: 'Indranudzha Das',
          year: yr, month: mo, day: d,
          timeDisplay: '7:00 pm', duration: '90 min', type: 'kirtan',
          desc: 'A candlelit evening of call-and-response chanting with live harmonium. Come as you are, voice and all. No musical experience required.'
        });
      }

      if (dow === 0) {               /* Sunday — Community Seva Morning 9:00 am */
        list.push({
          id: id++, title: 'Community Seva Morning', teacher: 'Community',
          year: yr, month: mo, day: d,
          timeDisplay: '9:00 am', duration: '3 hrs', type: 'seva',
          desc: 'A morning of collective service in Coconut Grove. We work together, share a meal, and leave having given something back to the neighborhood.'
        });
      }
    }
  }

  /* One-off special events */
  [
    { title: 'Seated Meditation',        teacher: '[Teacher Name]', year: 2026, month: 1, day: 11, timeDisplay: '6:30 pm', duration: '60 min', type: 'meditation', desc: 'A guided sit for beginners and longtime practitioners alike. We start from stillness and investigate what arises — gently, without agenda.' },
    { title: 'Yin & Alignment Workshop', teacher: '[Teacher Name]', year: 2026, month: 1, day: 21, timeDisplay: '2:00 pm', duration: '2 hrs',  type: 'workshop',   desc: 'A deep dive into connective tissue — long holds, breath work, and careful attention to how the body opens when we stop pushing it.' }
  ].forEach(function (ev) { ev.id = id++; list.push(ev); });

  list.sort(function (a, b) {
    return new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day);
  });

  return list;
})();
