# API de Imobiliária 🏡

Esta é uma API de imobiliária desenvolvida em Node.js usando o framework Express e o banco de dados MongoDB. 
Ela permite gerenciar propriedades, fornecendo funcionalidades como criação, atualização, exclusão e busca avançada.

## Funcionalidades ✨

- Registro de usuários, fornecendo nome de usuário, email e senha.
- Login de usuários, gerando um token de autenticação JWT.
- Criar uma nova propriedade fornecendo informações como título, descrição, localização, tipo de propriedade, número de quartos, número de banheiros, preço e URL da imagem.
- Listar todas as propriedades cadastradas no banco de dados, com suporte a paginação, ordenação e pesquisa avançada.
- Obter os detalhes de uma propriedade específica com base no seu ID.
- Atualizar os dados de uma propriedade existente.
- Excluir uma propriedade do banco de dados permanentemente.
- Enviar uma mensagem de contato para o e-mail do destinatário especificado.
- Redefinição de senha: os usuários podem solicitar a redefinição de senha, recebendo um e-mail com um link especial contendo um token de redefinição de senha. O usuário poderá usar esse link para definir uma nova senha.

## Recursos Adicionais 🌟

A API também oferece os seguintes recursos: 

- **Paginação**: Os resultados podem ser paginados para uma melhor organização e controle das propriedades listadas. Os parâmetros `page` e `limit` podem ser utilizados para especificar a página desejada e o número máximo de itens por página, respectivamente.
- **Ordenação**: É possível ordenar os resultados com base em um campo específico, como preço, data de criação, etc. O parâmetro `sort` permite escolher o campo de ordenação e o parâmetro `order` define a ordem ascendente ou descendente.
- **Pesquisa Avançada**: A API suporta parâmetros de pesquisa avançada para filtrar as propriedades com base em critérios específicos, como preço mínimo e máximo, número mínimo de quartos, localização específica, etc. Isso permite aos clientes realizar buscas mais precisas.

## Bibliotecas Utilizadas 📚

- **Express**: Framework web rápido e minimalista para criação de aplicativos Node.js. [Link para a documentação](https://expressjs.com/)
- **Mongoose**: Biblioteca ODM (Object-Document Mapper) do MongoDB para modelagem de dados e interação com o banco de dados. [Link para a documentação](https://mongoosejs.com/)
- **dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`. [Link para a documentação](https://www.npmjs.com/package/dotenv)
- **cors**: Middleware para habilitar o suporte a Cross-Origin Resource Sharing (CORS). [Link para a documentação](https://www.npmjs.com/package/cors)
- **morgan**: Middleware para registrar logs de requisições HTTP. [Link para a documentação](https://www.npmjs.com/package/morgan)
- **joi**: Biblioteca para validação de dados. [Link para a documentação](https://joi.dev/)
- **multer**: Middleware para lidar com uploads de arquivos. [Link para a documentação](https://www.npmjs.com/package/multer)
- **jsonwebtoken**: Biblioteca para geração e verificação de tokens de autenticação JWT. [Link para a documentação](https://www.npmjs.com/package/jsonwebtoken)
- **bcrypt**: Biblioteca para hash de senhas e comparação de hashes. [Link para a documentação](https://www.npmjs.com/package/bcrypt)


Essas bibliotecas desempenham um papel fundamental no desenvolvimento da sua API, fornecendo recursos e funcionalidades essenciais, como roteamento, interação com o banco de dados MongoDB, manipulação de variáveis de ambiente, validação de dados, tratamento de arquivos e muito mais.

## Pré-requisitos 👩‍💻

Antes de executar a API, certifique-se de ter instalado o Node.js e o MongoDB em seu ambiente de desenvolvimento.

## Instalação e Configuração 🚀

1. Clone este repositório em sua máquina local.
2. No diretório raiz do projeto, execute o comando `npm install` para instalar as dependências.
3. Configure as informações de conexão com o MongoDB no arquivo `src/db/database.js`.
4. Execute o comando `npm start` para iniciar a API.

A API estará disponível em `http://localhost:3200`.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente
semelhate ao que esta no `.env.example`:

PORT=3200
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
...

## authMiddleware

O `authMiddleware` é um middleware que verifica se um token JWT válido está presente no cabeçalho `Authorization`. Ele valida o token e adiciona o usuário decodificado à requisição (`req.user`). Se o token for inválido ou não estiver presente, uma resposta de erro será enviada.

## Autenticação de Rotas

A API utiliza autenticação baseada em tokens JWT para proteger as rotas que exigem autenticação. Para acessar essas rotas, inclua o token de autenticação no cabeçalho `Authorization` das requisições. O formato do cabeçalho deve ser `Bearer token`.

Para proteger uma rota, utilize o middleware `authMiddleware`, que verifica se um token JWT válido está presente no cabeçalho `Authorization`. Se o token for válido, o usuário decodificado é adicionado à requisição (`req.user`).

## Documentação da API 🤝

Consulte a documentação da API para obter informações detalhadas sobre os endpoints disponíveis, os parâmetros aceitos e os formatos de resposta. A documentação pode ser encontrada no arquivo `docs/api-docs.md`.

## Contribuindo 🤝

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou relatar problemas encontrados.

## Licença 📄

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

