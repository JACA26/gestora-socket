const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Comentarios = require("./models/comentarios");
const Usuarios = require("./models/usuarios");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	}
});

const userControl = new Usuarios();
const comentarioControl = new Comentarios();

/* Usuario conectado */
io.on("connection", (client) => {
	/* 
        Cuando el usuario entre al live,
        aumentará los viewers y retorna los últimos 5 
        usuarios para el avatar list
    */
	client.on("joinChat", (data, callback) => {
		const { idUser, idSocket, name, lastName, avatar } = data;
		
		//añadir usuario a la lista que controlará el pico máximo de usuarios conectados
		userControl.addMaxUser(idUser, name, lastName);
		
		//añadir usuario a la lista de usuarios conectados
		const userData = userControl.addUser(
			idUser,
			idSocket,
			name,
			lastName,
			avatar
		);
		const { numberOfUsers } = userData;
		
		const dataToEmit = {
			numberOfUsers,
			preview5Users: userControl.getPreviewUsers(),
		};
		
		client.broadcast.emit("usersActive", dataToEmit);
		
		callback(dataToEmit);
	});
	
	/* Estar a la escucha de sendMessage */
	client.on("sendMessage", (messageData, callback) => {
		const { idUser, comment, likes, date } = messageData;
		
		const userFromMessage = userControl.getUser(idUser);
		
		const commentData = comentarioControl.addComment(
			userFromMessage,
			comment,
			date,
			likes
		);
		
		/* Enviar mensaje a todos los usuarios conectados */
		client.broadcast.emit("printMessage", commentData);
		
		/* Retornar el mensaje del emisor en un callback para que sea renderizado por el propio usuario */
		callback(commentData);
	});
	
	/* Usuario desconectado */
	client.on("disconnect", () => {
		const dataDisconnect = userControl.deleteUser(client.id);
		const { numberOfUsers } = dataDisconnect;
		const dataToEmit = {
			numberOfUsers,
			preview5Users: userControl.getPreviewUsers(),
		};
		client.broadcast.emit("usersActive", dataToEmit);
	});
});

httpServer.listen(3015, () => {
	console.log("Servidor corriendo en puerto 3015");
});