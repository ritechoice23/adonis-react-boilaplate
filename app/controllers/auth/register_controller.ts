// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import User from '#models/user'

export default class RegisterController {
  public async create({ inertia, auth }: HttpContext) {
    await auth.check()
    return inertia.render('auth/register')
  }

  async store({ request, auth, response }: HttpContext) {
    const data = await registerValidator.validate(request.all())
    const user = await User.create(data)
    await auth.use('web').login(user)
    response.redirect().back()
  }
}
