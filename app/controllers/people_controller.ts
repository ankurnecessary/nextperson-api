// import type { HttpContext } from '@adonisjs/core/http'

import Country from '#models/country'
import Person from '#models/person'
import { HttpContext } from '@adonisjs/core/http'

export default class PeopleController {
  /**
   * Return all the people in the database
   */

  async index() {
    // return list of people
    const people = await Person.query().preload('country').orderBy('firstName', 'asc')
    return people
  }

  /**
   * Save a new person
   */
  async store({ request, response }: HttpContext) {
    // Retrieve data from the request
    const personData = request.only(['firstName', 'lastName', 'phone', 'dateOfBirth', 'countryId'])

    // Create a new person
    const person = await Person.create(personData)

    // Preload the country relation
    await person.load('country')

    // Return the newly created person along with the loaded country data
    return response.status(201).json(person)
  }

  /**
   * Retrieve a value of a particular person
   */
  async show({ params, response }: HttpContext) {
    // return a person by its id
    const person = await Person.query().where('id', params.id).preload('country').firstOrFail()
    return response.json(person)
  }

  /**
   * Update a person
   */
  async update({ params, request, response }: HttpContext) {
    // Retrieve the person by ID
    const person = await Person.findOrFail(params.id)

    // Get the new data from the request
    const personData = request.only(['firstName', 'lastName', 'phone', 'dateOfBirth', 'countryId'])

    // Update the person with the new data
    person.merge(personData)

    // Save the updated person
    await person.save()

    // Preload the country relation
    await person.load('country')

    // Return the updated person
    return response.status(200).json(person)
  }

  /**
   * Delete a person
   */
  async destroy({ params, response }: HttpContext) {
    // Retrieve the person by ID
    const person = await Person.findOrFail(params.id)

    // Delete the person
    await person.delete()

    // Return a success message
    return response.status(200).json({ message: 'Person deleted successfully' })
  }
}
