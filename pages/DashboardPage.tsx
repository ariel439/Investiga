
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProcessedData, Case as CaseType, SuspectWithCases, DetectiveWithStats, CaseSeverity, CaseStatus } from '../types';
import { Card } from '../components/ui';
import { ArrowRightIcon, LinkIcon } from '../components/Icons';

const KpiCard: React.FC<{ title: string; value: string | number; description: string; icon: React.ReactNode }> = ({ title, value, description, icon }) => (
    <Card className="flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-brand-text-secondary">{title}</h3>
        <div className="text-brand-accent">{icon}</div>
      </div>
      <p className="text-4xl font-bold my-4">{value}</p>
      <p className="text-sm text-brand-text-secondary">{description}</p>
    </Card>
);

const RecentCases: React.FC<{ cases: CaseType[], className?: string }> = ({ cases, className }) => {
    const recentUnsolved = cases
        .filter(c => c.status !== 'resolvido' && c.status !== 'arquivada')
        .sort((a, b) => new Date(b.data_ocorrido).getTime() - new Date(a.data_ocorrido).getTime())
        .slice(0, 5);

    return (
        <Card className={className}>
            <h3 className="text-xl font-bold mb-4">Casos Recentes Não Resolvidos</h3>
            <div className="space-y-4">
                {recentUnsolved.length > 0 ? recentUnsolved.map(c => (
                    <div key={c.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                        <div>
                            <p className="font-semibold">{c.descricao}</p>
                            <p className="text-sm text-brand-text-secondary">{c.cidade} - {new Date(c.data_ocorrido).toLocaleDateString()}</p>
                        </div>
                        <Link to="/cases" className="text-brand-accent hover:underline">Detalhes</Link>
                    </div>
                )) : <p className="text-brand-text-secondary">Nenhum caso recente não resolvido.</p>}
            </div>
        </Card>
    );
};

const MostWanted: React.FC<{ suspects: SuspectWithCases[] }> = ({ suspects }) => {
    const mostWanted = [...suspects].sort((a, b) => b.pontuacao_perigo - a.pontuacao_perigo).slice(0, 3);
    
    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Ranking "Mais Procurados"</h3>
            <div className="space-y-4">
                {mostWanted.map(s => (
                    <div key={s.id} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                        <img src={s.foto} alt={s.apelido} className="w-12 h-12 rounded-full mr-4 bg-brand-primary" />
                        <div className="flex-1">
                            <div className="flex items-center gap-x-2">
                                <p className="font-bold text-lg">{s.apelido}</p>
                                {s.isKeySuspect && (
                                    <div title="Suspeito-Chave: envolvido em múltiplos casos ativos" className="flex items-center text-xs font-semibold rounded-full uppercase tracking-wider border px-2 py-0.5 bg-sky-500/20 text-sky-300 border-sky-500/30">
                                        <LinkIcon />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-brand-text-secondary">Pontuação de Perigo</p>
                        </div>
                        <div className="text-2xl font-bold text-danger">{s.pontuacao_perigo}</div>
                    </div>
                ))}
                <Link to="/suspects" className="flex items-center justify-end mt-4 text-brand-accent hover:underline font-semibold">
                    Ver todos <ArrowRightIcon />
                </Link>
            </div>
        </Card>
    );
};

const TopDetectives: React.FC<{ detectives: DetectiveWithStats[] }> = ({ detectives }) => {
    const topDetectives = [...detectives].sort((a, b) => b.successRate - a.successRate).slice(0, 2);

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Detetives em Destaque</h3>
            <div className="space-y-4">
                {topDetectives.map(d => (
                    <div key={d.id} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                        <img src={d.foto} alt={d.nome} className="w-12 h-12 rounded-full mr-4" />
                        <div className="flex-1">
                            <p className="font-bold text-lg">{d.nome}</p>
                            <p className="text-sm text-brand-text-secondary">Taxa de Sucesso</p>
                        </div>
                        <div className="text-2xl font-bold text-success">{d.successRate}%</div>
                    </div>
                ))}
                 <Link to="/detectives" className="flex items-center justify-end mt-4 text-brand-accent hover:underline font-semibold">
                    Ver equipe <ArrowRightIcon />
                </Link>
            </div>
        </Card>
    );
};

const CasesBySeverityChart: React.FC<{ cases: CaseType[], className?: string }> = ({ cases, className }) => {
    const severityData = useMemo(() => {
        const counts: Record<CaseSeverity, number> = { 'Crítico': 0, 'Gravíssimo': 0, 'Grave': 0, 'Médio': 0, 'Baixo': 0 };
        cases.forEach(c => { counts[c.gravidade]++; });
        return Object.entries(counts).map(([name, value]) => ({ name: name as CaseSeverity, value }));
    }, [cases]);

    const maxCount = Math.max(...severityData.map(d => d.value), 1);
    const severityColors: Record<CaseSeverity, string> = { 'Crítico': 'bg-red-500', 'Gravíssimo': 'bg-orange-500', 'Grave': 'bg-yellow-500', 'Médio': 'bg-sky-500', 'Baixo': 'bg-teal-500' };

    return (
        <Card className={className}>
            <h3 className="text-xl font-bold mb-4">Casos por Gravidade</h3>
            <div className="space-y-3">
                {severityData.map(item => (
                    <div key={item.name} className="flex items-center">
                        <div className="w-24 text-sm text-brand-text-secondary truncate">{item.name}</div>
                        <div className="flex-1 bg-brand-primary rounded-full h-6 mr-2">
                           <div className={`${severityColors[item.name]} h-6 rounded-full text-right pr-2 text-white font-bold text-sm`} style={{ width: `${(item.value / maxCount) * 100}%` }}/>
                        </div>
                        <div className="w-8 font-bold text-lg">{item.value}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const CasesByStatusChart: React.FC<{ cases: CaseType[], className?: string }> = ({ cases, className }) => {
    const statusData = useMemo(() => {
        const counts: Record<CaseStatus, number> = { 'investigação': 0, 'reaberta': 0, 'resolvido': 0, 'arquivada': 0 };
        cases.forEach(c => { counts[c.status]++; });
        return Object.entries(counts).map(([name, value]) => ({ name: name as CaseStatus, value }));
    }, [cases]);
    
    const totalCases = cases.length;
    const statusColors: Record<CaseStatus, string> = { 'investigação': '#3b82f6', 'resolvido': '#22c55e', 'arquivada': '#6b7280', 'reaberta': '#a855f7' };

    let accumulatedPercentage = 0;
    const gradientParts = statusData
        .filter(d => d.value > 0)
        .map(d => {
            const percentage = (d.value / totalCases) * 100;
            const start = accumulatedPercentage;
            accumulatedPercentage += percentage;
            const end = accumulatedPercentage;
            return `${statusColors[d.name]} ${start}% ${end}%`;
        }).join(', ');

    return (
        <Card className={className}>
            <h3 className="text-xl font-bold mb-4">Status dos Casos</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="relative w-40 h-40 rounded-full" style={{ background: `conic-gradient(${gradientParts})` }}>
                    <div className="absolute inset-2 bg-brand-secondary rounded-full flex items-center justify-center">
                       <span className="text-3xl font-bold">{totalCases}</span>
                    </div>
                 </div>
                 <div className="flex-1 space-y-2">
                    {statusData.map(item => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: statusColors[item.name] }}></span>
                                <span className="capitalize text-brand-text-secondary">{item.name}</span>
                            </div>
                            <span className="font-bold">{item.value}</span>
                        </div>
                    ))}
                 </div>
            </div>
        </Card>
    );
};


const DashboardPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    const { stats, cases, suspects, detectives } = data;
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total de Casos Ativos" value={stats.totalActiveCases} description="Investigação ou Reaberta" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <KpiCard title="Casos Críticos" value={stats.criticalCases} description="Nível de gravidade máximo" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
                <KpiCard title="Suspeitos Perigosos" value={stats.highDangerSuspects} description="Pontuação de perigo > 80" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                <KpiCard title="Taxa de Sucesso Geral" value={`${stats.averageSuccessRate}%`} description="Média de todos os detetives" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>} />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CasesBySeverityChart cases={cases} className="lg:col-span-1" />
                <CasesByStatusChart cases={cases} className="lg:col-span-1" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RecentCases cases={cases} className="lg:col-span-2" />
                <div className="space-y-6">
                    <MostWanted suspects={suspects} />
                    <TopDetectives detectives={detectives} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;