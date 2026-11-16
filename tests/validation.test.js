
// Importação da função validateLead para realizar os testes
const { validateLead } = require("../src/validation");

// Agrupamos todos os testes da função validateLead() para deixar o código mais organizado
describe("Testes unitários da função validateLead()", () => {

    // Teste 1: Cadastro completo válido
    test("Cadastro completo válido", () => {

        // Preenchemos todos os campos do cadastro com informações válidas
        const result = validateLead({
            name: "João Silva",
            email: "joao@email.com",
            phone: "27999999999",
            interest: "Online"
        });

        // Vemos  se o sistema não encontrou nenhum erro durante a validação
        expect(result.errors.length).toBe(0);

        // Verificamos se o cadastro foi considerado válido pelo sistema
        expect(result.valid).toBe(true);

    });


    // Teste 2: Cadastro mínimo válido
    test("Cadastro mínimo válido", () => {

        // Colocamos somente os campos obrigatórios, deixando os opcionais sem preencher
        const result = validateLead({
            name: "João Silva",
            email: "joao@email.com"
        });

        // Verificamos se o sistema aceitou o cadastro sem apresentar erros
        expect(result.errors.length).toBe(0);

        // Conferimos se o cadastro foi considerado válido
        expect(result.valid).toBe(true);

    });


    // Teste 3: Nome muito curto
    test("Nome muito curto", () => {

        // Digitamos  um nome com apenas 2 caracteres para verificar se o sistema identifica que ele é muito curto
        const result = validateLead({
            name: "Jo",
            email: "email@email.com"
        });

        // Verificamos se o sistema apresentou a mensagem de erro para o nome curto
        expect(result.errors).toContain(
            "Informe seu nome (mínimo de 2 caracteres)."
        );

    });


    // Teste 4: Nome com espaços vazios
    test("Nome com espaços vazios", () => {

        // Digitamos  o campo nome somente com espaços em branco, sem informar nenhuma letra
        const result = validateLead({
            name: "       ",
            email: "email@email.com"
        });

        // Vemos  se o sistema identificou que o nome não foi preenchido corretamente
        expect(result.errors).toContain(
            "Informe seu nome (mínimo de 2 caracteres)."
        );

    });


    // Teste 5: Nome com tipo incorreto
    test("Nome com tipo incorreto", () => {

        // Informamos um número no campo nome, em vez de um texto
        const result = validateLead({
            name: 123,
            email: "email@email.com"
        });

        // Vemos se o sistema identificou que o tipo de dado informado está incorreto
        expect(result.errors).toContain(
            "Informe seu nome (mínimo de 2 caracteres)."
        );

    });


    // Teste 6: E-mail sem @
    test("E-mail sem arroba", () => {

        // Informamos um endereço de e-mail sem o símbolo @
        const result = validateLead({
            name: "Ana Silva",
            email: "anaemail.com"
        });

        // Verificamos se o sistema identificou que o endereço de e-mail é inválido
        expect(result.errors).toContain(
            "Informe um e-mail válido."
        );

    });


    // Teste 7: E-mail incompleto
    test("E-mail sem domínio e sem ponto", () => {

        // Informamos um e-mail incompleto, sem a parte final do domínio
        const result = validateLead({
            name: "Ana Silva",
            email: "email@email"
        });

        // Conferimos se o sistema apresentou um erro para o e-mail incompleto
        expect(result.errors).toContain(
            "Informe um e-mail válido."
        );

    });


    // Teste 8: E-mail com tipo incorreto
    test("E-mail com tipo incorreto", () => {

        // Passamos um número no campo e-mail, quando o correto seria informar um texto
        const result = validateLead({
            name: "Ana Silva",
            email: 123
        });

        // Verificamos se o sistema identificou que o tipo de dado do e-mail está incorreto
        expect(result.errors).toContain(
            "Informe um e-mail válido."
        );

    });


    // Teste 9: Telefone com tipo incorreto
    test("Telefone com tipo incorreto", () => {

        // Informamos o telefone como número, em vez de utilizar uma string
        const result = validateLead({
            name: "Ana Silva",
            email: "ana@email.com",
            phone: 2796542378
        });

        // Conferimos se o sistema apresentou a mensagem informando que o telefone deve ser um texto
        expect(result.errors).toContain(
            "O telefone deve ser um texto."
        );

    });


    // Teste 10: Modalidade ou interesse inválido
    test("Modalidade inválida", () => {

        // Informamos uma modalidade que não está entre as opções permitidas pelo sistema
        const result = validateLead({
            name: "Ana Silva",
            email: "ana@email.com",
            interest: "Semipresencial"
        });

        // Verificamos se o sistema identificou que a modalidade escolhida não é válida
        expect(result.errors).toContain(
            "Selecione uma modalidade válida."
        );

    });


    // Teste 11: Modalidade com diferenciação de caixa
    test("Modalidade com letra minúscula", () => {

        // Informamos a modalidade "online" com a letra inicial minúscula, diferente da opção cadastrada
        const result = validateLead({
            name: "Ana Silva",
            email: "ana@email.com",
            interest: "online"
        });

        // Conferimos se o sistema identificou a diferença entre letras maiúsculas e minúsculas
        expect(result.errors).toContain(
            "Selecione uma modalidade válida."
        );

    });   


});

