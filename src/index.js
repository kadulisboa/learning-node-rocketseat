const express = require('express');
const { v4: uuid, validate } = require('uuid');


const app = express();

app.use(express.json());

const projects = [];

const logRequest = function (request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

function validateProject(request, response, next) {
    const { id } = request.params;

    if (!validate(id)) {
        return response.status(400).json({ error: "Invalid Project ID" });
    }

    return next();
}


app.use(logRequest);
app.use('/projects/:id', validateProject)


app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner }

    projects.push(project);

    return response.json(project);
})


app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects

    return response.json(results);

})


app.put('/projects/:id', validateProject, (request, response) => {
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
