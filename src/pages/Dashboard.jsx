import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import API_CONFIG from '../config/api.config';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      let endpoint = '';
      
      if (user?.role === 'admin') {
        endpoint = API_CONFIG.ENDPOINTS.DASHBOARD.ADMIN;
      } else if (user?.role === 'tresorier') {
        endpoint = API_CONFIG.ENDPOINTS.DASHBOARD.TRESORIER;
      } else {
        endpoint = API_CONFIG.ENDPOINTS.DASHBOARD.MEMBRE;
      }

      const response = await api.get(endpoint);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Chargement du tableau de bord..." />
      </Layout>
    );
  }

  const statCards = [
    {
      title: 'Tontines Actives',
      value: stats?.tontinesActives || 0,
      icon: <FileText className="w-8 h-8 text-primary-600" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Total Transactions',
      value: stats?.totalTransactions || 0,
      icon: <Wallet className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      title: 'Montant Total',
      value: `${stats?.montantTotal?.toLocaleString() || 0} FCFA`,
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50',
    },
    {
      title: 'Membres',
      value: stats?.totalMembres || 0,
      icon: <Users className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50',
    },
  ];

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tableau de bord
            </h2>
            <p className="text-gray-600">
              Bienvenue, {user?.nom || 'Utilisateur'} !
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  {card.icon}
                </div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/tontines/create')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
              >
                <FileText className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-800">Créer une tontine</p>
                <p className="text-sm text-gray-500">Nouvelle tontine</p>
              </button>
              <button
                onClick={() => navigate('/transactions/create')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
              >
                <Wallet className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-800">Nouvelle transaction</p>
                <p className="text-sm text-gray-500">Enregistrer un paiement</p>
              </button>
              <button
                onClick={() => navigate('/users/create')}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
              >
                <Users className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-800">Ajouter un membre</p>
                <p className="text-sm text-gray-500">Nouveau membre</p>
              </button>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

