import figlet from 'figlet'

export class TemplateView {
  async showWelcomeTemplate (information: {
    author: string
    version: string
    title: string
    description: string
    repositoryUrl: string
  }): Promise<void> {
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
