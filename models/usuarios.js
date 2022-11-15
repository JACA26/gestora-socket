

/* 
    const user = {
        idUser: 1,
        nombre: "Juan",
        apellido: "Perez",
        image: "/images/user_2.png",
    }
*/


class Usuarios {
    
    constructor(){
        this.personas = [];
        this.maxUsers = [];
    }
    
    addUser(idUser, idSocket, nombre, apellido, avatar){
        
        const userExist = this.getUser(idUser);
        if(userExist){
            return {
                message: "Usuario ya existe",
                numberOfUsers: this.personas.length
            }
        }else{
            let user = { idUser, idSocket, nombre, apellido, avatar };
            const numberOfUsers = this.personas.push(user);
            return {
                message: "Usuario agregado",
                numberOfUsers
            }
        }
        
    }
    
    addMaxUser(idUser, nombre, apellido){
        const userExist = this.getUserFromMaxUsers(idUser);
        if(userExist) return;
        let user = { idUser, nombre, apellido };
        this.maxUsers.push(user);
    }
    
    getUser(id){
        let user = this.personas.filter( userFind => userFind.idUser === id)[0];
        return user;
    }
    
    getUserFromMaxUsers(idUser){
        let user = this.maxUsers.filter( userFind => userFind.idUser === idUser)[0];
        return user;
    }
    
    getNumberOfMaxUsers(){
        return this.maxUsers.length;
    }
    
    getAllUsers(){
        return this.personas;
    }
    
    getNumberOfUsers(){
        return this.personas.length;
    }
    
    getPreviewUsers(numberOfUsers = 5){
        
        if(numberOfUsers > this.personas.length){
            return this.personas;
        }else{
            return this.personas.slice(0, numberOfUsers);
        }
        
    }

    deleteUser(idSocket){
        this.personas = this.personas.filter( userFind => userFind.idSocket != idSocket);
        const numberOfUsers = this.personas.length;
        
        return {
            message: "Usuario eliminado",
            numberOfUsers
        }
    }
}

module.exports = Usuarios;