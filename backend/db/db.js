import mysql from 'mysql2';

const createConnections=()=>{
    const connections=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'railway'
    });
    connections.connect((err)=>{
        if(err){
            console.log('Error in connecting to database',err);
        }
        else{
            console.log('Connected to database');
        }
    })
}
export default createConnections;