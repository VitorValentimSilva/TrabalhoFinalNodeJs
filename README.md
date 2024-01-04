# Sistema de Bate-Papo - Trabalho Final da Faculdade

Bem-vindo ao repositório do projeto de Sistema de Bate-Papo, desenvolvido como trabalho final em uma disciplina da faculdade.

## Descrição

O projeto consiste em um sistema web de bate-papo, com as seguintes funcionalidades:

- **Página de Login:** Acesso ao sistema com autenticação por meio de login (vitor) e senha (123).
- **Menu Principal:** Após o login, o usuário é direcionado para um menu que exibe a data e hora do último acesso, além de dois botões: um para cadastrar um novo usuário e outro para acessar o bate-papo.
- **Cadastro de Usuário:** O botão de cadastro leva a uma página com formulário contendo campos de nome, email, senha, data de nascimento e nickname. As validações são realizadas pelo lado do servidor.
- **Lista de Usuários Cadastrados:** Após cadastrar um usuário, o sistema exibe uma página com a lista de todos os usuários cadastrados, incluindo alguns dados de cada um. Dois botões permitem voltar ao menu principal ou cadastrar outro usuário.
- **Bate-Papo:** Ao clicar no botão de bate-papo, o usuário é direcionado para a página de envio de mensagens. Nessa página, é possível selecionar um usuário cadastrado, digitar uma mensagem e enviá-la. As mensagens são exibidas na tela com informações sobre quem enviou, a mensagem e a data/hora do envio. Validações garantem que os campos não estejam vazios antes do envio.

## Tecnologias Utilizadas

- **Node.js:** O backend da aplicação é desenvolvido em Node.js.
- **Express:** Utilizamos o framework Express para facilitar a criação de rotas e a construção do servidor web.
- **Cookie-parser:** Para rastrear o último acesso ao sistema.
- **Express-session:** Para rastrear o envio de mensagens e mostrar a data/hora de cada mensagem.
- **Date-fns:** Utilizado para a formatação de datas no formato brasileiro (dia/mês/ano).

## Como Executar o Projeto Localmente

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm start`
4. Acesse o sistema no navegador: `http://localhost:3000` (ou a porta que você configurou).

## Autor

- Valentim Silva
