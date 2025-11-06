import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, verifyOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    identifier: '',
    motDePasse: '',
    code: '',
  });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.identifier, formData.motDePasse);
      if (result.success) {
        setEmail(result.data.email);
        setStep(2);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Erreur lors de la connexion. Vérifiez vos identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await verifyOTP(email, formData.code);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Code OTP invalide. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DigiTontine</h1>
          <p className="text-gray-600">Gestion de Tontines Digitales</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1}>
            <Input
              label="Email ou Téléphone"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="exemple@email.com ou +221..."
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>

            <div className="mt-4 text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline block">
                Mot de passe oublié ?
              </Link>
              <p className="text-sm text-gray-600">
                Pas encore de compte admin ?{' '}
                <Link to="/create-admin" className="text-primary-600 hover:underline font-medium">
                  Créer un administrateur
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStep2}>
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-2">
                Un code de vérification a été envoyé à :
              </p>
              <p className="font-semibold text-primary-600">{email}</p>
            </div>

            <Input
              label="Code de vérification"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Entrez le code à 6 chiffres"
              required
              maxLength={6}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? 'Vérification...' : 'Vérifier'}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setStep(1)}
              className="w-full mt-2"
            >
              Retour
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

