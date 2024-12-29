import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
import vine from '@vinejs/vine'

export default class PasswordResetsController {
    async create({ inertia }: HttpContext) {
        return inertia.render('auth/reset_password')
    }

    async store({ request, response, session }: HttpContext) {
        const validator = vine.compile(vine.object({
            email: vine.string().email().exists({
                table: 'users',
                column: 'email',
            })
        }))
        await validator.validate(request.all())
        session.flash('success', 'Password reset link successfully sent to your mail.')
        return response.redirect().back()
    }
}
