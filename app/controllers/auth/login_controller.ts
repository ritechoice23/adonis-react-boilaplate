// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import User from '#models/user'

export default class LoginsController {
  public async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    await loginValidator.validate(request.all())
    const { password, email } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user, request.input('remember_me', false))
    return response.redirect().toRoute('home')
  }
}
