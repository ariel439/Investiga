
import { Detective, Suspect, Case, Victim, Evidence, Witness, CaseStatus, CaseSeverity, WitnessReliability, ProcessedData } from './types';
import { cjBase64 } from './components/ImageData';

const detectivesRaw: Omit<Detective, 'foto'>[] = [
    {id: 1, nome: 'Sofia Costa', cargo: 'Delegada Chefe', especialidade: 'Análise de Padrões e Crimes Complexos'},
    {id: 2, nome: 'Marco Aurélio', cargo: 'Investigador Chefe', especialidade: 'Crimes Cibernéticos'},
    {id: 3, nome: 'Ricardo Neves', cargo: 'Perito Forense Chefe', especialidade: 'Análise de Evidências'},
    {id: 4, nome: 'Juliana Santos', cargo: 'Detetive de Vítimas Especiais', especialidade: 'Violência Doméstica e Desaparecimentos'},
    {id: 5, nome: 'Roberto Lima', cargo: 'Detetive de Roubos e Furtos', especialidade: 'Roubo de Cargas e Veículos'},
    {id: 6, nome: 'Laura Bastos', cargo: 'Agente Especial', especialidade: 'Crimes Ambientais e Tráfico'},
    {id: 7, nome: 'Sherlock Holmes', cargo: 'Detetive Consultor', especialidade: 'Lógica Dedutiva e Casos Impossíveis'},
];

const suspectsRaw: Omit<Suspect, 'pontuacao_perigo' | 'foto'>[] = [
    {id: 100, nome: 'Ricardo Vargas', apelido: 'O Sombra', idade: 45, historico_criminal: 'Inteligência estratégica, manipulação, sem condenações.'},
    {id: 101, nome: 'Júlio "Mão Leve" Andrade', apelido: 'Mão Leve', idade: 32, historico_criminal: 'Pequenos furtos, arrombamentos.'},
    {id: 102, nome: 'Carla "A Dama de Copas" Ferraz', apelido: 'Dama de Copas', idade: 38, historico_criminal: 'Estelionato, fraude de identidade.'},
    {id: 103, nome: 'Carl Johnson', apelido: 'CJ', idade: 35, historico_criminal: 'Roubo de veículos, associação criminosa.'},
    {id: 104, nome: 'Eduardo "O Químico" Moraes', apelido: 'O Químico', idade: 52, historico_criminal: 'Produção e tráfico de narcóticos, incêndio criminoso.'},
    {id: 105, nome: 'Bianca "A Hacker" Oliveira', apelido: 'A Hacker', idade: 28, historico_criminal: 'Invasão de sistemas, extorsão digital.'},
    {id: 106, nome: 'Marcos "O Brutamontes" Silva', apelido: 'O Brutamontes', idade: 41, historico_criminal: 'Agressão, intimidação, segurança ilegal.'},
    {id: 107, nome: 'Desconhecido', apelido: 'O Charadista', idade: null, historico_criminal: 'Deixa enigmas e quebra-cabeças nas cenas do crime.'},
    {id: 108, nome: 'Professor Moriarty', apelido: 'O Napoleão do Crime', idade: 50, historico_criminal: 'Mentor intelectual de crimes organizados.'},
];

