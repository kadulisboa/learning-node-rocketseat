const express = require('express');
const { v4: uuid } = require('uuid');


const app = express();

app.use(express.json());

const projects = [];

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner }

    projects.push(project);

    return response.json(project);
})

app.get('/projects', (request, response) => {
    const { title } = request.query;

    console.log(title);

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects

    return response.json(results);

})


app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        response.status(400).json({ error: "Project Not Found" });
    };

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
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

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {

        return response.status(400).json({
            error: "Project Not Found"
        });

    }

    projects.splice(projectIndex, 1);

    return response.send();
});


app.listen(3333, () => {
    console.log("Server Started 💵")
});
