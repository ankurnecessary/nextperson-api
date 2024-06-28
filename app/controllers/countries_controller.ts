import Country from '#models/country'
import type { HttpContext } from '@adonisjs/core/http'

export default class CountriesController {
  /**
   * Display a list of countries matching our search criteria
   */
  async searchByName({ params, response }: HttpContext) {
    // Find countries whose name starts with searchParam in a case-insensitive manner
    const searchParam = params.searchParam
    const countries = await Country.query().whereRaw('LOWER(name) LIKE ?', [
      `${searchParam}%`.toLowerCase(),
    ])

    // Return the countries
    return response.json(countries)
  }

  /**
   * Save a new country
   */
  async create({ request, response }: HttpContext) {
    const countryName = request.only(['name'])
    const country = await Country.create(countryName)
    return response.status(201).json(country)
  }
}
