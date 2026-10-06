// frontend/src/features/primary-attention/mappers/caseReportMapper.js

/**
 * formData → API payload
 * Adjust this mapping when you build the backend endpoint.
 */
export const toApiPayload = (formData) => ({
  reportType: "syphilis_pregnant",
  patient: {
    fullName: formData.patientName ?? null,
    cpf: formData.patientCpf ?? null,
    cns: formData.patientCns ?? null,
    birthDate: formData.birthDate ?? null,
    motherName: formData.motherName ?? null,
    phone: formData.phone ?? null,
    race: formData.race ?? null,
    education: formData.education ?? null,
  },
  clinical: {
    symptomsOnset: formData.symptomsOnset ?? null,
    diagnosisDate: formData.diagnosisDate ?? null,
    clinicalForm: formData.clinicalForm ?? null,
    vdrlResult: formData.vdrlResult ?? null,
    ftaAbsResult: formData.ftaAbsResult ?? null,
    notes: formData.notes ?? null,
  },
  pregnancy: {
    gestationalAge: formData.gestationalAge ? Number(formData.gestationalAge) : null,
    prenatalCare: formData.prenatalCare ?? null,
    prenatalStart: formData.prenatalStart ?? null,
    partnerTreated: formData.partnerTreated ?? null,
    treatment: formData.treatment ?? null,
  },
  classification: {
    caseClassification: formData.caseClassification ?? null,
    evolution: formData.evolution ?? null,
    finalNotes: formData.finalNotes ?? null,
  },
});

/**
 * API response → confirmation metadata (optional)
 */
export const fromApiResponse = (response) => ({
  id: response.data?.id ?? null,
  submittedAt: new Date().toISOString(),
});