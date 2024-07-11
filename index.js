// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const mysql = require('mysql2');
// const router = require('./Routers/Route');
// const axios = require('axios')
// const xlsx = require('xlsx')
// const {createProxyMiddleware} = require('http-proxy-middleware')
// const app = express();
// const port = process.env.PORT || 3010;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(router);

// app.post('/api/excel', async (req, res) => {
//   try {
//     const response = await axios.get('https://docs.google.com/spreadsheets/d/16FiJrTM8hYcqPZ6Vj2P4Jbpzck80824ldrBJiHbTxCE/export?format=xlsx', {
//       responseType: 'arraybuffer',
//     });


// // app.post('/api/excel', async (req, res) => {
// //   try {
// //       // جلب ملف Excel من الرابط
// //       const response = await axios.get('https://docs.google.com/spreadsheets/d/16FiJrTM8hYcqPZ6Vj2P4Jbpzck80824ldrBJiHbTxCE/export?format=xlsx', {
// //           responseType: 'arraybuffer'
// //       });

//       // تحويل البيانات إلى صيغة يمكن لـ xlsx قراءتها
//       const workbook = xlsx.read(response.data, { type: 'buffer' });

//       // أسماء أو فهارس الأوراق المطلوبة
//       const sheetNamesOrIndexes = ['sawa']; // هنا تضع أسماء أو فهارس الأوراق المطلوبة

//       let jsonData = [];

//       sheetNamesOrIndexes.forEach((sheetNameOrIndex) => {
//           // الحصول على ورقة العمل المطلوبة
//           const sheetName = typeof sheetNameOrIndex === 'string' ? sheetNameOrIndex : workbook.SheetNames[sheetNameOrIndex];
//           const sheet = workbook.Sheets[sheetName];

//           if (sheet) {
//               // تحويل الورقة إلى JSON مع تخصيص الصف الثاني كعنوان
//               const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });

//               // استخدام الصف الثاني كعناوين
//               const headers = data[0];
//               const rows = data.slice(1);

//               // تحويل البيانات إلى كائنات باستخدام العناوين
//               const formattedData = rows.map(row => {
//                   let obj = {};
//                   row.forEach((cell, i) => {
//                       obj[headers[i]] = cell;
//                   });
//                   return obj;
//               });

//               jsonData = jsonData.concat(formattedData);
//           }
//       });

//       // إنشاء الرد مع تفاصيل إضافية
//       const result = {
//           Items: jsonData, // عرض أول 10 عناصر
//           TotalResults: jsonData.length,
//           TotalPages: Math.ceil(jsonData.length) // حساب عدد الصفحات بناءً على 10 عناصر في الصفحة
//       };

//       res.json(result); // إرسال البيانات كـ JSON
//   } catch (error) {
//       console.error('Error fetching or processing the Excel file:', error.message);
//       res.status(500).send('Error fetching or processing the Excel file.');
//   }
// });



// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/adduser', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'input_form.html'));
// });
// app.get('/edite', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'edite.html'));
// });
// app.get('/delete', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'delete.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const router = require('./Routers/Route');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const axios = require('axios');
const xlsx = require('xlsx');
const CryptoJS = require('crypto-js');
const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(router);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/excel', async (req, res) => {
  try {
    const response = await axios.get('https://docs.google.com/spreadsheets/d/16FiJrTM8hYcqPZ6Vj2P4Jbpzck80824ldrBJiHbTxCE/export?format=xlsx', {
      responseType: 'arraybuffer',
    });

    const workbook = xlsx.read(response.data, { type: 'buffer' });
    const sheetNamesOrIndexes = ['sawa'];
    let jsonData = [];

    sheetNamesOrIndexes.forEach((sheetNameOrIndex) => {
      const sheetName = typeof sheetNameOrIndex === 'string' ? sheetNameOrIndex : workbook.SheetNames[sheetNameOrIndex];
      const sheet = workbook.Sheets[sheetName];

      if (sheet) {
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
        const headers = data[0];
        const rows = data.slice(1);
        const formattedData = rows.map(row => {
          let obj = {};
          row.forEach((cell, i) => {
            obj[headers[i]] = cell;
          });
          return obj;
        });

        jsonData = jsonData.concat(formattedData);
      }
    });

    const result = {
      Items: jsonData,
      TotalResults: jsonData.length,
      TotalPages: Math.ceil(jsonData.length / 10)
    };

    const secretKey = 'sawa2020!'; // استخدم مفتاح سري قوي في الإنتاج
    const encryptedResult = CryptoJS.AES.encrypt(JSON.stringify(result), secretKey).toString();

    res.json({ data: encryptedResult });
  } catch (error) {
    console.error('Error fetching or processing the Excel file:', error.message);
    res.status(500).send('Error fetching or processing the Excel file.');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/adduser', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'input_form.html'));
});
app.get('/edite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edite.html'));
});
app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'delete.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
