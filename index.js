import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import { format } from 'date-fns'

const porta = 3000
const host = '0.0.0.0'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: "Vi543Vale634Sil1234",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))

var listaUsuario = []

function listaDeUsuarios(requisicao, resposta){
  const dados = requisicao.body
  let conteudoResposta = ''

  if(!(dados.nome && dados.email && dados.data && dados.nick && dados.senha)){
    conteudoResposta = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastrar Usuários</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <header>
          <h1>Preencha o formulário abaixo!</h1>
        </header>

        <main>
          <form action="/listaUsuarios" method="post">
            <label for="inome">Nome: </label>
            <input type="text" name="nome" id="inome" placeholder="Digite o seu nome." value="${dados.nome}"><br> `
    
    if(!dados.nome){
      conteudoResposta += `<p>Informe o nome!</p>`
    }

    conteudoResposta += `
            <label for="iemail">Email: </label>
            <input type="email" name="email" id="iemail" placeholder="Digite o seu email." value="${dados.email}"><br> `

    if(!dados.email){
      conteudoResposta += `<p>Informe o email!</p>`
    }

    conteudoResposta += `
            <label for="idata">Data de Nascimento: </label>
            <input type="date" name="data" id="idata" value="${dados.data}"><br> `

    if(!dados.data){
      conteudoResposta += `<p>Informe a data de nascimento!</p>`
    }

    conteudoResposta += `
            <label for="inick">Nickname: </label>
            <input type="text" name="nick" id="inick" placeholder="Digite um nikname." value="${dados.nick}"><br> `

    if(!dados.nick){
      conteudoResposta += `<p>Informe o nickname!</p>`
    }

    conteudoResposta += `
            <label for="isenha">Senha: </label>
            <input type="password" name="senha" id="ivenda" placeholder="Digite uma senha." value="${dados.senha}"><br> `

    if(!dados.senha){
      conteudoResposta += `<p>Informe a senha!</p>`
    }

    conteudoResposta += `
            <button type="submit">Criar</button>
          </form>
        </main>
      </body>
      </html>`

    resposta.end(conteudoResposta)
  }
  else{
    const usuarios = {
      nome: dados.nome,
      email: dados.email,
      data: dados.data,
      nick: dados.nick,
      senha: dados.senha
    }

    listaUsuario.push(usuarios)

    conteudoResposta = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Usuários</title>  
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <header>
          <h1>Lista de Usuários!</h1>
        </header>

        <main>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>Nickname</th>
              </tr>
            </thead>

            <tbody> `

    for(let i = 0; i < listaUsuario.length; i++){
      const dataFormatada = format(new Date(listaUsuario[i].data), 'dd/MM/yyyy')

      conteudoResposta += `
              <tr>
                <th>${listaUsuario[i].nome}</th>
                <th>${listaUsuario[i].email}</th>
                <th>${dataFormatada}</th>
                <th>${listaUsuario[i].nick}</th>
              </th> `
    }

    conteudoResposta += `
            </tbody>
          </table>

          <a href="/">Voltar a tela de menu</a>
          <a href="/cadastrarUsuario.html">Voltar para tela de cadastro</a>
        </body>
        </html> `

    resposta.end(conteudoResposta)
  }
}

function autenticar(requisicao, resposta, next){
  if(requisicao.session.usuarioAutenticado){
    next()
  }
  else{
    resposta.redirect("/login.html")
  }
}

app.post('/login', (requisicao, resposta) => {
  const usuario = requisicao.body.usuario
  const senha = requisicao.body.senha

  if(usuario && senha && (usuario == "vitor") && (senha == "123")){
    requisicao.session.usuarioAutenticado = true
    resposta.redirect('/')
  }
  else{
    resposta.end(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invalido</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <header>
          <h1>Usuario ou senha invalido!</h1>
        </header>
        <main>
          <a href="/login.html">Voltar ao login.</a>
        </main>
      </body>
      </html>
    `)
  }
})

var mensagens = []

app.get('/batePapo', autenticar, (requisicao, resposta) => {
  const dadosMensagem = requisicao.query
  let conteudo = ''
  const data = new Date()

  resposta.cookie("horarioDeEnvio", data.toLocaleString(), {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
  })

  const horaDaMensaegm = requisicao.cookies.horarioDeEnvio

  if(dadosMensagem.sms && dadosMensagem.sms.trim() !== '' && dadosMensagem.OpcaoUsuario) {
    const SMS = { 
      men: dadosMensagem.sms, 
      usu: dadosMensagem.OpcaoUsuario
    }
    mensagens.push(SMS)
  }

  conteudo = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bate-Papo</title> 
      <link rel="stylesheet" href="style3.css"> 
    </head>
    <body>
      <header>
        <h1>Bate-Papo</h1>
      </header>
      
      <main>
        <div> `

  for(let i = 0; i < mensagens.length; i++){
    conteudo += `
          <h3>${mensagens[i].usu}: </h3>
          <p>${mensagens[i].men} <br><br> Postado em: ${horaDaMensaegm}</p><br>`
  }

  conteudo += `
        </div>
    
        <form action="/batePapo" method="get">
          <h2>Enviar Mensagem: </h2>
    
          <label for="iusuario">Usuário: </label>
          <select name="OpcaoUsuario" id="iopc"> `

  for(let i = 0; i < listaUsuario.length; i++){
    conteudo += `
            <option value="${listaUsuario[i].nick}">${listaUsuario[i].nick}</option> `
  }

  conteudo += `
          </select><br>

          <label for="isms">Mensaegm: </label>
          <input type="text" name="sms" id="isms">

          <button type="submit">Enviar</button>
        </form>

        <a href="/">Voltar ao menu</a>
      </main>
    </body>
    </html>
  `
  resposta.end(conteudo)
})

app.post('/listaUsuarios', autenticar, listaDeUsuarios)

app.get('/', autenticar, (requisicao, resposta) => {
  const ultimoAcesso = requisicao.cookies.DataUltimoAcesso
  const data = new Date()

  resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
  })

  resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Menu do Sistema</title> 
      <link rel="stylesheet" href="style2.css"> 
    </head>
    <body>
      <header>
        <h1>MENU</h1>
      </header>
      
      <main>
        <div>
          <ul>
            <li><a href="cadastrarUsuario.html">Cadastrar Usuario</a></li>
            <li><a href="/batePapo">Bate-papo</a></li>
          </ul>

          <p>O último acesso foi ${ultimoAcesso}.</p>
        </div>
      </main>
    </body>
    </html> `
  )
})

app.use(express.static('./paginas'))

app.listen(porta, host, () => {
  console.log(`Servidor executado na url http://${host}:${porta}`)
})