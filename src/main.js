const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
const throwError = require("./throw-error");

const defaultRedirectTo = "/";
const port = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    database.getUsers((users) => {
        const listHtml = users.map(user => `<li>${user.name}</li>`).join('');

        res.send(`
            <head></head>
            <body>
                <h1>Full Cycle Rocks!</h1>

                <div style="margin-bottom: 20px;">
                    <form action="/users" method="post">
                        <label for="name">Nome:</label><br>
                        <input type="text" id="name" name="name"><br>
                        <input type="submit" value="Cadastrar">
                    </form>
                </div>

                <h2>Usuários:</h2>
                <ul>${listHtml}</ul>
            </body>
        `);
    }, throwError);
});

app.post('/users', (req, res) => {
    const name = req.body?.name;

    if (!name) {
        res.redirect(defaultRedirectTo);
        return;
    }

    database.setUsers(name, () => {
        // res.status(201).json({ message: 'success' });
        res.redirect(defaultRedirectTo);
    }, error => {
        console.error(error);
        res.redirect(defaultRedirectTo);
    });
})

app.listen(port);
