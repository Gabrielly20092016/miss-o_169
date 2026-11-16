// Está função extrai os campos do formulário
function validateLead({ name, email, phone, interest }) {

  //Cria um vetor que vai acumular os problemas encontrados ao longo da valiação
  const errors = [];
  

  //Validação do nome: Verifica se o nome não é uma string ou se tem menos de 3 caracteres 

  if (typeof name !== "string" || name.trim().length < 3) {
    errors.push("Informe seu nome (mínimo de 2 caracteres).");
  }

//Validação do email: Verifica se o email não é uma string ou se ele não passa
// no teste de validação de email

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    errors.push("Informe um e-mail válido.");
  }

  //Validação do número de Telefone: Verifica se o telefone foi preenchido no formulário e se o tipo
  //da variavél "phone" é difenete de string 
  if (phone && typeof phone !== "string") {
    errors.push("O telefone deve ser um texto.");
  }

//Cria um vetor com as opções de modalidade do curso
  const allowedInterests = ["Online", "Presencial", "Ainda não sei"];
  
  //Validação da modalidade de curso: SE a modalidade de interesse foi preenchida e 
  // Se a opçõa enviada não está na lista de permitidos
  
  if (interest && !allowedInterests.includes(interest)) {
    errors.push("Selecione uma modalidade válida.");
  }

  return { valid: errors.length === 0, errors };
}

function normalizeCourseFilter(modality) {
  if (!modality || modality === "Todos") return null;
  const allowed = ["Online", "Presencial"];
  return allowed.includes(modality) ? modality : null;
}

module.exports = { validateLead, normalizeCourseFilter };
