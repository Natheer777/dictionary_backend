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
const express = require('express');
const mysql = require('mysql2');
const app = express();

// انشاء الاتصال بقاعدة البيانات
const db = mysql.createPool({
  host: 'betejqbmtak0eaj63ctn-mysql.services.clever-cloud.com',
  user: 'ufeuignwbwarfssi',
  port: '3306',
  password: 'Te1G6CP4sznNaOGqQypN',
  database: 'betejqbmtak0eaj63ctn'
});

// تأكيد الاتصال
db.getConnection((err, connection) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', err);
    return;
  }
  console.log('تم الاتصال بقاعدة البيانات بنجاح');
  connection.release();
});

// تعريف الأمور الأخرى في التطبيق Express
// مثل إعداد المسارات، الوسيطة، وغيرها

// كود التحديث كل ثانية
function updateDataEverySecond() {
  const query = "UPDATE words = REPLACE(REPLACE(REPLACE(REPLACE(writings, '[', ''), ']', ''), '\"', ''), '\\\\', '')";
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

// استدعاء الدالة لبدء تحديث البيانات كل ثانية
updateDataEverySecond();

// إضافة أي مسارات أو منطق إضافي لتطبيق Express
// مثل:
// app.get('/', (req, res) => {
//   res.send('مرحباً بك في تطبيق Express');
// });

// استمع على منفذ محدد
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`التطبيق يعمل على المنفذ ${port}`);
});
