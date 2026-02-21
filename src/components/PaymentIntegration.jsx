    import React, { useState } from 'react';
    import { Smartphone, CheckCircle2, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

    const PaymentIntegration = () => {
    const [step, setStep] = useState('form'); // form, processing, success
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [txId, setTxId] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        if (phone.length < 10) return alert("Please enter a valid Ghanaian phone number");
        
        setStep('processing');
        
        // Simulate a network request to a payment gateway (e.g., Paystack)
        setTimeout(() => {
        // Generate the ID once here
        const newId = `TX-${Math.floor(Math.random() * 1000000)}`;
        setTxId(newId);
        setStep('success');
        }, 3000);
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex items-center gap-3">
            <Smartphone className="w-8 h-8" />
            <div>
            <h3 className="font-bold text-lg">MoMo Gateway</h3>
            <p className="text-xs text-blue-100 italic">Secure Payment Simulation</p>
            </div>
        </div>

        <div className="p-8">
            {step === 'form' && (
            <form onSubmit={handlePayment} className="space-y-5">
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Network</label>
                <select className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>MTN Mobile Money</option>
                    <option>Telecel Cash</option>
                    <option>AT Money</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                <input 
                    type="tel" 
                    placeholder="024 000 0000" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                </div>

                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Amount (GHS)</label>
                <input 
                    type="number" 
                    placeholder="0.00" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                </div>

                <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                <ShieldCheck size={20} /> Pay Now
                </button>
                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <AlertCircle size={12} /> Test mode: No real money will be charged
                </p>
            </form>
            )}

            {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <h4 className="font-bold text-slate-800 text-xl">Authorizing Transaction</h4>
                <p className="text-slate-500 text-sm">Please check your phone for the prompt...</p>
            </div>
            )}

            {step === 'success' && (
            <div className="py-12 text-center space-y-4 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-800 text-xl">Payment Successful!</h4>
                <p className="text-slate-500 text-sm">Transaction ID: {txId}</p>
                <button 
                onClick={() => setStep('form')}
                className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                Make another payment
                </button>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default PaymentIntegration;