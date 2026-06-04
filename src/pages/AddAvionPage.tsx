import { useForm } from "react-hook-form";
import { useState } from "react";
import Title from "../components/Title";
import { Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createAvionRequest } from "../api/avionesApi";

type FormValues = {
  matricula: string;
  modelo: string;
  capacidadPasajeros: number;
  horasVuelo: number;
  fechaFabricacion: string;
  enServicio: boolean;
};

export default function AddAvionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      enServicio: true,
      horasVuelo: 0
    }
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      await createAvionRequest(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Title text="Registrar Nuevo Avión" />
      
      {submitted && (
        <div style={{ 
          textAlign: "center", 
          padding: "20px", 
          color: "#16a34a", 
          backgroundColor: "rgba(34, 197, 94, 0.1)", 
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <CheckCircle size={24} />
            <h3 style={{ margin: 0 }}>¡Avión registrado con éxito en la base de datos!</h3>
          </div>
        </div>
      )}

      {error && (
        <div style={{ 
          textAlign: "center", 
          padding: "20px", 
          color: "#ef4444", 
          backgroundColor: "rgba(239, 68, 68, 0.1)", 
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <AlertCircle size={24} />
            <h3 style={{ margin: 0 }}>Error: {error}</h3>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Matrícula</label>
          <input 
            {...register("matricula", { 
              required: "La matrícula es obligatoria",
              pattern: {
                value: /^[A-Z]{2}-[0-9]{3,4}$/,
                message: "Formato inválido (Ej: EC-123 o EC-1234)"
              }
            })} 
            placeholder="Ej: EC-123"
            disabled={loading}
          />
          {errors.matricula && <p className="error-message">{errors.matricula.message}</p>}
        </div>

        <div className="form-group">
          <label>Modelo</label>
          <input 
            {...register("modelo", { required: "El modelo es obligatorio" })} 
            placeholder="Ej: Boeing 737"
            disabled={loading}
          />
          {errors.modelo && <p className="error-message">{errors.modelo.message}</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="form-group">
            <label>Capacidad Pasajeros</label>
            <input 
              type="number"
              {...register("capacidadPasajeros", { 
                required: "Campo obligatorio",
                min: { value: 1, message: "Mínimo 1 pasajero" },
                valueAsNumber: true
              })} 
              disabled={loading}
            />
            {errors.capacidadPasajeros && <p className="error-message">{errors.capacidadPasajeros.message}</p>}
          </div>

          <div className="form-group">
            <label>Horas de Vuelo</label>
            <input 
              type="number"
              {...register("horasVuelo", { 
                required: "Campo obligatorio",
                min: { value: 0, message: "No puede ser negativo" },
                valueAsNumber: true
              })} 
              disabled={loading}
            />
            {errors.horasVuelo && <p className="error-message">{errors.horasVuelo.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Fecha de Fabricación</label>
          <input 
            type="date"
            {...register("fechaFabricacion", { required: "La fecha es obligatoria" })} 
            disabled={loading}
          />
          {errors.fechaFabricacion && <p className="error-message">{errors.fechaFabricacion.message}</p>}
        </div>

        <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input 
            type="checkbox"
            {...register("enServicio")}
            style={{ width: "auto" }}
            disabled={loading}
          />
          <label style={{ marginBottom: 0 }}>¿Está en servicio operativo?</label>
        </div>

        <button 
          type="submit" 
          className="btn-submit" 
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          disabled={loading}
        >
          {loading ? <Loader2 className="spinner" size={20} /> : <Save size={20} />}
          {loading ? "Guardando..." : "Guardar Avión"}
        </button>
      </form>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
