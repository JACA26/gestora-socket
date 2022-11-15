
const uniqid = require('uniqid');


class Comentarios {
    
    constructor(){
        this.comentarios = [];
    }
    
    addComment(usuario, comentario, fecha, likes){
        let comentarioObj = { 
            idComment: uniqid('comentario-'),
            usuario,
            comentario,
            fecha,
            likes
        };
        this.comentarios.unshift(comentarioObj);
        return comentarioObj;
    }
    
    getComment(id){
        let comentario = this.comentarios.filter( comentarioFind => comentarioFind.usuario.idUser === id)[0];
        return comentario;
    }
    
    getAllComments(){
        return this.comentarios;
    }
    
    deleteComment(id){
        let comentarioDelete = this.getComentario(id);
        this.comentarios = this.comentarios.filter( comentarioFind => comentarioFind.usuario.idUser != id);
        
        return comentarioDelete;
    }
}

module.exports = Comentarios;