
import React, { useState, useMemo } from 'react';
import { ProcessedData, Case as CaseType, CaseStatus, CaseSeverity } from '../types';
import { Card, Modal, Tag, getStatusColor, getSeverityColor } from '../components/ui';
import { CheckCircleIcon, XCircleIcon, InfoIcon, UsersIcon, ArrowUpIcon, ArrowDownIcon } from '../components/Icons';

const CaseDetailModal: React.FC<{ aCase: CaseType | null; isOpen: boolean; onClose: () => void }> = ({ aCase, isOpen, onClose }) => {
    if (!aCase) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Caso #${aCase.id}: ${aCase.descricao}`}>
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <Tag colorClass={getStatusColor(aCase.status)}>{aCase.status}</Tag>
                    <Tag colorClass={getSeverityColor(aCase.gravidade)}>{aCase.gravidade}</Tag>
                    {aCase.isCriminalCell && (
                        <Tag colorClass="bg-orange-500/20 text-orange-300 border-orange-500/30 flex items-center gap-x-1">
                            <UsersIcon /> Célula
                        </Tag>
                    )}
                </div>
                
                <div>
                    <h3 className="text-xl font-bold text-brand-accent mb-4 border-b-2 border-brand-accent/30 pb-2">Informações Gerais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-brand-text-secondary">
                        <div><strong>Cidade:</strong> {aCase.cidade}</div>
                        <div><strong>Data Ocorrido:</strong> {new Date(aCase.data_ocorrido).toLocaleDateString()}</div>
                    </div>
                     <p className="mt-4 text-brand-text-secondary">{aCase.descricao}</p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-brand-accent mb-4 border-b-2 border-brand-accent/30 pb-2">Pessoas Envolvidas</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-lg mb-3">Detetives Responsáveis</h4>
                            <div className="space-y-3">
                                {aCase.detetives.map(d => (
                                    <div key={d.id} className="flex items-center bg-brand-secondary/50 p-2 rounded-lg">
                                        <img src={d.foto} alt={d.nome} className="w-10 h-10 rounded-full mr-3" />
                                        <div>
                                            <p className="font-semibold">{d.nome}</p>
                                            <p className="text-xs text-brand-text-secondary">{d.cargo}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                             {aCase.suspeitos.length > 1 && <h4 className="font-semibold text-lg mb-3 text-red-400">Célula Criminosa Envolvida</h4>}
                             {aCase.suspeitos.length <= 1 && <h4 className="font-semibold text-lg mb-3">Suspeitos Vinculados</h4>}
                            <div className="space-y-3">
                                {aCase.suspeitos.map(s => (
                                    <div key={s.id} className="flex items-center bg-brand-secondary/50 p-2 rounded-lg">
                                        <img src={s.foto} alt={s.apelido} className="w-10 h-10 rounded-full mr-3" />
                                        <div>
                                            <p className="font-semibold">{s.apelido}</p>
                                            <p className="text-xs text-brand-text-secondary">{s.nome}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">Vítimas</h4>
                            <ul className="list-disc list-inside text-brand-text-secondary">
                                {aCase.vitimas.map(v => <li key={v.id}>{v.nome}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">Testemunhas</h4>
                             <ul className="list-disc list-inside text-brand-text-secondary">
                                {aCase.testemunhas.map(t => <li key={t.id}>{t.nome} ({t.confiabilidade})</li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-brand-accent mb-4 border-b-2 border-brand-accent/30 pb-2">Evidências Coletadas</h3>
                    <div className="space-y-3">
                        {aCase.evidencias.map(e => (
                             <div key={e.id} className="flex items-start bg-brand-secondary/50 p-3 rounded-lg">
                                <div className="mr-3 mt-1">
                                    {e.analise_forense ? <CheckCircleIcon /> : <XCircleIcon />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{e.descricao}</p>
                                    <p className="text-sm text-brand-text-secondary">
                                        Encontrado em: {e.local_encontrado} | Data: {new Date(e.data_descoberta).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};


const CasesPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);
    const [filters, setFilters] = useState({ status: '', gravidade: '', cidade: '' });
    const [sortConfig, setSortConfig] = useState<{ key: keyof CaseType; direction: 'ascending' | 'descending' }>({ key: 'id', direction: 'ascending' });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    
    const uniqueCidades = useMemo(() => [...new Set(data.cases.map(c => c.cidade))].sort(), [data.cases]);

    const sortedAndFilteredCases = useMemo(() => {
        let filtered = data.cases.filter(c => {
            return (filters.status ? c.status === filters.status : true) &&
                   (filters.gravidade ? c.gravidade === filters.gravidade : true) &&
                   (filters.cidade ? c.cidade === filters.cidade : true);
        });

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [data.cases, filters, sortConfig]);

    const requestSort = (key: keyof CaseType) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    const getSortIndicator = (key: keyof CaseType) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />;
    };

    const openModal = (aCase: CaseType) => setSelectedCase(aCase);
    const closeModal = () => setSelectedCase(null);

    const headers: { key: keyof CaseType; label: string }[] = [
        { key: 'id', label: 'ID' },
        { key: 'descricao', label: 'Descrição' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'data_ocorrido', label: 'Data' },
        { key: 'gravidade', label: 'Gravidade' },
        { key: 'status', label: 'Status' },
    ];

    return (
        <Card className="!p-0 overflow-hidden">
             <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Gerenciamento de Casos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select name="status" onChange={handleFilterChange} className="w-full bg-brand-primary border border-brand-secondary rounded-lg p-2 focus:ring-brand-accent focus:border-brand-accent">
                        <option value="">Todos os Status</option>
                        {['investigação', 'resolvido', 'arquivada', 'reaberta'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                     <select name="gravidade" onChange={handleFilterChange} className="w-full bg-brand-primary border border-brand-secondary rounded-lg p-2 focus:ring-brand-accent focus:border-brand-accent">
                        <option value="">Toda Gravidade</option>
                        {['Crítico', 'Gravíssimo', 'Grave', 'Médio', 'Baixo'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select name="cidade" onChange={handleFilterChange} className="w-full bg-brand-primary border border-brand-secondary rounded-lg p-2 focus:ring-brand-accent focus:border-brand-accent">
                        <option value="">Todas as Cidades</option>
                        {uniqueCidades.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-primary">
                        <tr>
                            {headers.map(header => (
                                <th key={header.key} className="p-4 cursor-pointer hover:bg-brand-secondary" onClick={() => requestSort(header.key)}>
                                    <div className="flex items-center gap-x-2">
                                        {header.label}{getSortIndicator(header.key)}
                                    </div>
                                </th>
                            ))}
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredCases.map(c => (
                            <tr key={c.id} className="border-t border-brand-secondary hover:bg-brand-primary/50">
                                <td className="p-4">{c.id}</td>
                                <td className="p-4 max-w-xs">
                                    <div className="flex items-center gap-x-2">
                                        <span className="truncate">{c.descricao}</span>
                                        {c.isCriminalCell && (
                                            <Tag colorClass="bg-orange-500/20 text-orange-300 border-orange-500/30 flex items-center gap-x-1">
                                               <UsersIcon /> Célula
                                            </Tag>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">{c.cidade}</td>
                                <td className="p-4">{new Date(c.data_ocorrido).toLocaleDateString()}</td>
                                <td className="p-4"><Tag colorClass={getSeverityColor(c.gravidade)}>{c.gravidade}</Tag></td>
                                <td className="p-4"><Tag colorClass={getStatusColor(c.status)}>{c.status}</Tag></td>
                                <td className="p-4">
                                    <button onClick={() => openModal(c)} className="bg-brand-accent text-white px-3 py-1 rounded-lg hover:bg-indigo-500 transition-colors">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CaseDetailModal aCase={selectedCase} isOpen={!!selectedCase} onClose={closeModal} />
        </Card>
    );
};

export default CasesPage;
