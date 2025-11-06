import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import API_CONFIG from '../config/api.config';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Wallet, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

const Transactions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_CONFIG.ENDPOINTS.TRANSACTIONS.MY_TRANSACTIONS);
      if (response.data.success) {
        setTransactions(response.data.data || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Validée':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejetée':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'En attente':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Validée':
        return 'bg-green-100 text-green-800';
      case 'Rejetée':
        return 'bg-red-100 text-red-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Chargement des transactions..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Transactions</h1>
            <p className="text-gray-600">Historique de vos transactions</p>
          </div>
          <Button
            onClick={() => navigate('/transactions/create')}
            variant="primary"
            className="mt-4 sm:mt-0"
          >
            <Plus className="w-5 h-5 mr-2 inline" />
            Nouvelle transaction
          </Button>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune transaction
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore de transactions
            </p>
            <Button onClick={() => navigate('/transactions/create')} variant="primary">
              Créer une transaction
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Moyen de paiement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {transaction.montant?.toLocaleString()} FCFA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.moyenPaiement}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.statut)}
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              transaction.statut
                            )}`}
                          >
                            {transaction.statut}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button
                          onClick={() => navigate(`/transactions/${transaction._id}`)}
                          variant="outline"
                          size="sm"
                        >
                          Voir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;

