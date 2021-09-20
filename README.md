# tech-challenge

## Desafio Backend
Esta é minha implementação da Tech Challenge da Sthima.
Decidi fazer uso do [AWS SAM](https://aws.amazon.com/pt/serverless/sam/) para alavancar o backend, pois a ferramenta traz já fora da caixa a possibilidade de conectar vários serviços da plataforma AWS em um único repositório, com deploy automatizado em linha de comando. Para o código da aplicação decidi usar TypeScript, para acelerar o desenvolvimento das funções através do intellisense (acho que fica mais fácil de ler também =D).

Este projeto está instalado na minha conta pessoal da AWS e pode ser utilizado chamando os endpoints descritos no arquivo `sthima-tech-challenge-Prod-swagger-postman.json`, em anexo.

## Como Executar este Projeto
Este projeto pode ser instalado como stack do CloudFormation em qualquer conta AWS com alguns comandos. Enviarei em anexo um arquivo Swagger para Postman, gerado automaticamente pelo API Gateway, contendo as requisições.

### Dependências
* [Node.js](https://nodejs.org/) `^14.17.6`
* [NPM](https://www.npmjs.com/) `^7.23.0`
* [AWS CLI](https://aws.amazon.com/pt/cli/) `^2.2.39`
* [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) `^1.31.0`

### Setup
1. Clone ou baixe em ZIP [este projeto no GitHub](https://github.com/rovelcio/tech-challenge);
2. Certifique-se de ter configurada sua [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html);
3. No diretório raiz do projeto, rode `npm run setup` para instalar as dependências, realizar o processo de build do projeto, e criar a stack no CloudFormation;
4. Acesse a API gerada no API Gateway. Faça download da coleção Postman gerada automaticamente em `API > Stages > Prod > Export > Export as Swagger + Postman Extensions`;
5. Carregue a coleção gerada no Postman e faça as requisições como quiser. =D
