import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import mail from '@adonisjs/mail/services/main'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import PasswordReset from '#models/password_reset'

export default class ForgotPasswordController {
    async create({ inertia }: HttpContext) {
        return inertia.render('auth/forgot_password')
    }

    async store({ request, response, session }: HttpContext) {
        const validator = vine.compile(vine.object({
            email: vine.string().email().exists({
                table: 'users',
                column: 'email',
            })
        }))
        await validator.validate(request.all())

        const hashToken = await Math.random().toString()
        const token = await PasswordReset.create({
            email: request.input('email'),
            token: hashToken,
            expiredAt: DateTime.now().plus({ minutes: 5 }),
        })

        const resetUrl = `http://localhost:3333/auth/reset-password/${token.token}`

        await mail.send((message) => {
            message
                .to(request.input('email'))
                .from('info@example.org')
                .subject('Reset your password')
                .html(`
                    Click the link below to reset your password: 
                    <a href="${resetUrl}">Reset Password</a>
                    `)
        })
        session.flash('success', 'Password reset link successfully sent to your mail.')
        return response.redirect().back()
    }
}
