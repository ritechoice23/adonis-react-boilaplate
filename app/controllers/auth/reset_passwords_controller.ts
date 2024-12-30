import PasswordReset from '#models/password_reset'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export default class ResetPasswordsController {
  async create({ inertia, params, session }: HttpContext) {
    const tokenFromDb = await PasswordReset.query()
      .where('token', params.token)
      .where('expired_at', '>', DateTime.now().toString())
      .first()
    if (!tokenFromDb) {
      session.flash('errors', 'Password reset link has expired')
    }
    return inertia.render('auth/reset_password', { token: params.token })
  }

  async store({ response, session, request, params }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        password: vine.string().minLength(2).confirmed(),
      })
    )

    validator.validate(request.all())
    const tokenFromDb = await PasswordReset.query()
      .where('token', params.token)
      .where('expired_at', '>', DateTime.now().toString())
      .first()
    if (!tokenFromDb) {
      session.flash('errors', 'Password reset link has expired')
      return response.redirect().back()
    }

    const user = await User.findByOrFail('email', tokenFromDb.email)

    user.password = request.input('password')
    await user.save()
    tokenFromDb.delete()
    session.flash('success', 'Password reset successfully, please login')
    // return response.redirect().toRoute('login.create');
    return response.redirect().back()
  }
}