const casesRaw: Omit<Case, 'detetives' | 'suspeitos' | 'vitimas' | 'testemunhas' | 'evidencias' | 'isCriminalCell'>[] = [
    {id: 1, descricao: 'O Roubo do Colar da Imperatriz', data_ocorrido: '2022-10-20', cidade: 'Florianópolis', status: 'arquivada', gravidade: 'Grave'},
    {id: 2, descricao: 'A Fraude do Leilão de Arte Digital', data_ocorrido: '2023-05-15', cidade: 'Balneário Camboriú', status: 'investigação', gravidade: 'Grave'},
    {id: 3, descricao: 'Desaparecimento do Diretor de Tecnologia da TechCorp', data_ocorrido: '2023-11-01', cidade: 'Joinville', status: 'reaberta', gravidade: 'Gravíssimo'},
    {id: 4, descricao: 'Invasão à Joalheria Monte Carlo', data_ocorrido: '2024-02-10', cidade: 'Blumenau', status: 'resolvido', gravidade: 'Grave'},
    {id: 7, descricao: 'Esquema de pirâmide financeira com criptomoedas', data_ocorrido: '2024-05-10', cidade: 'Itajaí', status: 'investigação', gravidade: 'Grave'},
    {id: 9, descricao: 'Roubo de carga de eletrônicos', data_ocorrido: '2024-07-11', cidade: 'Tubarão', status: 'investigação', gravidade: 'Grave'},
    {id: 10, descricao: 'Incêndio criminoso em galpão abandonado', data_ocorrido: '2024-08-01', cidade: 'Criciúma', status: 'arquivada', gravidade: 'Grave'},
    {id: 11, descricao: 'Ameaça a funcionário público', data_ocorrido: '2024-09-15', cidade: 'Lages', status: 'resolvido', gravidade: 'Médio'},
    {id: 14, descricao: 'Roubo de trator em área rural', data_ocorrido: '2025-01-05', cidade: 'Rio do Sul', status: 'investigação', gravidade: 'Médio'},
    {id: 15, descricao: 'Extorsão mediante sequestro de perfil em rede social', data_ocorrido: '2025-02-18', cidade: 'Brusque', status: 'investigação', gravidade: 'Médio'},
    {id: 16, descricao: 'Homicídio em bar no centro da cidade', data_ocorrido: '2025-03-12', cidade: 'Palhoça', status: 'investigação', gravidade: 'Gravíssimo'},
    {id: 17, descricao: 'Furto de notebooks em escola pública', data_ocorrido: '2025-04-01', cidade: 'Gaspar', status: 'arquivada', gravidade: 'Baixo'},
    {id: 18, descricao: 'Tráfico de animais silvestres', data_ocorrido: '2025-05-25', cidade: 'Caçador', status: 'reaberta', gravidade: 'Grave'},
    {id: 20, descricao: 'Fraude em seguro de vida', data_ocorrido: '2025-07-22', cidade: 'Florianópolis', status: 'arquivada', gravidade: 'Grave'},
    {id: 21, descricao: 'O Enigma do Coringa de Ouro', data_ocorrido: '2025-08-20', cidade: 'Balneário Camboriú', status: 'investigação', gravidade: 'Crítico'},
    {id: 22, descricao: 'O Mistério do Manuscrito Cifrado', data_ocorrido: '2025-09-01', cidade: 'Florianópolis', status: 'investigação', gravidade: 'Crítico'},
    {id: 26, descricao: 'Grande Assalto ao Cripto-Banco', data_ocorrido: '2024-11-15', cidade: 'Joinville', status: 'investigação', gravidade: 'Crítico'},
    {id: 27, descricao: 'Sabotagem na Marina de Itajaí', data_ocorrido: '2025-01-20', cidade: 'Itajaí', status: 'investigação', gravidade: 'Gravíssimo'},
    {id: 101, descricao: 'Caso do Falsário de Blumenau', data_ocorrido: '2019-05-20', cidade: 'Blumenau', status: 'resolvido', gravidade: 'Médio'},
    {id: 102, descricao: 'Operação Carga Limpa', data_ocorrido: '2020-02-15', cidade: 'Itajaí', status: 'resolvido', gravidade: 'Grave'},
    {id: 103, descricao: 'O Hacker da Meia-Noite', data_ocorrido: '2021-08-01', cidade: 'Florianópolis', status: 'resolvido', gravidade: 'Grave'},
    {id: 104, descricao: 'Caso da Herança Envenenada', data_ocorrido: '2018-11-10', cidade: 'Joinville', status: 'resolvido', gravidade: 'Gravíssimo'},
    {id: 105, descricao: 'A Quadrilha do PIX', data_ocorrido: '2022-01-30', cidade: 'Chapecó', status: 'resolvido', gravidade: 'Médio'},
    {id: 106, descricao: 'O Ladrão de Orquídeas Raras', data_ocorrido: '2017-07-22', cidade: 'Timbó', status: 'resolvido', gravidade: 'Baixo'},
    {id: 107, descricao: 'O Cão dos Baskervilles (SC)', data_ocorrido: '2015-03-12', cidade: 'Urubici', status: 'resolvido', gravidade: 'Gravíssimo'},
    {id: 108, descricao: 'O Escândalo da Liga dos Cabeças Vermelhas', data_ocorrido: '2016-09-01', cidade: 'Lages', status: 'resolvido', gravidade: 'Médio'},
    {id: 109, descricao: 'Um Estudo em Escarlate (Joinville)', data_ocorrido: '2014-01-19', cidade: 'Joinville', status: 'resolvido', gravidade: 'Gravíssimo'},
    {id: 110, descricao: 'O Signo dos Quatro (Itajaí)', data_ocorrido: '2013-06-25', cidade: 'Itajaí', status: 'resolvido', gravidade: 'Grave'},
    {id: 111, descricao: 'O Problema Final (Gaspar)', data_ocorrido: '2018-05-04', cidade: 'Gaspar', status: 'resolvido', gravidade: 'Crítico'},
    {id: 112, descricao: 'O Vale do Medo (Rio do Sul)', data_ocorrido: '2019-10-15', cidade: 'Rio do Sul', status: 'resolvido', gravidade: 'Grave'},
];

