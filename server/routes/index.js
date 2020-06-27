const express = require('express');
const router  = express.Router();

const nosotrosControllers = require('../controllers/nosotrosController');
const homeControllers = require('../controllers/homeController');
const viajeControllers = require('../controllers/viajesController');
const testimonialControllers = require('../controllers/testimonialesController');

module.exports = function() {

    router.get('/', homeControllers.consultasHomepage);
    router.get('/nosotros', nosotrosControllers.infoNosotros); 
    router.get('/viajes', viajeControllers.mostrarViajes ); 
    router.get('/viajes/:id', viajeControllers.MostrarViaje);        
    router.get('/testimoniales', testimonialControllers.mostrarTestimoniales); 
    router.post('/testimoniales', testimonialControllers.postTestimonial ); 

    return router;
}

