import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Bell,
  Settings,
  User,
  Search,
  Menu,
  ChevronDown,
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  X,
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = [
    { name: 'Jan', vendas: 3900, visitas: 2400 },
    { name: 'Fev', vendas: 3000, visitas: 1398 },
    { name: 'Mar', vendas: 2000, visitas: 9800 },
    { name: 'Abr', vendas: 2780, visitas: 3908 },
    { name: 'Mai', vendas: 1890, visitas: 4800 },
    { name: 'Jun', vendas: 2390, visitas: 3800 },
    { name: 'Jul', vendas: 990, visitas: 1800 },
    { name: 'Ago', vendas: 1590, visitas: 2800 },
    { name: 'Set', vendas: 3490, visitas: 5800 },
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Usuários', icon: <Users size={20} /> },
    { name: 'Relatórios', icon: <FileText size={20} /> },
    { name: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  const stats = [
    { title: 'Usuários Ativos', value: '1,234', change: '+12%' },
    { title: 'Receita Mensal', value: 'R$ 45,678', change: '+8%' },
    { title: 'Taxa de Conversão', value: '12.3%', change: '+2.3%' },
    { title: 'Tempo Médio', value: '5m 32s', change: '-8%' },
  ];

  const Sidebar = () => (
    <div
      className={`
      ${isMobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'} 
      lg:block lg:relative 
      ${isSidebarOpen ? 'lg:w-64' : 'lg:w-20'} 
      bg-gray-800 transition-all duration-300
    `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`${!isSidebarOpen && 'lg:hidden'} font-bold text-xl`}>Dashboard</h1>
          <div className="flex items-center gap-2">
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            )}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-700"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedMenu(item.name);
                if (windowWidth < 1024) setIsMobileMenuOpen(false);
              }}
              className={`
                flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors
                ${selectedMenu === item.name ? 'bg-blue-600 hover:bg-blue-700' : ''}
              `}
            >
              {item.icon}
              <span className={`${!isSidebarOpen && 'lg:hidden'} ml-3`}>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gray-900 text-white">
      {}
      <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-lg">Dashboard</h1>
        <button className="p-2 rounded-lg hover:bg-gray-700">
          <Bell size={20} />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <header className="hidden lg:flex bg-gray-800 px-6 py-4 items-center justify-between">
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 flex-1 max-w-xl">
              <Search size={20} className="text-gray-400 min-w-[20px]" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-transparent border-none focus:outline-none text-white ml-2 w-full"
              />
            </div>

            <div className="flex items-center gap-6 ml-4">
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <Settings size={20} />
              </button>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User size={20} />
                </div>
                <span>Admin</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-6">Vendas vs Visitas</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="vendas"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="visitas"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-6">Desempenho Mensal</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Bar dataKey="vendas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
