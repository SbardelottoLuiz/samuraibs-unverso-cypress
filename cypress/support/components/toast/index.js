import { el } from './elements'

class Toast {
    sholdHaveText(expectTExt) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectTExt)
    }
}
export default new Toast()