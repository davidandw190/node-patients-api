interface Patient {
	patientId?: number;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string | null;
	address?: string | null;
	diagnosis?: string | null;
	imageUrl?: string | null;
	createdAt?: Date;
}

export default Patient;