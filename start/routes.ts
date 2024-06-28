/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const PeopleController = () => import('#controllers/people_controller')
const CountriesController = () => import('#controllers/countries_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('people', [PeopleController, 'index'])
router.post('people', [PeopleController, 'store'])
router.get('people/:id', [PeopleController, 'show'])
router.put('people/:id', [PeopleController, 'update'])
router.delete('people/:id', [PeopleController, 'destroy'])

router.get('country/:searchParam', [CountriesController, 'searchByName'])
router.post('country', [CountriesController, 'create'])
