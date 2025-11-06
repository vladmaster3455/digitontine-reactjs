import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import API_CONFIG from '../config/api.config';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { FileText, Plus, Eye, Edit } from 'lucide-react';

const Tontines = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tontines, setTontines] = useState([]);

  useEffect(() => {
    fetchTontines();
  }, []);

  const fetchTontines = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_CONFIG.ENDPOINTS.TONTINES.MY_TONTINES);
      if (response.data.success) {
        setTontines(response.data.data || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tontines:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bloquée':
        return 'bg-red-100 text-red-800';
      case 'Terminée':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Chargement des tontines..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Tontines</h1>
            <p className="text-gray-600">Gérez vos tontines digitales</p>
          </div>
          <Button
            onClick={() => navigate('/tontines/create')}
            variant="primary"
            className="mt-4 sm:mt-0"
          >
            <Plus className="w-5 h-5 mr-2 inline" />
            Créer une tontine
          </Button>
        </div>

        {tontines.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune tontine
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre première tontine
            </p>
            <Button onClick={() => navigate('/tontines/create')} variant="primary">
              Créer une tontine
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tontines.map((tontine) => (
              <div
                key={tontine._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {tontine.nom}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        tontine.statut
                      )}`}
                    >
                      {tontine.statut}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Montant:</span>
                    <span className="font-semibold text-gray-800">
                      {tontine.montantCotisation?.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fréquence:</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {tontine.frequence}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Membres:</span>
                    <span className="font-medium text-gray-800">
                      {tontine.membres?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => navigate(`/tontines/${tontine._id}`)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1 inline" />
                    Voir
                  </Button>
                  <Button
                    onClick={() => navigate(`/tontines/${tontine._id}/edit`)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1 inline" />
                    Modifier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
};

export default Tontines;

