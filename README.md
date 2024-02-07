```
                                                      
 #####   #   #  #    #   ####   #####     ##    ##### 
 #    #   # #   ##   #  #    #  #    #   #  #     #   
 #    #    #    # #  #  #    #  #    #  #    #    #   
 #    #    #    #  # #  #    #  #####   ######    #   
 #    #    #    #   ##  #    #  #   #   #    #    #   
 #####     #    #    #   ####   #    #  #    #    #   
                                                      
                                           
     ___   ___     ___     _       _       
 _ _|   | |_  |   |   |___| |_ ___| |_ ___ 
| | | | |_ _| |_ _| | |___| . | -_|  _| .'|
 \_/|___|_|_____|_|___|   |___|___|_| |__,|
                                           
```

> Projeto em desenvolvimento, o Dyno Remote Administration Tool é uma ferramenta de administração remota no estilo conexão reversa. No momento, possui suporte apenas para linha de comandos e foi testado apenas em ambientes Linux.
> OBSERVAÇÂO: Ferramenta deve ser utilizada apenas em ambientes controlados, não apoiamos qualquer prática ilegal por parte dos utilizadores


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Nvm
- Node 18.19.0

Compatibilidade de Sistemas Operecionais Verificada

|  Executável   |  Linux x86   |  Linux amd_64  |  Windows x86  |  Windows x86   |
|---------------|--------------|----------------|---------------|----------------|
| Servidor      |     OK       |      OK        |     NOK       |     NOK        |
| Cliente       |     NOK      |      NOK       |     NOK       |     NOK        |

## 🚀 Instalando DynoRAT

Para instalar o DynoRAT, siga estas etapas:

Linux e macOS:

```
nvm use
npm install
npm run client
```

## ☕ Usando DynoRAT

Para usar DynoRAT, siga estas etapas:

```
$ npm run client
```

```
➜  dynorat git:(master) ✗ npm run client

> dynorat@0.1.0-beta client
> ts-node ./src/client/index.ts

                                                      
 #####   #   #  #    #   ####   #####     ##    ##### 
 #    #   # #   ##   #  #    #  #    #   #  #     #   
 #    #    #    # #  #  #    #  #    #  #    #    #   
 #    #    #    #  # #  #    #  #####   ######    #   
 #    #    #    #   ##  #    #  #   #   #    #    #   
 #####     #    #    #   ####   #    #  #    #    #   
                                                      
                                           
     ___   ___     ___     _       _       
 _ _|   | |_  |   |   |___| |_ ___| |_ ___ 
| | | | |_ _| |_ _| | |___| . | -_|  _| .'|
 \_/|___|_|_____|_|___|   |___|___|_| |__,|
                                           
(dyno)-> help

Usage: [command] [options]

Commands:
  clear              Clean the CLI display
  server [options]   Servers to connect
  session [options]  Listen for open sessions
  exit               Exit from execution
  help [command]     display help for command

(dyno)-> 
```

Para iniciar o servidor de testes basta executar:

```
npm run server
```

Logo em seguida, as informações da nova sessão poderão ser exibidas em da seguinte maneira:

```
(dyno)-> session -l
┌──────┬─────────────────┬─────────┬──────────┬───────────────────┬──────────┬───────────┬───────┬─────┐
│ # ID │ IP Address      │ Country │ User     │ Hostname          │ Latitute │ Longitute │ OS    │ CPU │
├──────┼─────────────────┼─────────┼──────────┼───────────────────┼──────────┼───────────┼───────┼─────┤
│ 1    │ 189.222.190.241 │ Brazil  │ codecx   │ xubuntu           │ -20.0087 │ -40.8411  │ Linux │ x64 │
└──────┴─────────────────┴─────────┴──────────┴───────────────────┴──────────┴───────────┴───────┴─────┘
(dyno)-> 

```

Os demais comandos de navegação podem ter suas opções exibidas com o comando:
```
help [command]
```


## 😄 Seja um dos contribuidores

Quer fazer parte desse projeto? Veja como contribuir:

Para contribuir com DynoRAT, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin DynoRAT / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 📝 Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

## Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:
- [x] Listagem e interação com diferentes sessões
- [x] Melhorar a variedade de comandos para navegação
- [ ] Geração de binário para distribuição (Build compilada)
- [ ] Melhoria na exibição das mensagens em CLI
- [ ] Permitir suporte para ambientes microsoft Windows
- [ ] Configuração de servidor para persistência na máquina de instalação
- [ ] Exploração de escalação de privilégio em ambientes Windows/Linux
- [ ] Monitoramento de teclas, tela e upload/download de arquivos entre cliente e servidor
- [ ] Ofuscamento e encriptação de servidor
