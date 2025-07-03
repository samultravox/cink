'use client';

import { useState } from 'react';
import { Plus, Upload, Calculator, Crown, CreditCard, User, FileText, Camera, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddPaymentFormProps {
  onAddPayment: (paymentData: any) => void;
  currentProvision: number;
}

const quickAmounts = [7500, 12500, 25000, 37500, 50000, 125000];

const models = [
  { id: 'isabella', name: 'Isabella' },
  { id: 'natalie', name: 'Natalie' },
  { id: 'sophia', name: 'Sophia' },
  { id: 'luna', name: 'Luna' },
  { id: 'aria', name: 'Aria' }
];

const channels = {
  isabella: ['Isabella Fanvue', 'Isabella FB Page', 'Isabella WhatsApp'],
  natalie: ['Natalie Fanvue', 'Natalie Personal FB', 'Natalie Telegram'],
  sophia: ['Sophia Fanvue', 'Sophia Private FB'],
  luna: ['Luna Fanvue', 'Luna FB Page', 'Luna Instagram'],
  aria: ['Aria Fanvue', 'Aria Private Chat']
};

const accounts = [
  'Revolut',
  'Paysafe',
  'Anza Bank',
  'Wise USD',
  'Crypto Wallet'
];

const categories = [
  'Premium Video',
  'Chat Session',
  'Live Call',
  'Custom Content',
  'Subscription',
  'Tips',
  'Private Show'
];

export function AddPaymentForm({ onAddPayment, currentProvision }: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    model: '',
    channel: '',
    client: '',
    account: '',
    category: '',
    notes: '',
    screenshot: null as File | null
  });

  const [calculatedProvision, setCalculatedProvision] = useState(0);

  const handleAmountChange = (amount: string) => {
    setFormData(prev => ({ ...prev, amount }));
    const numAmount = parseFloat(amount) || 0;
    setCalculatedProvision(Math.round(numAmount * 0.2)); // 20% provision
  };

  const handleQuickAmount = (amount: number) => {
    handleAmountChange(amount.toString());
  };

  const handleModelChange = (model: string) => {
    setFormData(prev => ({ 
      ...prev, 
      model, 
      channel: '' // Reset channel when model changes
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.model || !formData.channel || !formData.client || !formData.account || !formData.category) {
      alert('Prosím vyplňte všechna povinná pole');
      return;
    }

    onAddPayment({
      amount: parseFloat(formData.amount),
      model: formData.model,
      channel: formData.channel,
      client: formData.client,
      account: formData.account,
      category: formData.category,
      notes: formData.notes,
      screenshot: formData.screenshot
    });

    // Reset form
    setFormData({
      amount: '',
      model: '',
      channel: '',
      client: '',
      account: '',
      category: '',
      notes: '',
      screenshot: null
    });
    setCalculatedProvision(0);
  };

  const availableChannels = formData.model ? channels[formData.model as keyof typeof channels] || [] : [];

  return (
    <div className="glow-card p-4 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Amount Selection - Compact Horizontal Layout */}
        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-2 flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-[rgb(var(--sunset-gold))]" />
            <span className="text-sm font-bold text-[rgb(var(--foreground))] uppercase">Částka</span>
          </div>
          
          {/* Quick Amount Buttons - NO HOVER SCALING */}
          <div className="col-span-7 flex space-x-1">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleQuickAmount(amount)}
                className={cn(
                  'flex-1 px-2 py-1.5 rounded-md text-xs font-bold transition-colors duration-200',
                  formData.amount === amount.toString()
                    ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-md'
                    : 'bg-[rgba(var(--sunset-gold),0.15)] text-[rgb(var(--foreground))] border border-[rgba(var(--sunset-gold),0.3)] hover:border-[rgba(var(--neon-orchid),0.5)]'
                )}
              >
                {amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
              </button>
            ))}
          </div>
          
          {/* Custom Amount Input - Narrower */}
          <div className="col-span-3">
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md text-sm font-bold text-center bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
              placeholder="Vlastní částka (CZK)..."
            />
          </div>
        </div>

        {/* Row 2: Model Selection - NO HOVER SCALING */}
        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-2 flex items-center space-x-2">
            <Crown className="w-4 h-4 text-[rgb(var(--sunset-gold))]" />
            <span className="text-sm font-bold text-[rgb(var(--foreground))] uppercase">Modelka</span>
          </div>
          
          {/* Model Quick Selection - NO HOVER SCALING */}
          <div className="col-span-6 flex space-x-1">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => handleModelChange(model.id)}
                className={cn(
                  'flex-1 px-2 py-1.5 rounded-md text-xs font-bold transition-colors duration-200',
                  formData.model === model.id
                    ? 'bg-gradient-to-r from-[rgb(var(--sunset-gold))] to-[rgb(var(--neon-orchid))] text-white shadow-md'
                    : 'bg-[rgba(var(--purple-500),0.15)] text-[rgb(var(--foreground))] border border-[rgba(var(--purple-500),0.3)] hover:border-[rgba(var(--neon-orchid),0.5)]'
                )}
              >
                {model.name}
              </button>
            ))}
          </div>
          
          {/* Channel Dropdown - Aligned */}
          <div className="col-span-4">
            <select
              value={formData.channel}
              onChange={(e) => setFormData(prev => ({ ...prev, channel: e.target.value }))}
              className={cn(
                'w-full px-3 py-1.5 rounded-md text-sm bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200',
                !formData.model && 'opacity-50 cursor-not-allowed'
              )}
              disabled={!formData.model}
            >
              <option value="">Vybrat kanál</option>
              {availableChannels.map((channel) => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Client, Account, Category - Narrower Fields with Better Balance */}
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Client with Plus Button - Narrower */}
          <div className="col-span-3">
            <div className="flex items-center space-x-1 mb-1">
              <User className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs font-bold text-[rgb(var(--foreground))] uppercase">Klient</span>
            </div>
            <div className="flex space-x-1">
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                className="flex-1 px-2 py-1.5 rounded-md text-sm bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
                placeholder="Jméno klienta"
              />
              <button
                type="button"
                className="px-2 py-1.5 rounded-md bg-[rgba(var(--neon-orchid),0.2)] border border-[rgba(var(--neon-orchid),0.3)] text-[rgb(var(--neon-orchid))] hover:bg-[rgba(var(--neon-orchid),0.3)] transition-all duration-200"
                title="Přidat nového klienta"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          {/* Account - Narrower */}
          <div className="col-span-3">
            <div className="flex items-center space-x-1 mb-1">
              <CreditCard className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs font-bold text-[rgb(var(--foreground))] uppercase">Účet</span>
            </div>
            <select
              value={formData.account}
              onChange={(e) => setFormData(prev => ({ ...prev, account: e.target.value }))}
              className="w-full px-2 py-1.5 rounded-md text-sm bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
            >
              <option value="">Vybrat účet</option>
              {accounts.map((account) => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>
          </div>
          
          {/* NEW: Category Dropdown */}
          <div className="col-span-3">
            <div className="flex items-center space-x-1 mb-1">
              <Tag className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs font-bold text-[rgb(var(--foreground))] uppercase">Kategorie</span>
            </div>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-2 py-1.5 rounded-md text-sm bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
            >
              <option value="">Vybrat kategorii</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Screenshot - Clean Upload Button - NO HOVER SCALING */}
          <div className="col-span-3">
            <div className="flex items-center space-x-1 mb-1">
              <Camera className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs font-bold text-[rgb(var(--foreground))] uppercase">Snímek</span>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="screenshot-upload"
              />
              <label
                htmlFor="screenshot-upload"
                className={cn(
                  'w-full flex items-center justify-center px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-200 text-xs font-medium',
                  'bg-[rgba(var(--sunset-gold),0.15)] border border-[rgba(var(--sunset-gold),0.3)] text-[rgb(var(--foreground))] hover:border-[rgba(var(--neon-orchid),0.5)]',
                  formData.screenshot && 'border-green-400 bg-[rgba(34,197,94,0.15)] text-green-400'
                )}
              >
                <Upload className="w-3 h-3 mr-1" />
                {formData.screenshot ? 'Nahráno' : 'Upload'}
              </label>
            </div>
          </div>
        </div>

        {/* Row 4: Notes - Full Width */}
        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-2 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
            <span className="text-sm font-bold text-[rgb(var(--foreground))] uppercase">Poznámky</span>
          </div>
          
          <div className="col-span-10">
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-1.5 rounded-md text-sm bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
              placeholder="Dodatečné informace..."
            />
          </div>
        </div>

        {/* Real-time Commission Display - Subtle Banner */}
        {calculatedProvision > 0 && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.1)] to-[rgba(var(--sunset-gold),0.1)] border border-[rgba(var(--neon-orchid),0.2)]">
            <div className="flex items-center space-x-3">
              <Calculator className="w-5 h-5 text-[rgb(var(--sunset-gold))]" />
              <div className="flex-1">
                <div className="text-lg font-black text-gradient-gold">
                  Tvoje provize z této platby: {calculatedProvision.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
                </div>
                <div className="text-xs text-[rgb(var(--muted-foreground))]">
                  Automatický výpočet na základě aktuální provize
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button - Bold, Full-Width, Colorful - NO HOVER SCALING */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-lg font-black text-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] via-[rgb(var(--crimson))] to-[rgb(var(--sunset-gold))] text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[rgba(255,255,255,0.2)]"
        >
          <Plus className="w-5 h-5" />
          <span className="uppercase tracking-wider">Přidat Platbu (CZK)</span>
        </button>
      </form>
    </div>
  );
}