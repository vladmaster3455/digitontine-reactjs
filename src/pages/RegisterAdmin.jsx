import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import API_CONFIG from '../config/api.config';
import axios from 'axios';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    numeroTelephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    carteIdentite: '',
    dateNaissance: '',
    adresse: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.prenom || !formData.nom) {
      setError('Le prénom et le nom sont requis');
      return false;
    }
    if (!formData.email) {
      setError('L\'email est requis');
      return false;
    }
    if (!formData.numeroTelephone) {
      setError('Le numéro de téléphone est requis');
      return false;
    }
    if (!formData.motDePasse) {
      setError('Le mot de passe est requis');
      return false;
    }
    if (formData.motDePasse.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        numeroTelephone: formData.numeroTelephone,
        motDePasse: formData.motDePasse,
        carteIdentite: formData.carteIdentite || undefined,
        dateNaissance: formData.dateNaissance || undefined,
        adresse: formData.adresse || undefined,
      };

      const response = await axios.post(
        API_CONFIG.ENDPOINTS.AUTH.CREATE_ADMIN_PUBLIC,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Erreur lors de la création de l\'administrateur. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Compte créé avec succès !
          </h2>
          <p className="text-gray-600 mb-6">
            L'administrateur a été créé. Redirection vers la page de connexion...
          </p>
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            className="w-full"
          >
            Aller à la connexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/login"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Créer un Administrateur
              </h1>
              <p className="text-sm text-gray-600">
                Créez le premier compte administrateur
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />

            <Input
              label="Nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            required
          />

          <Input
            label="Numéro de téléphone"
            type="tel"
            name="numeroTelephone"
            value={formData.numeroTelephone}
            onChange={handleChange}
            placeholder="+221771234567"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mot de passe"
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              placeholder="Minimum 8 caractères"
              required
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="confirmerMotDePasse"
              value={formData.confirmerMotDePasse}
              onChange={handleChange}
              placeholder="Confirmez le mot de passe"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Carte d'identité (optionnel)"
              type="text"
              name="carteIdentite"
              value={formData.carteIdentite}
              onChange={handleChange}
              placeholder="SN123456789"
            />

            <Input
              label="Date de naissance (optionnel)"
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Adresse (optionnel)"
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Votre adresse"
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Création en cours...' : 'Créer l\'administrateur'}
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary-600 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;

