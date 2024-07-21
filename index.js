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

// app.post('/api/excel', async (req, res) => {
//   try {
//     const response = await axios.get('https://docs.google.com/spreadsheets/d/16FiJrTM8hYcqPZ6Vj2P4Jbpzck80824ldrBJiHbTxCE/export?format=xlsx', {
//       responseType: 'arraybuffer',
//     });

//     const workbook = xlsx.read(response.data, { type: 'buffer' });
//     const sheetNamesOrIndexes = ['sawa'];
//     let jsonData = [];

//     sheetNamesOrIndexes.forEach((sheetNameOrIndex) => {
//       const sheetName = typeof sheetNameOrIndex === 'string' ? sheetNameOrIndex : workbook.SheetNames[sheetNameOrIndex];
//       const sheet = workbook.Sheets[sheetName];

//       if (sheet) {
//         const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 0 });
//         const headers = data[0];
//         const rows = data.slice(1);
//         const formattedData = rows.map(row => {
//           let obj = {};
//           row.forEach((cell, i) => {
//             obj[headers[i]] = cell;
//           });
//           return obj;
//         });

//         jsonData = jsonData.concat(formattedData);
//       }
//     });

//     const result = {
//       Items: jsonData,
//       TotalResults: jsonData.length,
//       TotalPages: Math.ceil(jsonData.length / 10)
//     };

//     const secretKey = 'sawa2020!'; // استخدم مفتاح سري قوي في الإنتاج
//     const encryptedResult = CryptoJS.AES.encrypt(JSON.stringify(result), secretKey).toString();

//     res.json({ data: encryptedResult });
//   } catch (error) {
//     console.error('Error fetching or processing the Excel file:', error.message);
//     res.status(500).send('Error fetching or processing the Excel file.');
//   }
// });


// app.post('/api/excel', async (req, res) => {
//   try {
//     const response = await axios.get('https://docs.google.com/spreadsheets/d/16FiJrTM8hYcqPZ6Vj2P4Jbpzck80824ldrBJiHbTxCE/export?format=xlsx', {
//       responseType: 'arraybuffer',
//     });

//     const workbook = xlsx.read(response.data, { type: 'buffer' });
//     const sheetNamesOrIndexes = ['sawa'];
//     let jsonData = [];

//     sheetNamesOrIndexes.forEach((sheetNameOrIndex) => {
//       const sheetName = typeof sheetNameOrIndex === 'string' ? sheetNameOrIndex : workbook.SheetNames[sheetNameOrIndex];
//       const sheet = workbook.Sheets[sheetName];

//       if (sheet) {
//         const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 0 });
//         const headers = data[0];
//         const rows = data.slice(1);
//         const formattedData = rows.map(row => {
//           let obj = {};
//           row.forEach((cell, i) => {
//             obj[headers[i]] = cell;
//           });
//           return obj;
//         });

//         jsonData = jsonData.concat(formattedData);
//       }
//     });

//     const result = {
//       Items: jsonData,
//       TotalResults: jsonData.length,
//       TotalPages: Math.ceil(jsonData.length / 10)
//     };

//     res.json({ data: result });
//   } catch (error) {
//     console.error('Error fetching or processing the Excel file:', error.message);
//     res.status(500).send('Error fetching or processing the Excel file.');
//   }
// });



app.put('/api/excel', async (req, res) => {
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
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 0 });
        const headers = data[0];
        const rows = data.slice(1);
        const formattedData = rows.map(row => {
          let obj = {};
          headers.forEach((header, i) => {
            obj[header] = row[i] || '';
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

    res.json({ data: result });
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



