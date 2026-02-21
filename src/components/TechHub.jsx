    import React, { useState } from 'react';
    import { Users, Calendar, MapPin, MessageSquare, Search } from 'lucide-react';

    const TechHub = () => {
    const [activeTab, setActiveTab] = useState('members');
    const [search, setSearch] = useState('');

    const members = [
        { id: 1, name: "Ama Mensah", role: "UI Designer", location: "East Legon", tech: "Figma, React" },
        { id: 2, name: "Kofi Boateng", role: "Backend Dev", location: "Kumasi", tech: "Node.js, Go" },
        { id: 3, name: "Benjamin Djata", role: "Software Developer", location: "Accra", tech: "React, Vite" },
    ];

    const events = [
        { id: 1, title: "Accra React Meetup", date: "Feb 15", time: "6:00 PM", venue: "Impact Hub" },
        { id: 2, title: "Node.js Workshop", date: "Mar 02", time: "10:00 AM", venue: "Online" },
    ];

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(search.toLowerCase()) || 
        m.tech.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-4xl mx-auto my-10">
        {/* Header Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
            <button 
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition ${activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
            <Users size={18} /> Members
            </button>
            <button 
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
            <Calendar size={18} /> Tech Events
            </button>
        </div>

        <div className="p-6">
            {activeTab === 'members' ? (
            <div>
                <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Find a developer by name or tech..." 
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>
                <div className="space-y-4">
                {filteredMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-blue-50 transition">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {member.name[0]}
                        </div>
                        <div>
                        <h4 className="font-bold text-slate-800">{member.name}</h4>
                        <p className="text-sm text-slate-500">{member.role} • {member.location}</p>
                        </div>
                    </div>
                    <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200 font-mono">{member.tech}</span>
                    </div>
                ))}
                </div>
            </div>
            ) : (
            <div className="space-y-4">
                {events.map(event => (
                <div key={event.id} className="p-4 border border-slate-100 rounded-lg flex gap-4 items-start">
                    <div className="bg-blue-600 text-white p-3 rounded text-center min-w-[70px]">
                    <p className="text-xs uppercase">Month</p>
                    <p className="font-bold">{event.date.split(' ')[1]}</p>
                    </div>
                    <div>
                    <h4 className="font-bold text-slate-800">{event.title}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={14}/> {event.venue}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1"><Calendar size={14}/> {event.date} @ {event.time}</p>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
    };

    export default TechHub;