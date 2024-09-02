import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/config.js'


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
    res.render('main.ejs', {
        brand_name: "astro geeks",
        currentPath: req.path
    });
});

app.get('/add-secret', (req, res) => {
    res.render('add-secret.ejs', {
        currentPath: req.path
    });
});

app.post('/add-secret', async (req, res) => {
    try {
        const { secret_text, secret_category, secret_severity, your_name, anonymous } = req.body;

       

        console.log(req.body); 
        const success = true;
        const message = "Secret successfully added!";
        res.render('add-secret.ejs', {
            currentPath: req.path,
            success: success,
            message: message
        });
    } catch (error) {
        console.error(error);
        console.log('log')
        const success = false;
        const message = "There was an error adding your secret. Please try again later.";
        res.render('add-secret.ejs', {
            currentPath: req.path,
            success: success,
            message: message
        });
    }
});


app.get('/show-my-secrets', (req, res) => {
    res.render('my-secrets.ejs', {
        currentPath: req.path
    });
});

// Start the server
db.connect().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });   
}).catch((err)=>{
    if(err.message==`password authentication failed for user "postgres"`){
        console.log("database auth failed")
    }else{

        console.log("There was an error and server cannot be started...")
    }
})
