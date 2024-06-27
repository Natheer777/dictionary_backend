const  mysql =require('mysql2')
const db= mysql.createPool({
  host: 'betejqbmtak0eaj63ctn-mysql.services.clever-cloud.com',
  user: 'ufeuignwbwarfssi',
  port: '3306',
  password: 'Te1G6CP4sznNaOGqQypN',
  database: 'betejqbmtak0eaj63ctn'
});

 db.getConnection(()=>{
console.log("connected good");
})

module.exports=db;