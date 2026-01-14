'use client';

import { motion } from 'motion/react';
import { Bot, AlertCircle, HelpCircle } from 'lucide-react';

interface ChatMessageProps {
    message: string;
    type: 'clarification' | 'irrelevant' | 'error';
}

export default function ChatMessage({ message, type }: ChatMessageProps) {
    const getConfig = () => {
        switch (type) {
            case 'clarification':
                return {
                    icon: HelpCircle,
                    bgClass: 'bg-blue-50 dark:bg-blue-950/30',
                    borderClass: 'border-blue-200 dark:border-blue-800/50',
                    iconBgClass: 'bg-blue-100 dark:bg-blue-900/50',
                    iconColorClass: 'text-blue-600 dark:text-blue-400',
                    label: 'Need more info',
                };
            case 'irrelevant':
                return {
                    icon: AlertCircle,
                    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
                    borderClass: 'border-amber-200 dark:border-amber-800/50',
                    iconBgClass: 'bg-amber-100 dark:bg-amber-900/50',
                    iconColorClass: 'text-amber-600 dark:text-amber-400',
                    label: 'Off topic',
                };
            default:
                return {
                    icon: AlertCircle,
                    bgClass: 'bg-red-50 dark:bg-red-950/30',
                    borderClass: 'border-red-200 dark:border-red-800/50',
                    iconBgClass: 'bg-red-100 dark:bg-red-900/50',
                    iconColorClass: 'text-red-600 dark:text-red-400',
                    label: 'Error',
                };
        }
    };

    const config = getConfig();
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex gap-3 max-w-2xl"
        >
            {/* AI Avatar */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 
                        flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
            </div>

            {/* Message Bubble */}
            <div className="flex-1 space-y-2">
                {/* Label */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                           ${config.iconBgClass} ${config.iconColorClass}`}>
                        {config.label}
                    </span>
                </div>

                {/* Message Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`relative rounded-2xl rounded-tl-sm ${config.bgClass} ${config.borderClass}
                      border p-4 shadow-sm`}
                >
                    {/* Icon Badge */}
                    <div className={`absolute -top-2 -left-2 w-7 h-7 rounded-full 
                          ${config.iconBgClass} flex items-center justify-center
                          border-2 border-background shadow-sm`}>
                        <Icon className={`w-3.5 h-3.5 ${config.iconColorClass}`} />
                    </div>

                    {/* Message Text */}
                    <p className="text-foreground leading-relaxed pl-4">{message}</p>
                </motion.div>

                {/* Hint */}
                <p className="text-xs text-muted-foreground pl-1">
                    {type === 'clarification'
                        ? 'Please provide more details in the input above.'
                        : type === 'irrelevant'
                            ? 'Try asking about Gilgit-Baltistan tourism destinations.'
                            : 'Please try again or rephrase your query.'}
                </p>
            </div>
        </motion.div>
    );
}
