// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const profiles = {
	ehooper: {
		image: '/images/ehooper.jpg',
		username: 'ehooper',
		name: 'Elena',
		company: 'VegaLife',
		languages: ['marciano', 'español cansado', 'álgebra']

	},
	eparrado: {
		image: '/images/eparrado.jpg',
		username: 'eparrado',
		name: 'Estela',
		company: 'Lays',
		languages: ['ronroneo', 'español']

	}
}

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
		})
	const data = {
		profiles: list
	}	

	res.render('profiles', data)
})

//usamos query parameters o request parameters para renderizar contenido dinámico
//los 4 métodos más importantes de comunicación HTTP son: POST, GET, PUT, DELETE

router.post('/addprofile', (req, res) => {
	const body = req.body
	body['languages'] = req.body.languages.split(', ')
	profiles[body.username] = body

	res.redirect('/profile/' + body.username)
})

router.get('/query', (req, res) => {
	//esta query la usamos para poder pasarle en la ruta algo como (...)/query?name=blabla
	//de manera que ese name es la clave y el blabla el valor
	//así es como podemos parámetros query a una petición
	//puedo añadir más parámetros a la petición uniéndolos con un & 
	//si quiero añadir espacios %20
	const name = req.query.name
	const occupation = req.query.occupation

	//en vez de devolver un json, la respuesta renderizará en la plantilla profile la data
	const data = {
		name: name,
		occupation: occupation
	}

	res.render('profile', data);

	// res.json({
	// 	name: name,
	// 	occupation: occupation
	// })
})

router.get('/:path', (req, res) => {
	const path = req.params.path
	
	res.json({
		data: path
	})
})

router.get('/:profile/:username', (req, res) => {
	const profile = req.params.profile
	const username = req.params.username
	const currentProfile = profiles[username]
	
	if(currentProfile == null) {
		res.json({
			confirmation: 'fail',
			message: 'Profile ' + username + ' not found'
		})

		return;
	} 


	res.render('profile', currentProfile)
})

module.exports = router
