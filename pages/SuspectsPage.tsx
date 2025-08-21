
import React, { useState, useMemo } from 'react';
import { ProcessedData, SuspectWithCases } from '../types';
import { Card } from '../components/ui';
import { LinkIcon } from '../components/Icons';

const SuspectCard: React.FC<{ suspect: SuspectWithCases }> = ({ suspect }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const DangerMeter = ({ score }: { score: number }) => {
        const percentage = score;
        const color = percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-orange-500' : 'bg-yellow-500';
        return (
            <div className="w-full bg-gray-700 rounded-full h-2.5 my-2">
                <div className={color} style={{ width: `${percentage}%`, height: '100%', borderRadius: 'inherit' }}></div>
            </div>
        );
    };

    return (
        <div className="[perspective:1000px] w-full h-96">
            <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
                {/* Front of card */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-brand-secondary rounded-lg shadow-lg p-6 flex flex-col items-center justify-between text-center">
                    <img src={suspect.foto} alt={suspect.apelido} className="w-24 h-24 rounded-full border-4 border-brand-accent -mt-16" />
                    <div>
                        <h3 className="text-2xl font-bold text-brand-accent">{suspect.apelido}</h3>
                        {suspect.isKeySuspect && (
                            <div title="Suspeito-Chave: envolvido em múltiplos casos ativos" className="flex items-center justify-center text-xs font-semibold rounded-full uppercase tracking-wider border px-2 py-0.5 mt-1 bg-sky-500/20 text-sky-300 border-sky-500/30">
                                <LinkIcon />
                                <span className="ml-1">Chave</span>
                            </div>
                        )}
                        <p className="text-brand-text mt-1">{suspect.nome}</p>
                        <p className="text-sm text-brand-text-secondary">Idade: {suspect.idade || 'Desconhecida'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-brand-text-secondary">Pontuação de Perigo</p>
                        <p className="text-4xl font-bold text-red-400">{suspect.pontuacao_perigo}</p>
                        <DangerMeter score={suspect.pontuacao_perigo} />
                    </div>
                    <button onClick={() => setIsFlipped(true)} className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors w-full">Detalhes</button>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-secondary rounded-lg shadow-lg p-6 flex flex-col overflow-y-auto">
                    <div className="flex-grow">
                        <h4 className="font-bold text-brand-accent mb-1">Histórico Criminal</h4>
                        <p className="text-sm text-brand-text-secondary mb-3">{suspect.historico_criminal}</p>
                        
                        <h4 className="font-bold text-brand-accent mb-1">Casos Ativos Associados</h4>
                        <ul className="list-disc list-inside text-sm text-brand-text-secondary mb-3">
                            {suspect.activeCases.length > 0 ? 
                                suspect.activeCases.map(c => <li key={c.id} className="truncate">{c.descricao}</li>) : 
                                <li>Nenhum caso ativo.</li>
                            }
                        </ul>
                    </div>
                    <button onClick={() => setIsFlipped(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors w-full mt-4">Voltar</button>
                </div>
            </div>
        </div>
    );
};


const SuspectsPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    const sortedSuspects = useMemo(() => 
        [...data.suspects].sort((a, b) => b.pontuacao_perigo - a.pontuacao_perigo),
        [data.suspects]
    );
    const mostWanted = sortedSuspects.slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-4">Ranking "Mais Procurados"</h2>
                <div className="bg-brand-secondary p-6 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {mostWanted.map(s => (
                             <div key={s.id} className="flex flex-col items-center text-center p-4 bg-brand-primary rounded-lg">
                                <img src={s.foto} alt={s.apelido} className="w-20 h-20 rounded-full border-2 border-red-500" />
                                <div className="flex items-center gap-x-2 mt-2">
                                    <p className="font-bold text-red-400">{s.apelido}</p>
                                    {s.isKeySuspect && (
                                        <div title="Suspeito-Chave: envolvido em múltiplos casos ativos" className="flex items-center text-xs font-semibold rounded-full uppercase tracking-wider border px-2 py-0.5 bg-sky-500/20 text-sky-300 border-sky-500/30">
                                            <LinkIcon />
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-brand-text-secondary">{s.nome}</p>
                                <p className="font-bold text-xl">{s.pontuacao_perigo}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold mb-4">Arquivo de Suspeitos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-20 pt-16">
                   {sortedSuspects.map(suspect => (
                        <SuspectCard key={suspect.id} suspect={suspect} />
                   ))}
                </div>
            </div>
        </div>
    );
};

export default SuspectsPage;