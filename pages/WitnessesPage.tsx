
import React, { useState, useMemo } from 'react';
import { ProcessedData, WitnessWithCaseCount } from '../types';
import { Card, Tag, getReliabilityColor } from '../components/ui';
import { ChevronDownIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon } from '../components/Icons';

const WitnessRow: React.FC<{ witness: WitnessWithCaseCount }> = ({ witness }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <tr className="border-t border-brand-secondary hover:bg-brand-primary/50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <td className="p-4">{witness.nome}</td>
                <td className="p-4 text-brand-text-secondary">Disponível sob requisição</td>
                <td className="p-4"><Tag colorClass={getReliabilityColor(witness.confiabilidade)}>{witness.confiabilidade}</Tag></td>
                <td className="p-4 text-center">{witness.caseCount}</td>
                <td className="p-4">
                    <button className="flex items-center text-brand-accent">
                        <span>{isExpanded ? 'Ocultar' : 'Ver'} Depoimento(s)</span>
                        <ChevronDownIcon className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-brand-primary">
                    <td colSpan={5} className="p-4 border-t-2 border-brand-accent">
                         <h4 className="font-bold mb-2 text-brand-text">Depoimentos Registrados:</h4>
                         <ul className="space-y-2 list-disc list-inside pl-2">
                            {witness.depoimentos.map((depo, index) => (
                                <li key={index} className="text-brand-text-secondary italic">"{depo}"</li>
                            ))}
                        </ul>
                    </td>
                </tr>
            )}
        </>
    );
};

const WitnessesPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof WitnessWithCaseCount; direction: 'ascending' | 'descending' }>({ key: 'id', direction: 'ascending' });

    const sortedAndFilteredWitnesses = useMemo(() => {
        let filtered = data.witnesses.filter(w => 
            w.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.depoimentos.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (sortConfig.key) {
             filtered.sort((a, b) => {
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
        return filtered;
    }, [data.witnesses, searchTerm, sortConfig]);
    
    const requestSort = (key: keyof WitnessWithCaseCount) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof WitnessWithCaseCount) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />;
    };

    const headers: { key: keyof WitnessWithCaseCount; label: string; sortable: boolean }[] = [
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'id', label: 'Contato', sortable: false }, // Using 'id' as a placeholder key as 'contato' doesn't exist.
        { key: 'confiabilidade', label: 'Confiabilidade', sortable: true },
        { key: 'caseCount', label: 'Nº de Casos', sortable: true },
        { key: 'depoimentos', label: 'Ações', sortable: false },
    ];


    return (
        <Card className="!p-0 overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Banco de Testemunhas e Informantes</h2>
                 <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou depoimento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-brand-primary border border-brand-secondary rounded-lg p-3 pl-10 focus:ring-brand-accent focus:border-brand-accent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-primary">
                        <tr>
                            {headers.map(header => (
                                <th key={header.key} className={`p-4 ${header.sortable ? 'cursor-pointer hover:bg-brand-secondary' : ''}`} onClick={() => header.sortable && requestSort(header.key)}>
                                    <div className="flex items-center gap-x-2">
                                        {header.label}
                                        {header.sortable && getSortIndicator(header.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredWitnesses.map(witness => (
                            <WitnessRow key={witness.id} witness={witness} />
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default WitnessesPage;
