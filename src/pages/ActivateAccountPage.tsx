import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, HomeIcon, LogIn } from 'lucide-react';
import { authApi, usersApi } from '@/lib/api'; // Importe authApi do seu api.ts
import { Footer } from "@/components/Footer"; // Assumindo que você tem um componente Footer

export default function ActivateAccountPage() {
    const [message, setMessage] = useState('Verificando seu token de ativação...');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            usersApi.activate(token) // Usando o método activate do authApi
                .then(response => {
                    setMessage("Your account have been successfully activated");
                    setIsError(false);
                })
                .catch(error => {
                    console.error('Erro ao ativar a conta:', error);
                    const errorMessage = error.response?.data || 'O link de ativação é inválido ou já foi usado.';
                    setMessage(errorMessage);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setMessage('Token de ativação não encontrado na URL.');
            setIsError(true);
            setIsLoading(false);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg border border-border">
                    {isLoading ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Ativando sua conta...</h1>
                            <p className="text-muted-foreground text-lg">{message}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center"
                        >
                            {isError ? (
                                <XCircle className="w-16 h-16 text-red-500 mb-6" />
                            ) : (
                                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                            )}
                            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                                {isError ? 'Falha na Ativação' : 'Conta Ativada!'}
                            </h1>
                            <p className="text-muted-foreground text-lg mb-8">{message}</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {!isError && (
                                    <Link to="/login" className="btn-hero-primary w-full sm:w-auto">
                                        <LogIn className="w-5 h-5" />
                                        Ir para Login
                                    </Link>
                                )}
                                <Link to="/" className="btn-hero-ghost w-full sm:w-auto">
                                    <HomeIcon className="w-5 h-5" />
                                    Página Inicial
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.section>
            <Footer />
        </div>
    );
}