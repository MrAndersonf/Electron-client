function gerarTelefone() {
  //funcao para gerar numero de telefone aleatorio
  let possibleNumers = [5, 6, 9];
  return `1${
    possibleNumers[Math.floor(Math.random() * possibleNumers.length)]
  }9${Math.random().toString().slice(2, 11)}`;
}

function gerarEmail() {
  let emails = ["@gmail.com", "@outlook.com", "@bol.com.br"];
  let nameSubstring = clientes.map(
    (docum) =>
      `${docum.nome.trim().slice(0, 3)}_${docum.cpf.substr(0, 6)}${
        emails[Math.floor(Math.random() * emails.length)]
      }`
  );
  return nameSubstring;
  //funcao para gerar email aleatorio com partes do nome + cpf
  //examplo linha 1: marl_102813arauj@outloo.com
}

function generateCepAleatory() {
  const ceps = enderecos.map((itens) => itens.cep);
  const cepAleatory = ceps[Math.floor(Math.random() * enderecos.length)];
  return cepAleatory;
}

var enderecos = [
  {
    cep: "04104-020",
    logradouro: "Rua Apeninos",
    complemento: "casa",
    bairro: "Paraíso",
    localidade: "São Paulo",
    uf: "SP",
  },
  {
    cep: "05425-011",
    logradouro: "Rua Amaro Cavalheiro",
    complemento: "casa",
    bairro: "Paraíso",
    localidade: "São Paulo",
    uf: "SP",
  },
  {
    cep: "05459-001",
    logradouro: "Rua Alberto Faria",
    complemento: "casa",
    bairro: "Paraíso",
    localidade: "São Paulo",
    uf: "SP",
  },
  {
    cep: "05138-260",
    logradouro: "Rua Alessandro Araldi",
    complemento: "casa",
    bairro: "Paraíso",
    localidade: "São Paulo",
    uf: "SP",
  },
  {
    cep: "05138-460",
    logradouro: "Rua Alessandro Leopardi",
    complemento: "casa",
    bairro: "Pinheiros",
    localidade: "São Paulo",
    uf: "SP",
  },
];

