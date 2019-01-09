const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()


//la ruta que almaceno en el register.js hace un post en /user, de manera que tendré que 
//conectar el form de la plantilla tanto a register como a user, quedando la etiqueta form
//vinculada a ambas rutas a través del action="/register/user"
//IMPORTANTE importar el register.js en app.js y vincularlo a la ruta /register
router.post('/user', (req, res) => {
  const body =  req.body

  res.json({
    confirmation: 'Success',
    rute: "Register",
    data: body
  })
})

module.exports = router