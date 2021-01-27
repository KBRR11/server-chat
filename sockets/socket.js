const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
const { getUsuarios } = require('../controllers/usuarios');


// Mensajes de Sockets
io.on('connection', client => {
    
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticación
    if (!valido) {
       return client.disconnect();
    }
    //cliente autenticado
    console.log(client.handshake.headers['useremail'], ' CONECTADO: '+valido);
    usuarioConectado(uid);
    //io.emit('userConnected', getUsuarios()); //PROBAR FUNCIONAMIENTO pero con Broadcast para que no le llegue a quien lo emitió, solo a los demás

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    

    //client.on('mensaje', ( payload ) => {
    //    console.log('Mensaje', payload);
//
    //    io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
//
    //});


});
    