const victimsRaw: Omit<Victim, 'status'>[] = [
    {id: 1, nome: 'Dr. Arthur Valadares', idade: 65, ocupacao: 'Curador de Arte'},
    {id: 2, nome: 'Beatriz Rocha', idade: 42, ocupacao: 'Colecionadora de Arte'},
    {id: 3, nome: 'Fernando Lima', idade: 38, ocupacao: 'Diretor de Tecnologia'},
    {id: 4, nome: 'Cláudia Monte Carlo', idade: 55, ocupacao: 'Empresário'},
    {id: 7, nome: 'Marcos Andrade', idade: 29, ocupacao: 'Empresário'},
    {id: 9, nome: 'José Ferreira', idade: 48, ocupacao: 'Caminhoneiro'},
    {id: 11, nome: 'Sérgio Matos', idade: 51, ocupacao: 'Fiscal da Prefeitura'},
    {id: 14, nome: 'Adalberto Schmidt', idade: 62, ocupacao: 'Agricultor'},
    {id: 15, nome: 'Larissa Campos', idade: 23, ocupacao: 'Influenciadora Digital'},
    {id: 16, nome: 'Ricardo Alves', idade: 35, ocupacao: 'Desempregado'},
    {id: 17, nome: 'Helena Costa', idade: 49, ocupacao: 'Diretora Escolar'},
    {id: 18, nome: 'Pedro Mendes', idade: 34, ocupacao: 'Agente Ambiental'},
    {id: 20, nome: 'Laura Martins', idade: 31, ocupacao: 'Astronauta'},
    {id: 21, nome: 'Alfred Pennyworth', idade: 68, ocupacao: 'Diretor de Fundação'},
    {id: 22, nome: 'Dr. Elias Bastos', idade: 71, ocupacao: 'Bibliotecário Chefe'},
    {id: 26, nome: 'Júlia Neves', idade: 45, ocupacao: 'CEO'},
    {id: 27, nome: 'Roberto Medeiros', idade: 58, ocupacao: 'Empresário'},
    {id: 104, nome: 'Coronel Adalberto Menezes', idade: 78, ocupacao: 'Militar Aposentado'},
];

