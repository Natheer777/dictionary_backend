// const  mysql =require('mysql2')
// const db= mysql.createPool({
//   host: 'betejqbmtak0eaj63ctn-mysql.services.clever-cloud.com',
//   user: 'ufeuignwbwarfssi',
//   port: '3306',
//   password: 'Te1G6CP4sznNaOGqQypN',
//   database: 'betejqbmtak0eaj63ctn'
// });

//  db.getConnection(()=>{
// console.log("connected good");
// })

// module.exports=db;
const mysql = require('mysql2');
const db = mysql.createPool({
  host: 'betejqbmtak0eaj63ctn-mysql.services.clever-cloud.com',
  user: 'ufeuignwbwarfssi',
  port: '3306',
  password: 'Te1G6CP4sznNaOGqQypN',
  database: 'betejqbmtak0eaj63ctn'
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', err);
    return;
  }
  console.log('تم الاتصال بقاعدة البيانات بنجاح');
  connection.release();
});

function updateDataEverySecond() {
  const query = "UPDATE words SET writings = REPLACE(REPLACE(REPLACE(REPLACE(writings, '[', ''), ']', ''), '\"', ''), '\\\\', '')";
  setInterval(() => {
    db.query(query, (err, results) => {
      if (err) {
        console.error('خطأ في تحديث البيانات:', err);
        return;
      }
      console.log('تم تحديث البيانات بنجاح');
    });
  }, 1000); // كل ثانية
}

updateDataEverySecond();

module.exports = db;
