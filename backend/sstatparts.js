import getSleepVsDepression from './sstatparts.js';
export default function getSleepVsDepression(db) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT "Sleep Duration", Depression FROM student_depression WHERE "Sleep Duration" IS NOT NULL AND Depression IS NOT NULL`,
      [],
      (err, rows) => {
        if (err) return reject(err);

        const data = rows
          .map(row => {
            const match = row["Sleep Duration"]?.match(/\d+/g);
            const sleep = match
              ? (parseInt(match[0]) + parseInt(match[1])) / 2
              : null;
            const depression = parseInt(row.Depression);
            return [sleep, depression];
          })
          .filter(([sleep, depression]) => sleep != null && !isNaN(depression));

        resolve(data);
      }
    );
  });
}
