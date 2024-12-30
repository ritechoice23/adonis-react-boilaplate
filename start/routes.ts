/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import ResetPasswordsController from '#controllers/auth/reset_passwords_controller'
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')

const LoginsController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')


router.jobs()
router
    .get('/', async function ({ inertia }) {
        return inertia.render('home')
    })
    .as('home')
    .use(middleware.auth())

router.get('/login', [LoginsController, 'create']).as('login.create').use(middleware.guest())
router.post('/login', [LoginsController, 'store']).as('login.store').use(middleware.guest())

router
    .get('auth/forgot-password', [ForgotPasswordController, 'create'])
    .as('forgot_password.create')
    .use(middleware.guest())

router.post('auth/forgot-password', [ForgotPasswordController, 'store'])
    .as('forgot_password.store')
    .use(middleware.guest())

router
    .get('auth/reset-password/:token', [ResetPasswordsController, 'create'])
    .as('reset_password.create')
    .use(middleware.guest())

router.post('auth/reset-password/:token', [ResetPasswordsController, 'store'])
    .as('reset_password.store')
    .use(middleware.guest())

router
    .post('logout', async ({ auth, response }) => {
        await auth.use('web').logout()
        return response.redirect('/login')
    })
    .as('logout')
    .use(middleware.auth())

router
    .get('/register', [RegisterController, 'create'])
    .as('register.create')
    .use(middleware.guest())

router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())
