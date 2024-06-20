const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path'); 
const http = require("http");
require("dotenv").config();

const app = express();

// Configuration du body-parser pour de grandes entités
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Configuration CORS
var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8081'],
};
app.use(cors(corsOptions));

// Routes
const attestationRoute = require("./app/routes/attestation.routes");
const certifRoute = require("./app/routes/certif.routes");
const reclamationRoute = require("./app/routes/reclamation.routes");
const uploadRoute = require('./app/routes/upload.route'); 
const commentaireRoute = require("./app/routes/commentaire.route");
const calendarRoute = require("./app/routes/calendar.routes");
const eventRoute = require("./app/routes/event.routes");
const rattrapageRoute = require("./app/routes/rattrapage.routes");
const pricingRoute = require("./app/routes/pricing.routes");
const formulaireStageRoute = require("./app/routes/formulaireStage.routes");
const noteRoute = require("./app/routes/note.routes");
const notificationRoute = require("./app/routes/notification.routes");
const noteInfoRoute = require("./app/routes/noteInfo.routes");
const emploiRoutes = require("./app/routes/emploi.routes");
const classeRoutes = require("./app/routes/classe.routes");
const absenceRoutes = require("./app/routes/absence.routes");
const contactprofRoute = require("./app/routes/contact.prof.routes");
const annonceRoute = require("./app/routes/annonce.routes");
const fileRoute = require("./app/routes/file.routes");
const impressionprofRoute = require("./app/routes/impression.prof.routes");
const materielprofRoute = require("./app/routes/materiel.prof.routes");
const stagescolRoute = require("./app/routes/stage.scol.routes");
const projetscolRoute = require("./app/routes/projet.scol.routes");
const courseRoute = require("./app/routes/cours.routes"); 
const conversationRoute = require("./app/routes/conversation.route");
const messageRoute = require("./app/routes/message.route");
const notifmessageRoute = require("./app/routes/notifmessage.route");
const downloadRoutes = require('./app/routes/download.routes');

const { Server } = require("socket.io");
 const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });


app.use('/download', downloadRoutes);
app.use("/attestation", attestationRoute);
app.use("/certif", certifRoute);
app.use("/rattrapage", rattrapageRoute);
app.use("/annonce", annonceRoute); 
app.use("/file", fileRoute);
app.use("/impressionProf", impressionprofRoute);
app.use("/materielProf", materielprofRoute);
app.use("/contactProf", contactprofRoute);
app.use("/stageScol", stagescolRoute);
app.use("/projetScol", projetscolRoute);
app.use('/upload', uploadRoute); 
app.use("/pricing", pricingRoute);
app.use("/event", eventRoute);
app.use("/reclamation", reclamationRoute);
app.use("/calendar", calendarRoute); 
app.use("/commentaire", commentaireRoute); 
app.use("/formulaireStage", formulaireStageRoute);
app.use("/note", noteRoute);
app.use("/notification", notificationRoute);
app.use("/noteInfo", noteInfoRoute);
app.use("/emploi", emploiRoutes);
app.use('/classe', classeRoutes);
app.use('/absences', absenceRoutes);
app.use("/cours", courseRoute);
app.use("/app/message", messageRoute);
app.use("/app/conversation", conversationRoute);
app.use("/app/notifmessage", notifmessageRoute);

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Body parser and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Compus application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);


  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
   
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

const db = require("./app/models");
const Role = db.role;

 db.mongoose
   .connect(`mongodb+srv://appChat:123@cluster0.oqcxqhm.mongodb.net/Compus`)
   .then(() => {
     console.log("Successfully connect to MongoDB.");
     initial();
   })
   .catch((err) => {
     console.error("Connection error", err);
     process.exit();
   });

// const connectDB = require("./app/config/db.config");
// connectDB();

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not found" 
    });
});

async function initial() {
  try {
    let count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await addRole("etudiant");
      await addRole("modScolarite");
      await addRole("prof");
      await addRole("admin");
    }
  } catch (err) {
    console.error("Initial role setup error: ", err);
  }
}

async function addRole(roleName) {
  try {
    const role = new Role({ name: roleName });
    await role.save();
    console.log(`added '${roleName}' to roles collection`);
  } catch (err) {
    console.error(`Error adding role ${roleName}: `, err);
  }
}
