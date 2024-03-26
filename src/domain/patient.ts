interface Patient {
	patient_id?: number;
	first_name: string;
	last_name: string;
	email: string;
	phone?: string | null;
	address?: string | null;
	diagnosis?: string | null;
	image_url?: string | null;
	created_at?: Date;
}

export default Patient;