
import React from 'react';
import { ProcessedData, DetectiveWithStats } from '../types';
import { Card, CircularProgressBar } from '../components/ui';

const DetectiveCard: React.FC<{ detective: DetectiveWithStats }> = ({ detective }) => {
    return (
        <Card className="flex flex-col items-center text-center">
            <img src={detective.foto} alt={detective.nome} className="w-28 h-28 rounded-full border-4 border-brand-accent mb-4" />
            <h3 className="text-xl font-bold">{detective.nome}</h3>
            <p className="text-brand-accent font-semibold">{detective.cargo}</p>
            <p className="text-sm text-brand-text-secondary mt-2 flex-grow">{detective.especialidade}</p>
            
            <div className="w-full border-t border-brand-secondary my-4"></div>

            <h4 className="font-semibold mb-4">Painel de Performance</h4>
            <div className="flex justify-around w-full items-center">
                <div className="text-center">
                    <p className="text-2xl font-bold">{detective.totalCases}</p>
                    <p className="text-xs text-brand-text-secondary">Casos Atribuídos</p>
                </div>
                 <div className="text-center">
                    <p className="text-2xl font-bold text-success">{detective.resolvedCases}</p>
                    <p className="text-xs text-brand-text-secondary">Casos Resolvidos</p>
                </div>
                <div className="flex flex-col items-center">
                   <CircularProgressBar percentage={detective.successRate} size={80} strokeWidth={8} />
                   <p className="text-xs text-brand-text-secondary mt-1">Taxa de Sucesso</p>
                </div>
            </div>
        </Card>
    );
};

const DetectivesPage: React.FC<{ data: ProcessedData }> = ({ data }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Corpo de Detetives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.detectives.map(detective => (
                    <DetectiveCard key={detective.id} detective={detective} />
                ))}
            </div>
        </div>
    );
};

export default DetectivesPage;
