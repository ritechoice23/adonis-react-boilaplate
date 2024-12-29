import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import mail from '@adonisjs/mail/services/main'
import PasswordReset from '#models/forgot_password'
import hash from '@adonisjs/core/services/hash'
import { dd } from '@adonisjs/core/services/dumper'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import { route } from '@izzyjs/route/client'

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

        const hashToken = await hash.make(Math.random().toString())
        const token = await PasswordReset.create({
            email: request.input('email'),
            token: hashToken,
            expiredAt: DateTime.now().plus({ minutes: 5 }),
        })

        const resetUrl = app.makeURL(route('forgot_password.store', { token: token.token }).toString())

        await mail.send((message) => {
            message
                .to(request.input('email'))
                .from('info@example.org')
                .subject('Reset your password')
                .text(`Click the link below to reset your password: ${resetUrl}`)
        })
        session.flash('success', 'Password reset link successfully sent to your mail.')
        return response.redirect().back()
    }
}
