
import React, { useState, useMemo } from 'react';
import { ProcessedData, VictimStats, VictimWithCase } from '../types';
import { Card } from '../components/ui';
import { ArrowUpIcon, ArrowDownIcon } from '../components/Icons';

const StatCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card className="flex flex-col">
        <h3 className="text-lg font-semibold text-brand-text-secondary mb-3">{title}</h3>
        <div className="flex-grow">{children}</div>
    </Card>
);

const AgeDistributionChart: React.FC<{ data: VictimStats['ageDistribution'] }> = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 1);

    return (
        <Card>
            <h3 className="text-lg font-semibold text-brand-text-secondary mb-4">Distribuição por Idade</h3>
            <div className="space-y-3">
                {data.map(item => (
                    <div key={item.range} className="flex items-center">
                        <div className="w-20 text-sm text-brand-text-secondary text-right pr-4">{item.range}</div>
                        <div className="flex-1 bg-brand-primary rounded-full h-6">
                            <div
                                className="bg-brand-accent h-6 rounded-full flex items-center justify-end pr-2 text-white font-bold text-sm"
                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                            >
                                {item.count}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const VictimsPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    const { victimStats, victims } = data;
    const [sortConfig, setSortConfig] = useState<{ key: keyof VictimWithCase; direction: 'ascending' | 'descending' }>({ key: 'id', direction: 'ascending' });
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Viva': return 'text-green-400';
            case 'Morta': return 'text-red-400';
            case 'Desaparecida': return 'text-yellow-400';
            default: return 'text-gray-400';
        }
    };

    const sortedVictims = useMemo(() => {
        let sortableItems = [...victims];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
                }
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }
        return sortableItems;
    }, [victims, sortConfig]);

    const requestSort = (key: keyof VictimWithCase) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof VictimWithCase) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />;
    };

    const headers: { key: keyof VictimWithCase; label: string }[] = [
        { key: 'nome', label: 'Nome da Vítima' },
        { key: 'idade', label: 'Idade' },
        { key: 'ocupacao', label: 'Ocupação' },
        { key: 'case', label: 'Caso Associado' },
        { key: 'status', label: 'Status' },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold">Análise de Vítimas</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Ocupações Mais Comuns">
                    <ul className="space-y-2">
                        {victimStats.commonOccupations.map(occ => (
                            <li key={occ.name} className="flex justify-between items-center text-brand-text">
                                <span>{occ.name}</span>
                                <span className="font-bold text-brand-accent bg-brand-primary px-2 py-0.5 rounded">{occ.count}</span>
                            </li>
                        ))}
                    </ul>
                </StatCard>
                <StatCard title="Idade Média">
                    <div className="text-5xl font-bold text-brand-accent text-center pt-2">{victimStats.averageAge}</div>
                    <p className="text-center text-brand-text-secondary text-sm">anos</p>
                </StatCard>
                <StatCard title="Distribuição de Status">
                     <ul className="space-y-2">
                        {victimStats.statusDistribution.map(s => (
                            <li key={s.name} className="flex justify-between items-center text-brand-text">
                                <span className={getStatusColor(s.name)}>{s.name}</span>
                                <span className="font-bold text-brand-accent bg-brand-primary px-2 py-0.5 rounded">{s.count}</span>
                            </li>
                        ))}
                    </ul>
                </StatCard>
            </div>

            <AgeDistributionChart data={victimStats.ageDistribution} />

            <Card className="!p-0 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Registro Detalhado de Vítimas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-brand-primary">
                            <tr>
                                {headers.map(header => (
                                     <th key={header.key} className="p-4 cursor-pointer hover:bg-brand-secondary" onClick={() => header.key !== 'case' && requestSort(header.key)}>
                                        <div className="flex items-center gap-x-2">
                                            {header.label}
                                            {header.key !== 'case' && getSortIndicator(header.key)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedVictims.map(victim => (
                                <tr key={victim.id} className="border-t border-brand-secondary hover:bg-brand-primary/50">
                                    <td className="p-4 font-medium">{victim.nome}</td>
                                    <td className="p-4">{victim.idade}</td>
                                    <td className="p-4">{victim.ocupacao}</td>
                                    <td className="p-4 text-brand-text-secondary">{victim.case ? victim.case.descricao : 'N/A'}</td>
                                    <td className={`p-4 font-semibold ${getStatusColor(victim.status)}`}>{victim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default VictimsPage;
