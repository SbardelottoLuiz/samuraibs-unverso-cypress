import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('Quando o usuário é novato', function () {
        const user = {
            name: 'Luiz',
            email: 'luiz@samurai.com',
            password: 'abc123'
        }
        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })
        it('deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.sholdHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

    })

    context('Quando o E-mail já existe', function () {
        const user = {
            name: 'Luiz Henrique',
            email: 'luizhenrique@samuraibs.com',
            password: 'abc123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request('POST',
                'http://localhost:3333/users',
                user).then(function (response) {
                    expect(response.status).to.eq(200)
                })
        })
        it('Não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.sholdHaveText('Email já cadastrado para outro usuário.')
        })

    })

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Jociane',
            email: 'jociane#samurai.com',
            password: 'abc123',
        }

        it('deve exibir mensagem de alerta', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        })

    })

    context('Quando a senha tem menos de 6 carcteres', function () {
        const password = ['1', '12', '123']
        beforeEach(function () {
            signupPage.go()
        })

        password.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {
                const user = {
                    name: 'Jociane', email: 'jociane@samurai1.com', password: p
                }
                signupPage.form(user)
                signupPage.submit()

            })
        })
        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('Quando não preencho campos obrigatorios', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })
        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)
            })

        })

    })

})