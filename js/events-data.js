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

      /* The program (client, 18 and 21 Nov 2026): every Wednesday, Hatha Yoga then Kirtan, then a vegetarian meal.
         Keep the "Program Hours" card on contact.html (Find Us) in step with this file. */
      if (dow === 3) {               /* Wednesday: Hatha Yoga 6:00 pm, 60 minutes */
        list.push({
          id: id++, title: 'Hatha Yoga', teacher: '',
          year: yr, month: mo, day: d,
          timeDisplay: '6:00 pm', duration: '60 min', type: 'asana',
          desc: 'A grounded evening practice with emphasis on breath and slow alignment. No experience necessary, we meet you exactly where you are.'
        });
      }

      if (dow === 3) {               /* Wednesday: Kirtan in the Grove 7:00 pm to 8:30 pm */
        list.push({
          id: id++, title: 'Kirtan in the Grove', teacher: 'Indranudzha Das',
          year: yr, month: mo, day: d,
          timeDisplay: '7:00 pm', duration: '90 min', type: 'kirtan',
          desc: 'A candlelit evening of call-and-response chanting with live harmonium. Come as you are, voice and all. No musical experience required. Vegetarian meal around 8:30 pm.'
        });
      }
    }
  }

  /* One-off special events: add them here, e.g.
     { title: 'Workshop name', teacher: 'Name', year: 2027, month: 0, day: 15, timeDisplay: '2:00 pm', duration: '2 hrs', type: 'workshop', desc: '...' }
     (month counts from 0 = January) */
  [].forEach(function (ev) { ev.id = id++; list.push(ev); });

  list.sort(function (a, b) {
    return new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day);
  });

  return list;
})();
