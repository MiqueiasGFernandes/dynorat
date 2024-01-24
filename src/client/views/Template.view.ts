import figlet from 'figlet'
import chalk from 'chalk'

export class TemplateView {
  showWelcomeTemplate (information: {
    author: string
    version: string
    title: string
    description: string
    repositoryUrl: string
  }): void {
    console.log(chalk.red(figlet.textSync(information.title, {
      font: 'Banner',
      horizontalLayout: 'full',
      verticalLayout: 'full'
    })))
    console.log(chalk.blue(figlet.textSync(`v${information.version}`, {
      font: 'Rectangles'
    })))
  }
}
