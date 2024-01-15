import figlet from 'figlet'

export class TemplateView {
  showWelcomeTemplate (information: {
    author: string
    version: string
    title: string
    description: string
    repositoryUrl: string
  }): void {
    console.log(figlet.textSync(information.title, {
      font: 'Banner',
      horizontalLayout: 'full',
      verticalLayout: 'full'
    }))
    console.log(figlet.textSync(`v${information.version}`, {
      font: 'Rectangles'
    }))
  }
}
