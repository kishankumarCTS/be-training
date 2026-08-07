const http = require("http");
const { getRequestBody, sendJSONResponse } = require("./utils/utils");

const PORT = 3000;
const HOST_NAME = "localhost";
const BASE_URL = `http://${HOST_NAME}:${PORT}`;
let notes = [];
let nextId = 1;

const server = http.createServer(async (req, res) => {
  const pathName = req.url.split("?")[0];
  const method = req.method;
  let body = "";

  // Get notes
  if (method === "GET" && pathName === "/notes") {
    return sendJSONResponse(res, 200, notes);
  }

  //   Create note
  if (method === "POST" && pathName === "/notes") {
    const body = await getRequestBody(req);
    if (!body.note) {
      return sendJSONResponse(res, 400, {
        message: "title and content are required",
      });
    }
    const note = {
      id: nextId++,
      note: body.note,
    };

    notes.push(note);
    return sendJSONResponse(res, 201, note);
  }

  // Get note by id
  const pathParts = pathName.split("/");
  if (pathParts.length === 3 && pathParts[1] === "notes") {
    const noteId = Number(pathParts[2]);
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return sendJSONResponse(res, 404, {
        message: `Note not found with id ${noteId}`,
      });
    }

    // GET Single note
    if (method === "GET") {
      const note = notes[noteIndex];
      return sendJSONResponse(res, 200, note);
    }

    // PUT for a note
    if (method === "PUT") {
      const body = await getRequestBody(req);
      notes[noteIndex] = {
        ...notes[noteIndex],
        note: body?.note || "",
      };

      return sendJSONResponse(res, 200, notes[noteIndex]);
    }

    // DELETE a note
    if (method === "DELETE") {
      notes = notes.filter((note) => note.id !== noteId);
      return sendJSONResponse(res, 200, notes);
    }
  }

  sendJSONResponse(res, 404, { message: "Route not found" });
});

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server listening on port ${PORT}`);
});