const evidencesRaw: Evidence[] = [
    {id: 1, descricao: 'Fragmento de código em e-mail criptografado', data_descoberta: '2023-05-20', local_encontrado: 'Servidor da Galeria', analise_forense: true},
    {id: 2, descricao: 'Transação anônima em criptomoeda para uma carteira offline', data_descoberta: '2023-11-10', local_encontrado: 'Rede da TechCorp', analise_forense: true},
    {id: 3, descricao: 'Poeira rara, não nativa da região, encontrada no duto de ventilação', data_descoberta: '2022-10-22', local_encontrado: 'Museu Histórico', analise_forense: true},
    {id: 4, descricao: 'Impressões digitais parciais em uma ferramenta de arrombamento', data_descoberta: '2024-02-10', local_encontrado: 'Joalheria', analise_forense: true},
    {id: 6, descricao: 'Carta de baralho (Coringa) deixada na cena do crime', data_descoberta: '2025-08-20', local_encontrado: 'Sede da Fundação Vayne', analise_forense: true},
    {id: 7, descricao: 'Manuscrito com cifra musical indecifrável', data_descoberta: '2025-09-01', local_encontrado: 'Biblioteca Nacional', analise_forense: true},
    {id: 8, descricao: 'Fibra de um casaco de tweed incomum', data_descoberta: '2025-09-01', local_encontrado: 'Biblioteca Nacional', analise_forense: true},
    {id: 10, descricao: 'Pegada digital de acesso remoto não autorizado', data_descoberta: '2024-05-11', local_encontrado: 'Servidores da CryptoMoedasJá', analise_forense: true},
    {id: 11, descricao: 'Relatório de anomalia na rede elétrica do prédio', data_descoberta: '2023-11-01', local_encontrado: 'Data Center TechCorp', analise_forense: true},
    {id: 12, descricao: 'Login de administrador usado fora do horário de expediente', data_descoberta: '2023-11-02', local_encontrado: 'Logs de Acesso TechCorp', analise_forense: true},
    {id: 13, descricao: 'Malware específico "GhostKey" encontrado nos logs', data_descoberta: '2023-05-16', local_encontrado: 'Servidor da Galeria', analise_forense: true},
    {id: 14, descricao: 'Depoimento de especialista em arte sobre a falsificação', data_descoberta: '2023-06-01', local_encontrado: 'Relatório Policial', analise_forense: false},
    {id: 15, descricao: 'Resíduo de pólvora em uma das páginas do manuscrito', data_descoberta: '2025-09-02', local_encontrado: 'Laboratório Forense', analise_forense: true},
    {id: 16, descricao: 'Mapa de Londres antigo com anotações encontrado na biblioteca', data_descoberta: '2025-09-03', local_encontrado: 'Biblioteca Nacional', analise_forense: false},
    {id: 19, descricao: 'Ferramenta de corte de vidro de alta precisão encontrada no local', data_descoberta: '2022-10-21', local_encontrado: 'Museu Histórico', analise_forense: true},
    {id: 20, descricao: 'Enigma adicional encontrado em um jornal local', data_descoberta: '2025-08-22', local_encontrado: 'Jornal de Balneário', analise_forense: false},
];

const witnessesRaw: Witness[] = [
    {id: 1, nome: 'Antônio Borges (Guarda Noturno)', depoimentos: ['O alarme não tocou. Foi como se o ladrão fosse um fantasma.'], confiabilidade: 'alta'},
    {id: 2, nome: 'Clara Rios (Analista de Sistemas)', depoimentos: ['A invasão foi perfeita. Não deixou rastros comuns.'], confiabilidade: 'alta'},
    {id: 3, nome: 'Anônimo', depoimentos: ['Ouvi dizer que a "Dama de Copas" estava planejando um novo golpe.', 'O incêndio no galpão não foi acidente, foi queima de arquivo.', 'Tem um novo traficante de animais na região de Caçador.', 'A fraude do seguro foi feita por alguém de dentro da empresa.'], confiabilidade: 'media'},
    {id: 4, nome: 'Vizinho', depoimentos: ['Vi um carro estranho parado na rua por volta das 2 da manhã.'], confiabilidade: 'baixa'},
    {id: 5, nome: 'O Corvo', depoimentos: ["O 'Sombra' não suja as mãos, ele usa peões para o trabalho pesado.", "O Colar da Imperatriz foi vendido no mercado negro de Dubai.", "O Manuscrito Cifrado é um mapa para uma fortuna escondida.", "A sabotagem na marina foi para acobertar uma operação de contrabando."], confiabilidade: 'media'},
    {id: 6, nome: 'Sentinela', depoimentos: ["A carga de eletrônicos foi descarregada em um depósito na saída da cidade.", "O assassinato no bar foi resultado de uma briga de gangues pelo controle da área."], confiabilidade: 'alta'},
    {id: 7, nome: 'Oráculo', depoimentos: ["A extorsão da influenciadora foi feita por um hacker amador querendo se provar.", "O esquema de pirâmide usava uma vulnerabilidade em uma nova plataforma de cripto.", "A invasão ao Cripto-Banco foi orquestrada pela 'A Hacker' a mando do 'Sombra'."], confiabilidade: 'alta'},
];

