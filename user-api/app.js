const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
var cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' })


// bycript
const bcryptjs = require('bcryptjs');

//  Variables de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//Conexion
const connection = require('./database/db')

// Registro 
app.post('/register', async (req, resp) => {
    // Campos username, name, password
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        let pwdHash = await bcryptjs.hash(password, 8);  // encript pwd
        connection.query('INSERT INTO users2 SET ?', { username: username, email: email, password: pwdHash }, async (error, results) => {
            if(error){
                resp.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: results },'secret')
                resp.send({ status: 1, data: results, token : token });
            }
        })
    } catch (error) {
        resp.send({ status: 0, error: error });
    }
})

// Autenticacion
app.post('/login', async (req, resp) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        let pwdHash = await bcryptjs.hash(password, 8);

        if(username && password) {
            connection.query(`Select * From users2 Where username = ? `, [username], async (error, results) => {
                if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
                    resp.send({ status: 0, data: error });
                }else{
                    let token = jwt.sign({ data: results },'secret')
                    resp.send({ status: 1, data: results, token: token });
                }
            })
        }        
    } catch (error) {
        resp.send({ status: 0, data: error });
    }
})


app.get('/', (req, resp) => {
    resp.send('API version 1.0.0')
});

app.listen(4000, () => {
    console.log('listening on port 4000');
})