const clientes = [
    {
        nome: "Marcos Venzel Messias ",
        cpf: "35477890959",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Clotilde Hadas",
        cpf: "35501421968",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Marisa Busatto Santos ",
        cpf: "35502495949",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Leila Meri Larson ",
        cpf: "35507667934",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Dilair Camargo De Souza ",
        cpf: "35557443991",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Sonia Maria Loyola",
        cpf: "35561181904",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Ana Cardoso Vieira Danelle",
        cpf: "35585978934",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Florisa Morales Vieira",
        cpf: "35588870930",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Judalva Silva",
        cpf: "35594560963",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
      {
        nome: "Rodiney De Souza",
        cpf: "35594667920",
        email: "user@email.com.br",
        senha: "passw:Abcd1234",
      },
  {
    nome: "Milena Torres Da Silva",
    cpf: "10285748432",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Maria Divanice De Melo Souza",
    cpf: "10285897438",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Camila De Sousa Vieira",
    cpf: "04555553462",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Moises Do Nascimento Duarte",
    cpf: "04555931408",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Tatiany Cristina Verissimo De Almeida",
    cpf: "04556479410",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Marlon Da Silva Araujo",
    cpf: "10281543488",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
    boleto: "03399065476635710085900088301015385130000399960",
  },
  {
    nome: "Paula Christina De Souza Muller ",
    cpf: "04599286940",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Joao Batista De França",
    cpf: "04601325471 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Karla Abadia Marins ",
    cpf: "04603661657",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Heloysa Kelly Martins Da Silva Sapucaia",
    cpf: "10281560498",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jeniffer Mclaine Duarte De Freitas",
    cpf: "10282361405",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Amnon Goncalves Melo",
    cpf: "10282362479",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jose Victor De Araujo Souza",
    cpf: "10285381466",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Edyssa Laryssa Da Silva Ferreira De Araujo",
    cpf: "10285382438",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Beatriz Laurentino Barros",
    cpf: "10285613421",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },

  {
    nome: "Larissa De Souza Araujo",
    cpf: "10286059436",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Kelvin Silva Sena",
    cpf: "10286741474",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Amyson Jhonata Da Silva",
    cpf: "10287054411",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Matheus Correa Da Silva",
    cpf: "10287259498",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Janekely Batista Dos Santos",
    cpf: "10288003470",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Luan Marcondes Alves De Souza",
    cpf: "10288469402",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Neidi Lucia Ignacio",
    cpf: "35331701949 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Neidi Lucia Ignacio ",
    cpf: "35331701949",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Neidi Lucia Ignacio",
    cpf: "35331701949",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Telma Regina Serapio Ferreira",
    cpf: "35385561991 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Telma Ferreira",
    cpf: "35385561991",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Telma Regina Serapio Ferreira ",
    cpf: "35385561991",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Telma Regina Serapio Ferreira",
    cpf: "35385561991",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jorge Luiz Rodrigues",
    cpf: "35386304968",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Marisson Ferreira Colaco",
    cpf: "35395974920",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Abel Soares Siqueira",
    cpf: "35396232803",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Andre Luis Cardoso Santos",
    cpf: "35400170544",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Eduardo Ratton",
    cpf: "35409258991",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Nelva Maria Zibetti Sganzerla ",
    cpf: "35411015987",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Misael Schoneborn De Moraes ",
    cpf: "35414340900",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jamil Rodrigues ",
    cpf: "35417609900",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Maria Antonia De Quadros",
    cpf: "35420782987",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Euza Tieme Toyonaga ",
    cpf: "35429224987",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Volnei Gargioni ",
    cpf: "35435232953",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Josafa Rodrigues Da Silva",
    cpf: "35449969449 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Daltiva Goncalves ",
    cpf: "35476796991",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  
  {
    nome: "Alire Aparecida Bortolan",
    cpf: "35594810900 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Alire Aparecida Bortolan",
    cpf: "35594810900",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Eliane Dos Santos ",
    cpf: "84196941534",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Ana Keury Pereira Da Silva",
    cpf: "84197927568",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Edilson Marques ",
    cpf: "84199253653",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "José Tiago Santos",
    cpf: "84200820587",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Luiz Rodrigo Marques De Sousa Vieira",
    cpf: "84202840500",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Maria Daisy Dos Santos Nunes",
    cpf: "84203927587",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Joelito Ferreira ",
    cpf: "84204449557",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Denisson Raimundo Nascimento Azevedo",
    cpf: "84205156553",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Katiane Santos Gomes",
    cpf: "84205334591",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Brunno De Farias Pereira",
    cpf: "84205962568",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Carlos Antonio Santos Santana ",
    cpf: "84206250510",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Rita De Cassia Silva Santos",
    cpf: "84208678534",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jose Matheus Anacleto Caldeira Alves",
    cpf: "84208740515",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Eline Dos Santos ",
    cpf: "84208759534",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Tania Maria Costa",
    cpf: "84209739715",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Breno Allan Alves Santos",
    cpf: "84209976504",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Breno Allan Alves Santos",
    cpf: "84209976594",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Thiago Da Graça Hollatz",
    cpf: "84210044504",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Ana Valéria Rodrigues De Oliveira",
    cpf: "84210222534",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jonathas Gabriel Santos Rocha ",
    cpf: "84210311553",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Josue Santos ",
    cpf: "84211873504",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Daniela Dos Anjos Figueiredo",
    cpf: "84211903500",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Rafael Silva Costa",
    cpf: "84212136520",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Carlos Magno Gomes Curcino",
    cpf: "84213957500",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Clese Gonzaga Rodrigues Dos Santos",
    cpf: "84215186587",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Walter Vicente Dos Santos Neto",
    cpf: "84215429587",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Josimari Pereira Do Espirito Santos",
    cpf: "84216468500",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Williane Santos Figueredo Da Costa ",
    cpf: "84216956572",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Nathalia Porto Lopes Franco ",
    cpf: "04545939961",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Maria Fabiana Da Silva Costa",
    cpf: "04548563423",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Núbia Rejane Do Nascimento",
    cpf: "04549149469 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },

  {
    nome: "Maria Jose De Melo Silva",
    cpf: "04558345470",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Darislania Da Silva Rocha",
    cpf: "04559764492",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Patricia Kelda Nicolau De Lima",
    cpf: "04560348464",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Marta Margarete Cestari ",
    cpf: "04565079810",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Janiete Rosa De Farias",
    cpf: "04567652479",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Francisco Vidal Pereira",
    cpf: "04569734430 ",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Lea De Gusmao Cerqueira Lima",
    cpf: "04570236430",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Francimeire De Oliveira Costa Lima",
    cpf: "04573071377",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Luciano Lepka Portela ",
    cpf: "04573610936",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Jose Raymara Alves Lima",
    cpf: "04573741526",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Marcelo Dantas Machado",
    cpf: "04575531464",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Daniela Calumby De Souza Gomes",
    cpf: "04576096486",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Ana Vitoria Barros Lopes Oliveira",
    cpf: "04593319498",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Adelton Silvestre Torres",
    cpf: "04593371490",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Sandra Maria Da Silva",
    cpf: "04594202403",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
  {
    nome: "Marla De Cerqueira Alves",
    cpf: "04598290501",
    email: "user@email.com.br",
    senha: "passw:Abcd1234",
  },
];



module.exports = {
    gerarEmail,gerarTelefone, generateCepAleatory,enderecos,clientes
}