const casos_detetives = [
    {id_caso: 1, id_detetive: 1}, {id_caso: 2, id_detetive: 1}, {id_caso: 3, id_detetive: 1}, {id_caso: 7, id_detetive: 1}, {id_caso: 26, id_detetive: 1}, {id_caso: 27, id_detetive: 1}, {id_caso: 101, id_detetive: 1}, {id_caso: 104, id_detetive: 1},
    {id_caso: 2, id_detetive: 2}, {id_caso: 3, id_detetive: 2}, {id_caso: 7, id_detetive: 2}, {id_caso: 15, id_detetive: 2}, {id_caso: 26, id_detetive: 2}, {id_caso: 103, id_detetive: 2}, {id_caso: 105, id_detetive: 2},
    {id_caso: 1, id_detetive: 3}, {id_caso: 3, id_detetive: 3}, {id_caso: 22, id_detetive: 3}, {id_caso: 27, id_detetive: 3}, {id_caso: 104, id_detetive: 3},
    {id_caso: 16, id_detetive: 4}, {id_caso: 105, id_detetive: 4},
    {id_caso: 9, id_detetive: 5}, {id_caso: 102, id_detetive: 5},
    {id_caso: 18, id_detetive: 6},
    {id_caso: 21, id_detetive: 7}, {id_caso: 22, id_detetive: 7}, {id_caso: 106, id_detetive: 7}, {id_caso: 107, id_detetive: 7}, {id_caso: 108, id_detetive: 7}, {id_caso: 109, id_detetive: 7}, {id_caso: 110, id_detetive: 7}, {id_caso: 111, id_detetive: 7}, {id_caso: 112, id_detetive: 7},
];

const casos_suspeitos = [
    {id_caso: 1, id_suspeito: 100}, {id_caso: 4, id_suspeito: 101}, {id_caso: 17, id_suspeito: 101}, {id_caso: 20, id_suspeito: 102}, {id_caso: 10, id_suspeito: 104}, {id_caso: 11, id_suspeito: 106}, {id_caso: 21, id_suspeito: 107}, {id_caso: 22, id_suspeito: 108},
    {id_caso: 3, id_suspeito: 100}, {id_caso: 3, id_suspeito: 105}, {id_caso: 3, id_suspeito: 106},
    {id_caso: 26, id_suspeito: 100}, {id_caso: 26, id_suspeito: 105},
    {id_caso: 2, id_suspeito: 102}, {id_caso: 2, id_suspeito: 105},
    {id_caso: 7, id_suspeito: 102}, {id_caso: 7, id_suspeito: 105},
    {id_caso: 9, id_suspeito: 103}, {id_caso: 9, id_suspeito: 106},
    {id_caso: 14, id_suspeito: 103},
    {id_caso: 27, id_suspeito: 100}, {id_caso: 27, id_suspeito: 104},
];

const casos_evidencias = [
    {id_caso: 1, id_evidencia: 3}, {id_caso: 1, id_evidencia: 19},
    {id_caso: 2, id_evidencia: 1}, {id_caso: 2, id_evidencia: 13}, {id_caso: 2, id_evidencia: 14},
    {id_caso: 3, id_evidencia: 2}, {id_caso: 3, id_evidencia: 11}, {id_caso: 3, id_evidencia: 12},
    {id_caso: 4, id_evidencia: 4},
    {id_caso: 7, id_evidencia: 10},
    {id_caso: 21, id_evidencia: 6}, {id_caso: 21, id_evidencia: 20},
    {id_caso: 22, id_evidencia: 7}, {id_caso: 22, id_evidencia: 8}, {id_caso: 22, id_evidencia: 15}, {id_caso: 22, id_evidencia: 16},
];

