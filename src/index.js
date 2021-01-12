const express = require('express');

const app = express();

app.use(express.json());

app.post('/projects', (request, response) => {
    const { project, date } = request.body;

    console.log(project);
    console.log(date);

    return response.json([
        "project 1",
        "project 2",
        "project 3",
        "project 4",
    ]);
})

app.get('/projects', (request, response) => {
    const { page, index } = request.query;

    console.log(page);
    console.log(index);

    return response.json([
        "project 1",
        "project 2",
        "project 3",
        "project 4",
    ]);
})


app.put('/projects/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    return response.json([
        "project 5",
        "project 4",
        "project 3",
        "project 2",
    ]);
})

app.patch('/projects/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    return response.json([
        "project 5",
        "project 4",
        "project 3",
        "project 1",
    ])
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    return response.json([
        "project 5",
        "project 4",
        "project 3",
    ])
});


app.listen(3333, () => {
    console.log("Server Started 💵")
});
