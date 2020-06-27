const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales =  async (req,res) => {
    const testimoniales = await  Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales', 
            testimoniales
        });  
}


exports.postTestimonial = async (req,res) => {
 
    let {nombre, correo, mensaje} = req.body;
    
    let errores = [];
    if(!nombre){
        errores.push({'mensaje' : 'agrega nombre' });
    }
    if(!correo){
        errores.push({'mensaje' : 'agrega correo' });
    }
    if(!mensaje){
        errores.push({'mensaje' : 'agrega mensaje' });
    }

    if(errores.length > 0){
       const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje  
        })
    }else{
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then(testimonial => res.redirect('/testimoniales'))
          .catch(error => console.log(error));
    }

}