const casos_vitimas = [
    {id_caso: 1, id_vitima: 1}, {id_caso: 2, id_vitima: 2}, {id_caso: 3, id_vitima: 3}, {id_caso: 4, id_vitima: 4}, {id_caso: 7, id_vitima: 7}, {id_caso: 9, id_vitima: 9}, {id_caso: 11, id_vitima: 11}, {id_caso: 14, id_vitima: 14}, {id_caso: 15, id_vitima: 15}, {id_caso: 16, id_vitima: 16}, {id_caso: 17, id_vitima: 17}, {id_caso: 18, id_vitima: 18}, {id_caso: 20, id_vitima: 20}, {id_caso: 21, id_vitima: 21}, {id_caso: 22, id_vitima: 22}, {id_caso: 26, id_vitima: 26}, {id_caso: 27, id_vitima: 27}, {id_caso: 104, id_vitima: 104},
];

const casos_testemunhas = [
    {id_caso: 1, id_testemunha: 1}, {id_caso: 3, id_testemunha: 2},
    {id_caso: 1, id_testemunha: 5}, {id_caso: 3, id_testemunha: 5}, {id_caso: 22, id_testemunha: 5}, {id_caso: 27, id_testemunha: 5},
    {id_caso: 9, id_testemunha: 6}, {id_caso: 16, id_testemunha: 6},
    {id_caso: 15, id_testemunha: 7}, {id_caso: 7, id_testemunha: 7}, {id_caso: 26, id_testemunha: 7},
    {id_caso: 2, id_testemunha: 3}, {id_caso: 10, id_testemunha: 3}, {id_caso: 18, id_testemunha: 3}, {id_caso: 20, id_testemunha: 3}, {id_caso: 21, id_testemunha: 3},
    {id_caso: 4, id_testemunha: 4}, // Added for "Vizinho"
];

