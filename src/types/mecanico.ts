export interface Mecanico {
  id: number;
  licenciaId: string;
  nombre: string;
  nivelExperiencia: number;
  salarioHora: number;
  disponible: boolean;
  fechaContratacion: string;
  latitud?: number;
  longitud?: number;
  fotoUrl?: string;
  totalMantenimientosAsignados?: number;
}
