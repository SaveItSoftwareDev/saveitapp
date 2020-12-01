# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

<br>
<br>

## Projeto SaveIt

Sugere-se a utilização do **Visual Studio Code**

Opcional, mas útil: instalar os seguintes pluins do VSCode:

`vscode-styled-components`
`TSLint`

Para poder criar projetos React é necessário ter instalado o _create-react-app_. Para isso podemos instala-lo usando o comando `npm install -g create-react-app` no terminal. Este passo não é obrigatório para correr este projeto, uma vez que o código já está gerado.

### Dependências do projeto

#### React bootstrap

Trata-se de uma libraria de CSS que cujos componentes foram convertidos em componentes react prontos a usar. [Documentação](https://react-bootstrap.github.io/)

**Instalação:** `npm install react-bootstrap bootstrap`

#### Styled Components

Trata-se de uma libraria que permite criar componentes com base em propriedades CSS. [Documentação](https://github.com/styled-components/styled-components)

**Instalação** `npm i styled-components` e `npm install @types/styled-components`

#### React Router

Trata-se de uma libraria responsável por tratar das rotas das diferentes páginas da aplicação. [Documentação](https://reactrouter.com/web/guides/quick-start)

**Instalação** `npm install react-router-dom` e `npm install @types/react-router-dom`

#### Axios

Trata-se de uma libraria que permite fazer pedidos a uma API. [Documentação](https://www.npmjs.com/package/axios)

**Instalação** `npm i axios`

<br>

### O que é que tem de ser feito para correr o projeto?

Para correr o projeto, basta executar `npm start` dentro da diretoria da raiz do mesmo.

### Como faço para criar uma nova página?

Para criar uma nova página devem ser seguidos os seguintes passos:

1. Criar uma nova pasta dentro de `pages` com o nome da pasta, por exemplo **dashboard**. Dentro dessa pasta, colocar dois ficheiros: `dasboard.page.tsx` e `dashboard.styled.tsx`. (Não é obrigatório que tenham estes nomes, poderia ser `xpto.tsx`, trata-se de uma convenção de forma a estruturar o código convenientemente). O ficheiro `dashboard.page.tsx` será onde ficará toda a programação da página. O ficheiro `dashboard.styled.tsx` será onde criamos os _styled componentes_ particulares da página (por exemplo uma `div` com um fundo amarelo).

1. No ficheiro `App.tsx` acrescentar a rota para a página a criar, por exemplo `/profile`

```tsx
<Route exact path="/profile" render={() => <ProfilePage />}></Route>
```
