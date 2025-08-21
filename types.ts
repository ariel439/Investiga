
export interface Detective {
  id: number;
  nome: string;
  cargo: string;
  especialidade: string;
  foto: string;
}

export interface Suspect {
  id: number;
  nome: string;
  apelido: string;
  idade: number | null;
  historico_criminal: string;
  pontuacao_perigo: number;
  foto: string;
}

export type CaseStatus = 'investigação' | 'resolvido' | 'arquivada' | 'reaberta';
export type CaseSeverity = 'Crítico' | 'Gravíssimo' | 'Grave' | 'Médio' | 'Baixo';
export type WitnessReliability = 'alta' | 'media' | 'baixa';

export interface Case {
  id: number;
  descricao: string;
  data_ocorrido: string;
  cidade: string;
  status: CaseStatus;
  gravidade: CaseSeverity;
  detetives: Detective[];
  suspeitos: Suspect[];
  vitimas: Victim[];
  testemunhas: Witness[];
  evidencias: Evidence[];
  isCriminalCell: boolean;
}

export interface Victim {
  id: number;
  nome: string;
  idade: number;
  ocupacao: string;
  status: 'Viva' | 'Morta' | 'Desaparecida';
}

export interface Evidence {
  id: number;
  descricao: string;
  data_descoberta: string;
  local_encontrado: string;
  analise_forense: boolean;
}

export interface Witness {
  id: number;
  nome: string;
  depoimentos: string[];
  confiabilidade: WitnessReliability;
}

export interface VictimStats {
  commonOccupations: { name: string; count: number }[];
  averageAge: number;
  statusDistribution: { name: 'Viva' | 'Morta' | 'Desaparecida'; count: number }[];
  ageDistribution: { range: string; count: number }[];
}


export interface ProcessedData {
  detectives: DetectiveWithStats[];
  suspects: SuspectWithCases[];
  cases: Case[];
  victims: VictimWithCase[];
  witnesses: WitnessWithCaseCount[];
  stats: {
    totalActiveCases: number;
    criticalCases: number;
    highDangerSuspects: number;
    averageSuccessRate: number;
  }
  victimStats: VictimStats;
}

export interface DetectiveWithStats extends Detective {
    totalCases: number;
    resolvedCases: number;
    successRate: number;
}

export interface SuspectWithCases extends Suspect {
    activeCases: Case[];
    isKeySuspect: boolean;
}

export interface VictimWithCase extends Victim {
    case: Case | undefined;
}

export interface WitnessWithCaseCount extends Witness {
    caseCount: number;
}