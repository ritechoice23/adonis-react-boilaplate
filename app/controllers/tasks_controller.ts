import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class TasksController {
  async store({ request, response, session }: HttpContext) {
    // const avatar = request.file('image')
    // await avatar?.move(app.makePath('storage/uploads'))
    const validator = vine.compile(vine.object({ task: vine.string() }))
    await validator.validate(request.all())
    await Task.create({ task: request.input('task') })
    session.flash('message', 'task created successfully')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
    session.flash('message', 'task deleted successfully')
    return response.redirect().back()
  }
}