export const processData = (): ProcessedData => {
    const dangerScores: {[key: number]: number} = {100: 95, 101: 30, 102: 75, 103: 60, 104: 85, 105: 90, 106: 50, 107: 98, 108: 100};
    
    const detectives: Detective[] = detectivesRaw.map((d) => ({
        ...d,
        foto: `https://api.dicebear.com/8.x/adventurer/svg?seed=${d.nome.replace(/\s/g, '')}&radius=50`
    }));
    
    const suspects: Suspect[] = suspectsRaw.map(s => {
        const fotoUrl = s.id === 103 
            ? cjBase64
            : `https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${s.nome.replace(/\s/g, '')}&radius=50`;

        return {
            ...s,
            pontuacao_perigo: dangerScores[s.id] || 20,
            foto: fotoUrl,
        };
    });
    
    // Add simulated status to victims with a more optimistic distribution
    const victims: Victim[] = victimsRaw.map((v) => {
        const weightedStatuses: ('Viva' | 'Morta' | 'Desaparecida')[] = ['Viva', 'Viva', 'Viva', 'Viva', 'Desaparecida', 'Morta'];
        return {...v, status: weightedStatuses[v.id % weightedStatuses.length]};
    });

    const witnesses: Witness[] = witnessesRaw;

    const cases: Case[] = casesRaw.map(c => {
        const detectiveIds = casos_detetives.filter(cd => cd.id_caso === c.id).map(cd => cd.id_detetive);
        const suspectIds = casos_suspeitos.filter(cs => cs.id_caso === c.id).map(cs => cs.id_suspeito);
        const evidenceIds = casos_evidencias.filter(ce => ce.id_caso === c.id).map(ce => ce.id_evidencia);
        const victimIds = casos_vitimas.filter(cv => cv.id_caso === c.id).map(cv => cv.id_vitima);
        const witnessIds = casos_testemunhas.filter(ct => ct.id_caso === c.id).map(ct => ct.id_testemunha);
        const isCriminalCell = suspectIds.length > 1;

        return {
            ...c,
            detetives: detectives.filter(d => detectiveIds.includes(d.id)),
            suspeitos: suspects.filter(s => suspectIds.includes(s.id)),
            vitimas: victims.filter(v => victimIds.includes(v.id)),
            testemunhas: witnesses.filter(w => witnessIds.includes(w.id)),
            evidencias: evidencesRaw.filter(e => evidenceIds.includes(e.id)),
            isCriminalCell,
        };
    });

    const detectivesWithStats = detectives.map(d => {
        const assignedCases = casos_detetives.filter(cd => cd.id_detetive === d.id);
        const resolvedCases = assignedCases.filter(cd => {
            const aCase = cases.find(c => c.id === cd.id_caso);
            return aCase?.status === 'resolvido';
        });
        const totalCases = assignedCases.length;
        const successRate = totalCases > 0 ? Math.round((resolvedCases.length / totalCases) * 100) : 0;
        return {...d, totalCases, resolvedCases: resolvedCases.length, successRate};
    });

    const suspectsWithCases = suspects.map(s => {
        const activeCases = cases.filter(c => 
            (c.status === 'investigação' || c.status === 'reaberta') && 
            c.suspeitos.some(sus => sus.id === s.id)
        );
        const isKeySuspect = activeCases.length > 1;
        return {...s, activeCases, isKeySuspect};
    });
    
    const victimsWithCase = victims.map(v => {
        const caseId = casos_vitimas.find(cv => cv.id_vitima === v.id)?.id_caso;
        const associatedCase = cases.find(c => c.id === caseId);
        return {...v, case: associatedCase};
    });

    const witnessesWithCaseCount = witnesses.map(w => {
        const caseCount = casos_testemunhas.filter(ct => ct.id_testemunha === w.id).length;
        return {...w, caseCount};
    });

    const totalActiveCases = cases.filter(c => c.status === 'investigação' || c.status === 'reaberta').length;
    const criticalCases = cases.filter(c => c.gravidade === 'Crítico').length;
    const highDangerSuspects = suspects.filter(s => s.pontuacao_perigo > 80).length; // Adjusted threshold
    const totalSuccessRate = detectivesWithStats.reduce((acc, d) => acc + d.successRate, 0);
    const averageSuccessRate = detectivesWithStats.length > 0 ? Math.round(totalSuccessRate / detectivesWithStats.length) : 0;

    // Victim specific stats
    const occupationCounts: Record<string, number> = {};
    let totalAge = 0;
    let victimCountWithAge = 0;
    const statusCounts: Record<string, number> = { 'Viva': 0, 'Morta': 0, 'Desaparecida': 0 };
    const ageRanges: Record<string, number> = { '18-30': 0, '31-45': 0, '46-60': 0, '60+': 0};
    const ageDistributionRanges: Record<string, { min: number, max: number }> = {
      '18-30': { min: 18, max: 30 },
      '31-45': { min: 31, max: 45 },
      '46-60': { min: 46, max: 60 },
      '60+': { min: 61, max: Infinity },
    };


    victims.forEach(v => {
        occupationCounts[v.ocupacao] = (occupationCounts[v.ocupacao] || 0) + 1;
        if (v.idade) {
            totalAge += v.idade;
            victimCountWithAge++;
        }
        statusCounts[v.status]++;
        
        for (const range in ageDistributionRanges) {
            if (v.idade >= ageDistributionRanges[range].min && v.idade <= ageDistributionRanges[range].max) {
                ageRanges[range]++;
                break;
            }
        }
    });
    
    const commonOccupations = Object.entries(occupationCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const averageAge = victimCountWithAge > 0 ? Math.round(totalAge / victimCountWithAge) : 0;
    
    const statusDistribution = Object.entries(statusCounts).map(([name, count]) => ({ name: name as 'Viva' | 'Morta' | 'Desaparecida', count }));
    const ageDistribution = Object.entries(ageRanges).map(([range, count]) => ({ range, count }));


    return {
        detectives: detectivesWithStats,
        suspects: suspectsWithCases,
        cases,
        victims: victimsWithCase,
        witnesses: witnessesWithCaseCount,
        stats: {
            totalActiveCases,
            criticalCases,
            highDangerSuspects,
            averageSuccessRate
        },
        victimStats: {
            commonOccupations,
            averageAge,
            statusDistribution,
            ageDistribution,
        }
    };
};